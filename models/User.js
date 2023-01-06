const mongoose =require('mongoose')

const schemaUser = new mongoose.Schema({
    login:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    }
})

const User=mongoose.model('users',schemaUser)
module.exports=User;