import express from 'express'
import zod from 'zod'
import cors from 'cors'
import { userModel } from './database/database.js'
import index from './Routes/index.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', index)


app.listen(3000,()=>{
    console.log('server is started');
})