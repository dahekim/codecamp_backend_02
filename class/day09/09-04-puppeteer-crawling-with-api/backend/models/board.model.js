import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
    writer : String,
    title : String,
    contents : String,
})

export const Board = mongoose.model("Board", boardSchema)          // "Board" 컬렉션에 들어가가는데 boardSchema 입니다~ 라는 말