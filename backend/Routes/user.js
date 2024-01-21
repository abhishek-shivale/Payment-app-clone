import express from 'express'
import zod from 'zod'
import jwt from 'jsonwebtoken'
import JWT_SECRET from './config.js'
import { userModel } from '../database/database.js'
import authMiddelware from './middleware.js'
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

//SignUp Route

user.post('/signup', async (req,res)=>{
    const allReq = req.body;
    const verifyZod = signupSchema.parse(allReq)
    if(!verifyZod){
        return res.json({
         msg: 'Invalid input'
        })
    }
try {
    const already = await userModel.findOne({userName:allReq.userName})
    if(already){
         res.status(411).json({
            msg:'user alredy exists'
        }) 
    }
        const user = await userModel.create({
            userName: allReq.userName,
            firstName: allReq.firstName,
            lastName: allReq.lastName,
            password: allReq.password
        })
        
        const token = jwt.sign({userName:allReq.userName}, JWT_SECRET)
        console.log(user,token);
            res.status(200).json({
            msg:'user has been created',
            token
        })
    } catch (error) {
        res.json(error.message)  
    }
})

//SignIn Route

user.post('/signin', async (req, res)=>{
    const allReq = req.body
    const verifyZod = signinSchema.parse(allReq)
    if(!verifyZod){
        res.status(411).json({
            msg: 'Invalid Input'
        })
    }
    try{
       const user =  await userModel.findOne({userName:allReq.userName})
       if(!user){
        res.json({msg:'User NotFound'})
       }
       const isMatch = user.password === allReq.password
       if(isMatch){
        const token = jwt.sign({userId:allReq._id},JWT_SECRET)
        res.status(200).json({
            token:token
        })
       }
       res.json({
        msg:'Password is incorrect'
       })

    }catch(err){
        res.json(err.message)
    }
})

//Put Routes

user.put('/', authMiddelware() ,(req,res)=>{
    
})

export default user