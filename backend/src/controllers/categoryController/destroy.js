const express = require("express");

const CategoryModel = require("../../models/CategoryModel");
const ProductModel = require("../../models/ProductModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { id } = req.params;
  const { transferToId } = req.body;

  try {
    if (Number(id) == Number(transferToId))
      return res
        .status(400)
        .json({ message: "id and transferToId cannot be the same" });

    const category = await CategoryModel.findByPk(id);

    if (!category)
      return res.status(400).json({ message: "Category not found" });

    const categoryToTransfer = await CategoryModel.findByPk(transferToId);

    if (!categoryToTransfer)
      return res
        .status(400)
        .json({ message: "Category to transfer not found" });

    const categories = await CategoryModel.findAll();

    const hasChildren = categories.filter(
      (categoryItem) => categoryItem.parent_id == id
    );

    if (hasChildren.length > 0)
      return res
        .status(400)
        .json({ message: "Category to delete must not have childrens" });

    const products = await ProductModel.findAll({
      where: {
        category_id: id,
      },
    });

    for (let i = 0; i < products.length; i++) {
      await ProductModel.update(
        {
          category_id: transferToId,
        },
        {
          where: {
            id: products[i].id,
          },
        }
      );
    }

    await category.destroy();

    return res.status(204).json();
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    return res
      .status(500)
      .json({ message: "Unexpected error deleting category" });
  }
};
