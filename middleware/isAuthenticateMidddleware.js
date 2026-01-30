const jwt=require("jsonwebtoken")
const User = require("../model/userModel")
const promisify=require('util').promisify
const isAuthenticated= async(req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        res.status(403).json({
            message:"Please login"
        })
    }



   try {
     const decoded=await promisify(jwt.verify)(token,process.env.SECRET_KEY)


    


    //check if decode.id exist in the user table


   const doesUsertExists= await  User.findOne({_id:decoded.id})
   if(!doesUsertExists){
    return res.status(404).json({
        message:"User doesn't exist with that token/id"
    })



   
   }
    req.user=doesUsertExists

    next()
    
   } catch (error) {
    res.status(400).json({
        message:error.message
    })
    
   }









}


module.exports=isAuthenticated