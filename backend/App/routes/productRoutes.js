const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

productRouter.get("/get", getProducts);
productRouter.post("/create", createProduct);
productRouter.get("/get/:id", getProductById);
productRouter.put("/update/:id", updateProduct)
productRouter.delete("/delete/:id", deleteProduct);

module.exports = productRouter;
