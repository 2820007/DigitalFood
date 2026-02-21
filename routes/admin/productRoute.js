const {
  createProduct,
  deleteProduct,
  editProduct,
} = require("../../controller/admin/product/productController");
const isAuthenticated = require("../../middleware/isAuthenticateMidddleware");
const permitTo = require("../../middleware/permitTo");

const router = require("express").Router();

const { multer, storage } = require("../../middleware/multerConfig");
const catchAsync = require("../../services/catchAsync");
const { getProducts, getProduct } = require("../../controller/global/globalController");
const upload = multer({ storage: storage });

router
  .route("/products")
  .post(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    catchAsync(createProduct),
  )
  .get(catchAsync(getProducts));
router
  .route("/product/:id")
  .get(catchAsync(getProduct))
  .delete(isAuthenticated, permitTo("admin"), catchAsync(deleteProduct))
  .patch(isAuthenticated,permitTo("admin"),upload.single("productImage"),catchAsync(editProduct))

module.exports = router;
