const express = require('express');
const { Op } = require('sequelize');

const ProductModel = require('../../models/ProductModel');
const OrdersProductsModel = require('../../models/OrdersProductsModel');

function SortIdsByFrequency(arr) {
    const frequency = arr.reduce((obj, curr) => {
        obj[curr] = (obj[curr] || 0) + 1;
        return obj;
    }, {});
    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const uniqueIds = sorted.map((id) => id[0])
    return uniqueIds.map(Number);
}

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await ProductModel.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'category_id'] },
            include: [{
                association: 'images',
                attributes: ['id', 'url', 'filename'],
                required: false
            },
            {
                association: 'category',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        });

        if(!product) return res.status(400).json({ message: 'product not found' });

        // get ordersProducts who buyed this product
        const ordersProducts = await OrdersProductsModel.findAll({
            where: {
                product_id: product.id,
            },
        });

        // get order ids that have buyed this product
        const orderIds = ordersProducts.map((orderProduct) => orderProduct.order_id);

        // get ordersProducts who buyed this product but with other products
        const ordersProductsByOrderId = await OrdersProductsModel.findAll({
            where: {
                order_id: {
                    [Op.in]: orderIds
                }
            },
        });

        // get products ids
        const productsIds = ordersProductsByOrderId.map((orderProductByOrderId) => orderProductByOrderId.product_id);

        // remove this product id
        const buyedWithProductsIds = productsIds.filter((productsId) => productsId != product.id);

        // sort by frequency
        const sortedIds = SortIdsByFrequency(buyedWithProductsIds);

        // get products thas was most buyed with this product
        const productsBuyedWith = await ProductModel.findAll({
            where: {
                id: {
                    [Op.in]: sortedIds
                },
                quantity_stock: {
                    [Op.gt]: 0
                },
            },
            limit: 4,
        });

        /*const productsBuyedWith: ProductModel[] = [];
        for (const sortedId of sortedIds) {
            const productBuyedWith = await ProductModel.findOne({
                where: {
                    id: sortedId,
                    quantity_stock: MoreThan(0),
                },
            });
            if (productBuyedWith) productsBuyedWith.push(productBuyedWith);
            if (productsBuyedWith.length == 4) break;
        }*/

        return res.json({ product, productsBuyedWith });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
