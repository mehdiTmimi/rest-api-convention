const express = require('express')
const userRouter = require('./routes/users')
const noteRouter=require('./routes/notes')
//const bodyParser = require('body-parser');


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
const app=express(); // app is a convention
//app.use(bodyParser.urlencoded({ extended: false }));// middleware pour lire query paramss
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hello , it works")
})
app.use('/users',userRouter)
app.use('/notes',noteRouter)

app.use((req,res)=>{
    res.status(404).send("404")
})
app.listen(3000);