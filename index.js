require('dotenv').config();
const express = require("express");
// const fs = require("fs");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({extended:true}));



mongoose
.connect('mongodb://localhost:27017/userData')
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("mongo Error",err));

//schema
const userSignupSchema = new mongoose.Schema({

    userName:{
        type: String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    userPassword:{
        type:String,
        require:true
    }
    
});

const userLoginSchema = new mongoose.Schema({

    userEmail:{
        type:String,
        require:true
    },
    userPassword:{
        type:String,
        require:true
    }
    
});


//user model
const UserSignup = mongoose.model('userSignup',userSignupSchema);
const UserLogin = mongoose.model('userLogin',userLoginSchema);


app.get("/",(req,res)=>{
    res.sendFile("/code.html");
})

app.post("/userlogin", async(req,res)=>{
    const body = req.body;

  const result =  await UserLogin.create({
        userEmail:body.userEmail,
        userPassword:body.userPassword
    })
   
    console.log(result);
    console.dir(req.body);
    res.send(`<h1>Login successfull</h1>
    <style>
    h1{
        font-size:100px;
        height:100vh;
        width:100vw;
        color:green;
        display: grid;
        justify-content: center;
        align-items: center;
    }
    </style>
    `);
})

app.post("/usersignup", async(req,res)=>{
    const body = req.body;

  const result =  await UserSignup.create({
        userName:body.userName,
        userEmail:body.userEmail,
        userPassword:body.userPassword
    })
   
    console.log(result);
    console.dir(req.body);
    res.send(`
    <h1>signup successfull</h1>
    <style>
    h1{
        font-size:100px;
        height:100vh;
        width:100vw;
        color:green;
        display: grid;
        justify-content: center;
        align-items: center;
    }
    </style>
    `);
})

app.listen(process.env.PORT,()=>{
    console.log("server is running on "+ process.env.PORT);
})
