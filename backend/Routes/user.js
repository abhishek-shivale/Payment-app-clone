import express from 'express'
import zod from 'zod'
import jwt from 'jsonwebtoken'
import JWT_SECRET from './config.js'
import { userModel } from '../database/database.js'
import authMiddelware from './middleware.js'
import { AccountsModel } from '../database/database.js'
const user = express.Router()

const signupSchema = zod.object({
    firstName : zod.string().min(3).max(30),
    lastName : zod.string(),
    userName: zod.string().max(50).min(3).email(),
    password: zod.string().min(6).max(50)
})
const signinSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})
const UpdateSchema = zod.object({
    firstName : zod.string().min(3).max(30).optional(),
    lastName : zod.string().optional(),
    password: zod.string().min(6).max(50).optional()
})
//SignUp Route

user.post('/signup', async (req,res)=>{
    const allReq = req.body;
    console.log(allReq);
    const success = signupSchema.safeParse(allReq)
    if(!success){
        return res.json({
         msg: 'Invalid input'
        })
    }
try {
    const already = await userModel.findOne({userName:allReq.userName})
    if(already){
         return res.status(411).json({
            msg:'user alredy exists'
        }) 
    }
        const user = await userModel.create({
            userName: allReq.userName,
            firstName: allReq.firstName,
            lastName: allReq.lastName,
            password: allReq.password
        })
        const userId = user._id
        await AccountsModel.create({
            userId: userId,
            balance: Math.round(1 + Math.random()*10000)
        })
        
        const token = jwt.sign({userName:allReq.userName}, JWT_SECRET)
        return res.status(200).json({
            msg:'user has been created',
            token
        })
    } catch (error) {
        return res.json(error.message)  
    }
})

//SignIn Route

user.post('/signin', async (req, res)=>{
    const allReq = req.body
    const verifyZod = signinSchema.parse(allReq)
    if(!verifyZod){
        return res.status(411).json({
            msg: 'Invalid Input'
        })
    }
    try{
       const user =  await userModel.findOne({userName:allReq.userName})
       if(!user){
        return res.json({msg:'User NotFound'})
       }
       const isMatch = user.password === allReq.password
       if(isMatch){
        const token = jwt.sign({userId: user._id}, JWT_SECRET)
        return res.status(200).json({
            token:token
        })
       }
     return res.json({
        msg:'Password is incorrect'
       })

    }catch(err){
        return res.json(err.message)
    }
})

//Put Routes

user.put('/', authMiddelware , async(req,res)=>{

   const verifyZod = UpdateSchema.parse(req.body)
   if(!verifyZod){
    return res.json('Invalid Input')
   }
   try {
   const user = await userModel.findById(req.userId)
    if(user){
        await user.updateOne(req.body)
        return res.json({
            msg: "Updated successfully"
        })
    }
   } catch (error) {
    return res.json(error.message)
   }
})

// bulk get route

user.get('/bulk', authMiddelware ,async(req,res)=>{
    const filter = String(req.query.filter);
    try {
        const user = await userModel.find({$or: [
        {
            firstName:{
                $regex: filter
            }
        },
        {
            lastName:{
                $regex: filter
            }
        }
    ]})
    return res.json({
        user: user.map((us)=>({
            userName: us.userName,
            firstName: us.firstName,
            lastName: us.lastName,
            id: us._id
        }))
    })
    } catch (error) {
        return res.json(error.message)
    }
})

export default user