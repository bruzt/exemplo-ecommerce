const express = require("express");
const { Op } = require("sequelize");

const ProductModel = require("../../models/ProductModel");
const OrdersProductsModel = require("../../models/OrdersProductsModel");
const sortIdsByFrequency = require("../../util/sortIdsByFrequency");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { id } = req.params;
  const buyedWith = Number(req.query.buyedWith);

  try {
    const product = await ProductModel.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "category_id"],
      },
      include: [
        {
          association: "images",
          attributes: ["id", "url", "filename"],
          required: false,
        },
        {
          association: "category",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    if (!product) return res.status(400).json({ message: "product not found" });

    const productWithBuyed = { ...product.get(), productsBuyedWith: [] };

    if (buyedWith) {
      // get ordersProducts who buyed this product
      const ordersProducts = await OrdersProductsModel.findAll({
        where: {
          product_id: product.id,
        },
      });

      // get order ids that have buyed this product
      const orderIds = ordersProducts.map(
        (orderProduct) => orderProduct.order_id
      );

      // get ordersProducts who buyed this product but with other products
      const ordersProductsByOrderId = await OrdersProductsModel.findAll({
        where: {
          order_id: {
            [Op.in]: orderIds,
          },
        },
      });

      // get products ids
      const productsIds = ordersProductsByOrderId.map(
        (orderProductByOrderId) => orderProductByOrderId.product_id
      );

      // remove this product id
      const buyedWithProductsIds = productsIds.filter(
        (productsId) => productsId != product.id
      );

      // sort by frequency
      const sortedIds = sortIdsByFrequency(buyedWithProductsIds);

      // get products thas was most buyed with this product
      const productsBuyedWith = await ProductModel.findAll({
        where: {
          id: {
            [Op.in]: sortedIds.splice(0, buyedWith * 2),
          },
          quantity_stock: {
            [Op.gt]: 0,
          },
        },
        include: [
          {
            association: "images",
            attributes: ["id", "url", "filename"],
            required: false,
          },
          {
            association: "category",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        limit: buyedWith,
      });

      productsBuyedWith.forEach((product) => {
        productWithBuyed.productsBuyedWith.push(product);
      });

      /*const productsBuyedWith = [];
        for (const sortedId of sortedIds) {
            const productBuyedWith = await ProductModel.findOne({
                where: {
                    id: sortedId,
                    quantity_stock: {
                        [Op.gt]: 0
                    },
                },
                include: [{
                    association: 'images',
                    attributes: ['id', 'url', 'filename'],
                    required: false
                },
                {
                    association: 'category',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }],
            });
            if (productBuyedWith) productsBuyedWith.push(productBuyedWith);
            if (productsBuyedWith.length == 4) break;
        }
        */
    }

    return res.json(productWithBuyed);
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
