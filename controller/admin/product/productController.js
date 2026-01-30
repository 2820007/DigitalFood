const Product = require("../../../model/productModel")


exports.createProduct= async(req,res)=>{
    const {productName,productDescription,productPrice,productStockQnt,productStatus}=req.body

    if(!productName || !productDescription || !productPrice || !productStockQnt || !productStatus){
        return res.status(400).json({
            message:"please provide productName,productDescription,productprice,productstockqnt and productStatus"
        })
    }

    await Product.create({
        productName,
        productDescription,
        productPrice,
        productStockQnt,
        productStatus
    })

    res.status(200).json({
        message:"product created successfully"
    })



}