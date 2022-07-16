const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.create_product = async (req, res) => {
    try {
        const product_name = req.body.product_name;
        if (!product_name) {
            return res.status(400).send({
                message: "Product name is required"
            })
        }


        await prisma.product.create({
            data: {
                product_name: product_name
            }
        })

        return res.status(201).send({
            message: "Product created successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.get_all_products = async (req, res) => {
    try {

        const products = await prisma.product.findMany({})

        return res.status(200).send(products)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.add_product_stock = async (req, res) => {
    try {
        const { product_id, warehouse_id, quantity } = req.body;
        if (!product_id || !warehouse_id || !quantity) {
            return res.status(400).send({
                message: "Product id, warehouse id and quantity are required"
            })
        }

        await prisma.stock.create({
            data: {
                product_id: product_id,
                warehouse_id: warehouse_id,
                quantity: quantity
            }
        })


        return res.status(201).send({
            message: "Stock added successfully"
        })

    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

exports.stock_and_unstock = async (req, res) => {
    try {
        const  {stock_id, quantity} = req.body;
        if (!stock_id || !quantity) {
            return res.status(400).send({
                message: "Stock id and quantity are required"
            })
        }
        const stock = await prisma.stock.findFirst({
            where: {
                stock_id    
            }
        })

        if(!stock) {
            return res.status(404).send({
                message: "Stock not found"
            })
        }
        await prisma.stock.update({
            where: {
                stock_id: stock_id
            },
            data: {
                quantity: quantity
            }
        })

        return res.status(200).send({
            message: "Stock updated successfully"
        })
    
    }catch(e) {
        return res.status(500).json({
            message: e.message
        })
    }
}