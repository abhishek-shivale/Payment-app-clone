import express from 'express'
const index = express.Router()
import user from './user.js'

index.use('/user', user)


export default index