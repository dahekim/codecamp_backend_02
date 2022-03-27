import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    og: {
        title: String,
        description: String,
        image: String
    },
    name : String,
    email : String,
    personal : String,
    prefer : String,
    pwd: String,
    phone: String
})

export const Users = mongoose.model("Users", userSchema)
// "Users" 컬렉션에 들어가는 userSchema