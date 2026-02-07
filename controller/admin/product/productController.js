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



exports.getProducts=async(req,res)=>{

    const products=await Product.find()
    // console.log(products)
    if(products.length ==0){
        return res.status(400).json({
            message:"There is no projects yet",
            products:[]
        })
    }
    res.status(200).json({
        message:":Projects fetched successfully...",
        products
    })
}


exports.getProduct=async(req,res)=>{
    const {id}=req.params;


    if(!id){
        return res.status(401).json({
            message:"please provide that id(productId"
        })
    }


    const product=await Product.find({_id:id})
      if(product.length ==0){
        res.status(400).json({
            message:"No product find with that id",
            product:[]
        })
      }else{
        res.status(200).json({
            message:"product fetched successfully",
            product
        })
      }
}