import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    token : String,
    phone : String,
    isAuth : Boolean
})

export const Tokens = mongoose.model("Tokens", tokenSchema)