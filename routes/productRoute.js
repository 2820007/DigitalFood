const { createProduct } = require("../controller/admin/product/productController")
const isAuthenticated = require("../middleware/isAuthenticateMidddleware")
const permitTo = require("../middleware/permitTo")

const router=require("express").Router()

router.route("/create-product").post(isAuthenticated,permitTo("admin"),createProduct)

module.exports=router