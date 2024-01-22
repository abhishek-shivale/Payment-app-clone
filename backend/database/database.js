import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://abhishekshivale21:niAcNvZX9eNR2mkS@cluster0.m1ovjoj.mongodb.net/paytem`)

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true,lowercase: true, minLength: 3, maxLength: 30},
    lastName: {type: String, required: true, trim: true,  maxLength: 50},
    userName: {type: String, required: true, unique: true, trim: true, maxLength: 50, minLength: 6 },
    password: {type: String, required: true, trim: true, maxLength: 50 }
})

const AccountsSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref:'Users',required: true},
    balance: {type: Number, required: true}
})

const userModel = mongoose.model('Users',userSchema)
const AccountsModel = mongoose.model('Accounts',AccountsSchema)



export{ userModel,AccountsModel}