const Product = require("../../../model/productModel");
const fs = require("fs");
const path = require("path");

exports.createProduct = async (req, res) => {
  const file = req.file;
  let filePath;
  if (!file) {
    filePath = "https://stock.adobe.com/search?k=momos";
  } else {
    filePath = req.file.filename;
  }
  const {
    productName,
    productDescription,
    productPrice,
    productStockQnt,
    productStatus,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStockQnt ||
    !productStatus
  ) {
    return res.status(400).json({
      message:
        "please provide productName,productDescription,productprice,productstockqnt and productStatus",
    });
  }

  await Product.create({
    productName,
    productDescription,
    productPrice,
    productStockQnt,
    productStatus,
    productImage: filePath,
  });

  res.status(200).json({
    message: "product created successfully",
  });
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate(
    {
      path:"reviews",
      populate:{
        path:"userId",
        select:"userName userEmail"
      }
    }
  )
  // console.log(products)
  if (products.length == 0) {
    return res.status(400).json({
      message: "There is no projects yet",
      products: [],
    });
  }
  res.status(200).json({
    message: ":Projects fetched successfully...",
    products,
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
  if (product.length == 0) {
    res.status(400).json({
      message: "No product find with that id",
      product: [],
    });
  } else {
    res.status(200).json({
      message: "product fetched successfully",
      product,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Please provide id." });
  }

  // Find product first
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  const productImage = product.productImage;

  // Delete image from uploads folder if it's a local file
  if (productImage && !productImage.startsWith("http")) {
    const imagePath = path.join(__dirname, "../../../uploads", productImage);

    fs.unlink(imagePath, (err) => {
      if (err) console.log("Error deleting product image:", err.message);
      else console.log("Product image deleted successfully");
    });
  }

  // Delete product from database
  await Product.findByIdAndDelete(id);

  res.status(200).json({ message: "Product deleted successfully." });
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productStockQnt,
    productStatus,
  } = req.body || {};

  // Validation
  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStockQnt ||
    !productStatus ||
    !id
  ) {
    return res.status(400).json({
      message:
        "Please provide productName, productDescription, productPrice, productStockQnt, productStatus and id",
    });
  }

  // Find existing product
  const oldData = await Product.findById(id);
  if (!oldData) {
    return res.status(404).json({
      message: "Product not found with that id.",
    });
  }

  const oldProductImage = oldData.productImage;

  // Delete old image if new image uploaded
  if (req.file && req.file.filename && oldProductImage) {
    const oldImagePath = path.join(
      __dirname,
      "../../../uploads",
      oldProductImage,
    );

    fs.unlink(oldImagePath, (err) => {
      if (err) console.log("Error deleting old product image:", err.message);
      else console.log("Old product image deleted successfully");
    });
  }

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productPrice,
      productStockQnt,
      productStatus,
      productImage: req.file?.filename || oldProductImage, // use new image if uploaded
    },
    { new: true }, // return updated document
  );

  res.status(200).json({
    message: "Product updated successfully.",
    product: updatedProduct,
  });
};
