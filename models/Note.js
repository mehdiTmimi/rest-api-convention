const mongoose =require('mongoose')

const schemaNote = new mongoose.Schema({
    value:{
        type:String,
        required:true
    },
    idUser:String
})

const Note=mongoose.model('notes',schemaNote)
module.exports=Note;