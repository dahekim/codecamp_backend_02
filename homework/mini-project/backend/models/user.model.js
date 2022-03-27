import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    personal : String,
    prefer : String,
    pwd: String,
    phone: String,
    og: {
        title: String,
        description: String,
        image: String
    }
})

export const Users = mongoose.model("Users", userSchema)
// "Users" 컬렉션에 들어가는 userSchema