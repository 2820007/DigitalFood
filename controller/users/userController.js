const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")


exports.createReview=async(req,res)=>{
    const userId=req.user.id

   const {rating,message}=req.body
   const productId=req.params.id
   if(!rating || !message || !productId){
    return res.status(400).json({
        message:"Please provide rating, message, and productId"
    })
   }


   //check the product exist or not

   const productExists=await Product.findById(productId)
   if(!productExists){
    return res.status(400).json({
        message:"Product is not exitst with that productId"
    })
   }

   //insert review in the review modele in db

   await Review.create({
    userId,
    productId,
    rating,
    message
   })


   res.status(200).json({
    message:"Review added successfully.."
   })
}



exports.getProductReview=async(req,res)=>{
    const productId=req.params.id

    if(!productId){
        return res.status(400).json({
            message:"Please provide productId"
        })
    }

    const productExists=await Product.findById(productId)
    if(!productExists){
        return res.status(400).json({
            message:"product with that id isnot exists"
        })
    }

    const reviews=await Review.find({productId}).populate("userId").populate("productId")

    res.status(200).json({
        message:"review fetched successfully..",
        data:reviews
    })

}

exports.deleteReview=async(req,res)=>{
    const reviewId=req.params.id
    if(!reviewId){
        return res.status(400).json({
            message:"please provide reviewId "
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message:"review deleted successfully"
    })
}



//add reivew by the product id

exports.addProductReview=async (req,res)=>{
    const productId=req.params.id
    const{rating,message}=req.body
    const userId=req.user.id
    const review={
        userId,
        rating,
        message
    }

    const product=await Product.findById(productId)
    product.reviews.push(review)
    await product.save()
    res.status(200).json({
        message:"Review Done..."
    })


}