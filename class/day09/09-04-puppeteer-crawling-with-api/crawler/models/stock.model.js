import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
    name: String,
    date: Date,
    price: Number
})

export const Stock = mongoose.model("Stock", stockSchema)          // "Stock" 컬렉션에 들어가는 stockSchema 입니다~ 라는 말