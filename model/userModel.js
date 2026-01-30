const mongoose=require("mongoose")
const Schema=mongoose.Schema


const userSchema=new Schema({
    userEmail:{
        type:String,
        require:[true,"userEmail must be provided"]
    },


    userPhoneNumber:{
        type:String,
        required:[true,"phone must be provided"]
    },

    userPassword:{

        type:String,
        required:[true,"password must be required"]

},

role:{
    type:String,
    enum:["customer","admin"],
    default:"customer"
},
otp:{
    type:Number,
},
isOtpVerified:{
    type:Boolean,
    default:false
}


},
{
    timestamps:true
})


const User=mongoose.model("User",userSchema)
module.exports=User