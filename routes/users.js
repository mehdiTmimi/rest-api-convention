const express=require('express');
const User = require('../models/User');
const bcrypt=require('bcrypt')


const router = express.Router();
router.get('/',async (req,res)=>{
    const users = await User.find()
    let limit=req.query.limit || users.length;
    let dataToSend=users.filter((element, index) =>{
        return index<limit;
    })
    res.json(dataToSend); // .json est la plus adequate 
})

router.get('/:id',async (req,res)=>{
   let id= req.params.id
   let user = await User.findById(id)
   if(user)
        res.status(200).json(user);
    else
        res.status(404).send("introuvable")
})

router.post('/',async (req,res)=>{
    const {login,pwd}=req.body;
    const user = new User({
        login:login,
        pwd:await bcrypt.hash(pwd,10)
    })
    user.save().then(()=>{
        res.status(201).json({msg:'success'})
    }).catch(err=>res.status(500).json({err:err.message}))
})

router.delete('/:id',(req,res)=>{
    let id=req.params.id
    let user=users.find(element=>element.id==id)
    if(user)   
    {
        users=users.filter(element=>element.id!=id) // suppression
        res.json(user)
    }
    else
        res.status(404).send('introuvable')

})

router.put('/:id',(req,res)=>{
    let id =req.params.id
    let user =users.find(element=>element.id==id)
    if(user)
    {
        user.nom=req.body.nom
        res.status(200).json(user)
    }
    else
         res.status(404).send('introuvable')
})

module.exports=router;