const express = require('express');
const route = express.Router();
const {
    create_warehouse,
    get_all_warehouses,
    get_warehouse_products
} = require("../controllers/warehouse_controller")

route.get("/warehouses", get_all_warehouses)
    .post("/warehouses", create_warehouse)
    .get("/warehouses/:warehouse_id/products", get_warehouse_products)


module.exports = route;