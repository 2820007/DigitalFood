const User=require("../../model/userModel")
const bcrypt=require("bcryptjs")

const jwt=require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");



exports.userRegister=async(req,res)=>{
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
}



exports.userLogin= async(req,res)=>{
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

}



//forget password


exports.forgetPassword=async(req,res)=>{
    const {email}=req.body
    if(!email){
        return res.status(400).json({
            message:"Please provide an email"
        })
    }

    //check the user with  that email
    const existUser= await User.find({userEmail:email})

    if(existUser.length ==0){
        return res.status(404).json({
            message:"User with that email is not registered"
        })
    }


    //generate otp

    const otp=Math.floor(1000+ Math.random()*9000)

       existUser[0].otp=otp
       await existUser[0].save()

    await sendEmail({
        email:email,
        subject:"Otp for digitalFood forgetPassword",
        message:`Your otp is${otp}. Donot share with any one`
    })
    res.status(200).json({
        message:"Email sent successfully"
    })

}


//Verify Otp

exports.verifyOtp= async(req,res)=>{
    const {email,otp}=req.body
    if(!email || !otp){
        return res.status(400).json({
            message:"Please provide email,otp"
        })
    }

    //check if that  otp is correct  or not fo that email

    const userExists=await User.find({userEmail:email})
    if(userExists.length ==0){
        return res.status(404).json({
            message:"Email is not registered"
        })
    }

    if(userExists[0].otp !== otp){
        res.status(400).json({
            message:"Invalid"
        })
    }
    else{
        //dispose the otp so cannot be used next time the same otp
        userExists[0].otp=undefined
        userExists[0].isOtpVerified =true
        await userExists[0].save()
        res.status(200).json({
            message:"Otp is correct"
        })

    }
}


exports.resetPassword=async(req,res)=>{
    const {email,newPassword,confirmPassword}=req.body;
    if(!email || !newPassword || !confirmPassword){
        return res.status(400).json({
            message:"Please provide email, newPassword and confirmPassword"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message:"newPassword and confirmPassword is not match"
        })
    }

    const userExists=await User.find({userEmail:email})

    if(userExists.length ==0){
        return res.status(400).json({
            message:"User email not registered"
        })
    }
    if(userExists[0].isOtpVerified !== true){
        return res.status(403).json({
            message:"You cannot perform this action"
        })
    }


    userExists[0].userPassword=bcrypt.hashSync(newPassword,10)
    userExists[0].isOtpVerified=false
    await userExists[0].save()

    res.status(200).json({
        message:"Password changed successfully.."
    })

}