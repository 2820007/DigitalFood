const express=require("express")
const { connectDb } = require("./database/database")
const bcrypt=require("bcryptjs")
const User=require("./model/userModel")
const jwt=require("jsonwebtoken")
const app=express()

require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


// database connection
connectDb()


// test api to check if server is live or not


//register api
app.post("/register", async(req,res)=>{
    const {email,password,phoneNumber,username}=req.body;
    if(!email || !password || !phoneNumber || !username)
    {
        return res.status(400).json({
            message:"Please provide email,password,phoneNumber and username"
        })
    }


    //check if that email user already register or not

    const userFound=await User.find({userEmail:email})
    if(userFound.length>0){
        return res.status(400).json({
            message:"User with that email already register"
        })
    }


    await User.create({
        userName:username,
        userPhoneNumber:phoneNumber,
        userEmail:email,
        userPassword:bcrypt.hashSync(password,10)
    })


    res.status(201).json({
        message:"User Register Successfully...."
    })
})



//login api


app.post("/login", async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Please provide email and password"
        })
    }

    //check if that email user already exists or not

    const userFound=await User.find({userEmail:email})
    if(userFound === 0){
        return res.status(404).json({
            message:"User with email is not register"
        })
    }


    //password check

    const isMatched=bcrypt.compareSync(password,userFound[0].userPassword)

    if(isMatched){
        //generate token

        const token=jwt.sign({id:userFound[0]._id},process.env.SECRET_KEY,{
            expiresIn:'30d'
        })



        return res.status(200).json({
            message:"Login successfully...",
            token
        })
    }else{
        res.status(400).json({
            message:"invalid password"
        })
    }

})

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"I am alive"
    })
})




const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})