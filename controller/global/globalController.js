const Product = require("../../model/productModel");
const Review = require("../../model/reviewModel");

exports.getProducts = async (req, res) => {
  const products = await Product.find()
  // console.log(products)
  if (products.length == 0) {
    return res.status(400).json({
      message: "There is no projects yet",
      products: [],
    });
  }
  res.status(200).json({
    message: ":Projects fetched successfully...",
    data:products,
  });
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      message: "please provide that id(productId",
    });
  }

  const product = await Product.find({ _id: id });
   const productReviews=await Review.find({productId:id}).populate("userId")
  if (product.length == 0) {
    res.status(400).json({
      message: "No product find with that id",
      product: [],
      productReviews:[]
    });
  } else {
    res.status(200).json({
      message: "product fetched successfully",
      data:{product,
      productReviews
    }
    });
  }
};