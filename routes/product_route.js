const express = require('express');
const route = express.Router();
const {
    add_product_stock,
    create_product,
    get_all_products,
    stock_and_unstock
} = require("../controllers/product_controller")

route.get("/products", get_all_products)
    .post("/products", create_product)
    .post("/products/warehouse/stock", add_product_stock)
    .post("/products/stock", stock_and_unstock)

module.exports = route;