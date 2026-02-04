const Product = require("../../../model/productModel")


exports.createProduct= async(req,res)=>{
    const file=req.file
    let filePath
    if(!file){
        filePath="https://stock.adobe.com/search?k=momos"
    }
    else{
        filePath=req.file.filename
    }
    const {productName,productDescription,productPrice,productStockQnt,productStatus}=req.body

    if(!productName || !productDescription || !productPrice || !productStockQnt || !productStatus ){
        return res.status(400).json({
            message:"please provide productName,productDescription,productprice,productstockqnt and productStatus"
        })
    }

    await Product.create({
        productName,
        productDescription,
        productPrice,
        productStockQnt,
        productStatus,
        productImage:filePath,
    })

    res.status(200).json({
        message:"product created successfully"
    })



}