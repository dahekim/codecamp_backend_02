import mongoose from 'mongoose'

const starbucksSchema = new mongoose.Schema({
    name: String,
    img: String
})

export const Starbucks = mongoose.model("Starbucks", starbucksSchema)
// "Starbucks" 컬렉션에 들어가는 starbucksSchema