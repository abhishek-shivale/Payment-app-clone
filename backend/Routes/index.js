import express from 'express'
const index = express.Router()
import user from './user.js'
import { accountRouter } from './account.js'

index.use('/user', user)
index.use('/account', accountRouter)


export default index