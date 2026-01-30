const mongoose=require("mongoose")

const Schema=mongoose.Schema
const productSchema=new Schema({
    productName:{
        type:String,
        require:[true,"please provide product name"]
    },
     productDescription:{
        type:String,
        require:[true,"please provide product description"]
    },
     productPrice:{
        type:Number,
        require:[true,"please provide product price"]
    },
     productStockQnt:{
        type:Number,
        require:[true,"please provide product stock quantity"]
    },
     productStatus:{
        type:String,
        enum:["available","unavailable"],
        default:"available"
    }

},
{
    timestamps:true
}
)

const Product=mongoose.model("Product",productSchema)
module.exports=Product