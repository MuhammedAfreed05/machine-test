const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


exports.create_warehouse = async (req, res) => {
    try {
        const { warehouse_number } = req.body;

        if (!warehouse_number) {
            return res.status(400).send({
                message: "Warehouse number is required"
            })
        }

        await prisma.warehouse.create({
            data: {
                warehouse_no: warehouse_number
            }
        })

        return res.status(201).send({
            message: "Warehouse created successfully"
        })

    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
}

exports.get_all_warehouses = async (req, res) => {
    try {
        const warehouses = await prisma.warehouse.findMany({})
        return res.send(warehouses)
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
}

exports.get_warehouse_products = async (req, res) => {
    try {
        const { warehouse_id } = req.params;
        const warehouse_stocks = await prisma.stock.findMany({
            where: {
                warehouse_id: warehouse_id,
            },
            include: {
                product: true
            }
        })
        return res.send(warehouse_stocks)
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
}