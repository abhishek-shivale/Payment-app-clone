import express from 'express'
import { AccountsModel } from '../database/database.js'
import authMiddleware from './middleware.js'
import mongoose from 'mongoose'
const accountRouter = express.Router()


accountRouter.get('/balance', authMiddleware , async (req,res)=>{
   try {
    const account = await AccountsModel.findOne({userId:req.userId})
    if(!account){
        return res.json('Try again')
    }
    return res.json({balance: account.balance})
   } catch (error) {
    return res.json(error.message)
   }
})

accountRouter.post('/transfer', authMiddleware , async (req,res)=>{
    const session = await mongoose.startSession() 
    try {
        session.startTransaction()
        const {amount , to} = req.body
        const account = await AccountsModel.findOne({userId:req.userId}).session(session)
        if(!account || amount > account.balance){
            await session.abortTransaction()
            return res.status(400).json({
                msg: "Insufficient balance"
            })
        }
        const sendTo = await AccountsModel.findOne({userId:to}).session(session)
        if(!sendTo){
            return res.status(404).json({
                msg: "Account not found"
            })
        }
        await account.updateOne({userId:req.userId},{$inc:{balance: -amount}}).session(session)
        await account.updateOne({userId:to},{$inc:{balance: amount}}).session(session)
        await session.commitTransaction()
        return res.status(200).json({
            msg:'transaction successful!!'
        })
    } catch (error) {
        return res.status(400).json(error.message)
    }finally {
        session.endSession();
    }
})

export {accountRouter}