const express=require('express');
const Note = require('../models/Note');


const router = express.Router();
router.get('/',async (req,res)=>{
    const notes=await Note.find()
    res.json(notes)
})

router.post('/',async (req,res)=>{
    const {value,idUser}=req.body;
    const note = new Note({
        value:value,
        idUser:idUser
    })
    note.save().then(()=>{
        res.status(201).json({msg:'success'})
    }).catch(err=>res.status(500).json({err:err.message}))
})

router.put('/:idNote',async (req,res)=>{
    const idNote=req.params.idNote
    const {value,idUser}=req.body;
    const note = await Note.findById(idNote);
   note.value=value
   note.idUser=idUser
   note.save().then(()=>{
    res.json({msg:'updated successfuly'})
   }).catch(err=>res.status(500).json({err:err.message}))
})

router.delete('/:idNote',async (req,res)=>{
    const idNote=req.params.idNote
    Note.findByIdAndDelete(idNote).then(()=>{
        res.json({msg:'removed successfuly'})
       }).catch(err=>res.status(500).json({err:err.message}))
 
})

module.exports=router