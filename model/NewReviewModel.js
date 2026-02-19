const mongoose =require("mongoose")
const Schema=mongoose.Schema


const reviewSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,"A review must belong to user"]
    },
   
    rating:{
        type:String,
        required:true,
        default:3
    },
    message:{
        type:String,
        required:true,
    }

},
{
    timestamps:true
}
)


const NewWayReview=mongoose.model("NewWayReview",reviewSchema)

module.exports={
    reviewSchema,
    NewWayReview
}