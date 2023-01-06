const express = require('express')
const userRouter = require('./routes/users')
const noteRouter=require('./routes/notes')
const session = require('express-session')
const mongoose = require('mongoose')
mongoose
.connect
('mongodb+srv://mehditmimi:d24KWFsKwn0ypVO4@cluster0.opkalrs.mongodb.net/?retryWrites=true&w=majority').
then(()=>console.log("connected to mongodb atlas"))
.catch(err=>console.log(err=>err.message))

//const bodyParser = require('body-parser');
const app=express(); // app is a convention
//app.use(bodyParser.urlencoded({ extended: false }));// middleware pour lire query paramss
app.use(express.json())
app.use(session({
    secret: 'uemf 2022',
    cookie:{
        httpOnly:true
    }
  }))


app.get('/',(req,res)=>{
    console.log(req.session)
    if(req.session.views==undefined)
        req.session.views=0;
    else
        req.session.views++;
    res.send(`hello , it works ${req.session.views}`)
})
app.post('/login',(req,res)=>{
    const {login,pwd}=req.body
    console.log(req.body)
    if(login=="admin" && pwd=="123")
    {
        req.session.isConnected=true;
        res.status(200).send('success')
    }
    else
        res.status(401).send('echec, login or pwd incorrect')
})
app.post('/logout',(req,res)=>{
    req.session.destroy();
    res.status(200).send('logout success')
})
app.use((req,res,next)=>{
    if(req.session.isConnected && req.session.isConnected==true)
        next();
    else
        res.status(403).send("vous devez se connecter")
})//middleware de verification
app.use('/users',userRouter)
app.use('/notes',noteRouter)

app.use((req,res)=>{
    res.status(404).send("404")
})
app.listen(3000);