const express=require('express')

let users=[{
    id:1,
    nom:'hamza'
}
,
{
    id:2,
    nom:'filali'
}
,
{
    id:3,
    nom:'ali'
}
,
{
    id:4,
    nom:'Sarah'
}
]

const router = express.Router();
router.get('/',(req,res)=>{
    let limit=req.query.limit || users.length;
    let dataToSend=users.filter((element, index) =>{
        return index<limit;
    })
    res.json(dataToSend); // .json est la plus adequate 
})

router.get('/:id',(req,res)=>{
   let id= req.params.id
   let user = users.find(element=>element.id==id)
   if(user)
        res.status(200).json(user);
    else
        res.status(404).send("introuvable")
})

router.post('/',(req,res)=>{
   let newUser= req.body;// dont forget to add the middleware on top app.use(express.json())
   let user=users.find(element=>element.id==newUser.id)
   if(!user)
   {
   users.push(newUser);
   res.status(201).json(newUser);
    }
    else
        res.status(404).send("id already exist")
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