const express = require('express');
const { Op } = require('sequelize');

const findCategoriesChildrenIds = require('../util/findCategoriesChildrenIds');

const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    index: async (req, res) => {

        const limit = req.query.limit;
        const offset = req.query.offset;

        let order = [
            ['quantity_stock', 'DESC'],
            ['discount_percent', 'DESC'],
            ['quantity_sold', 'DESC'],
        ];

        let where = null;

        if(req.query.section == 'on-sale'){

            where = {
                discount_percent: {
                    [Op.gt]: 0
                }
            };

        } else if(req.query.section == 'best-sellers'){

            order.move(2, 0);

        } else if(req.query.section == 'news'){

            order.splice(0, 0, ['createdAt', 'DESC']);

            let date = new Date();
            let month = date.getMonth() - 1;

            if(month == -1) {

                month = 11;
                date.setFullYear(date.getFullYear() -1);
            }

            date.setMonth(month);

            where = {
                createdAt: { [Op.gte]: date }
            }
        }

        if(req.query.filter == 'lowest-price') order.splice(0, 0, ['price', 'ASC']);
        else if(req.query.filter == 'biggest-price') order.splice(0, 0, ['price', 'DESC']);

        try {

            let products = [];

            if(req.query.title){

                const title = req.query.title.split(' ').map( (word) => `%${word}%`);

                products = await ProductModel.findAndCountAll({
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'category_id'] 
                    },
                    where: {
                        title: { 
                            [Op.iLike]: {
                                [Op.any]: title
                            }
                        }
                    },
                    limit,
                    offset,
                    order,
                    include: [
                        {
                            association: 'images',
                            attributes: ['id', 'url', 'filename'],
                            required: false
                        },                    
                        {
                            association: 'category',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        }
                    ]
                });

            } else if(req.query.category){

                let categories = await CategoryModel.findAll();

                categories = categories.map( (category) => ({
                    id: category.id,
                    parent_id: category.parent_id
                }));

                const categoriesIds = findCategoriesChildrenIds(req.query.category, categories);
                
                products = await ProductModel.findAndCountAll({
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'category_id'] 
                    },
                    limit,
                    offset,
                    order,
                    include: [
                        {
                            association: 'images',
                            attributes: ['id', 'url', 'filename'],
                            required: false
                        },                    
                        {
                            association: 'category',
                            attributes: { 
                                exclude: ['createdAt', 'updatedAt'] 
                            },
                            where: { 
                                id: categoriesIds
                            },
                       }
                    ]
                });

            } else {

                products = await ProductModel.findAndCountAll({
                    attributes: { 
                        exclude: ['updatedAt', 'deletedAt', 'category_id'] 
                    },
                    where,
                    limit,
                    offset,
                    order,
                    include: [
                        {
                            association: 'images',
                            attributes: ['id', 'url', 'filename'],
                            required: false
                        },                    
                        {
                            association: 'category',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        }
                    ]
                });
            }
            
            return res.json({ count: products.count, products: products.rows });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },


    /** @param {express.Request} req * @param {express.Response} res */
    show: async (req, res) => {

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

            return res.json(product);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    store: async (req, res) => {

        req.body.price = req.body.price.toFixed(2);
        
        try {

            const category = await CategoryModel.findByPk(req.body.category_id);

            if(!category) return res.status(400).json({ message: 'category not found' });

            const product = await ProductModel.create(req.body);

            return res.json(product);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    

    /** @param {express.Request} req * @param {express.Response} res */
    update: async (req, res) => {

        const { id } = req.params;

        try {

            const [ updated ] = await ProductModel.update(req.body, { where: { id }});

            if(updated == 0) return res.status(400).json({ message: 'no update has been made' });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    destroy: async (req, res) => {

        const { id } = req.params;

        try {

            const product = await ProductModel.destroy({ where: { id }});

            if(product == 0) return res.status(400).json({ message: 'product not found' });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    }
}