const express=require('express')
let notes=[
    {
        id:1,
        value:20,
        idUser:1
    },
    {
        id:2,
        value:15,
        idUser:1
    },
    {
        id:3,
        value:19,
        idUser:2
    }
]

const router = express.Router();
router.get('/',(req,res)=>{
    res.json(notes)
})
module.exports=router