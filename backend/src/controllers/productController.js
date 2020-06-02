const express = require('express');
const { Op } = require('sequelize');

const findCategoriesChildrenIds = require('../util/findCategoriesChildrenIds');

const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    index: async (req, res) => {

        const limit = req.query.limit;

        let filter = [
            ['quantity_stock', 'DESC'],
            ['discount_percent', 'DESC'],
            ['quantity_sold', 'DESC'],
        ];

        if(req.query.filter == 'lowest-price'){
            filter = [
                ['quantity_stock', 'DESC'],
                ['price', 'ASC'],
                ['discount_percent', 'DESC'],
                ['quantity_sold', 'DESC'],
            ];
        } else if(req.query.filter == 'biggest-price'){
            filter = [
                ['quantity_stock', 'DESC'],
                ['price', 'DESC'],
                ['discount_percent', 'DESC'],
                ['quantity_sold', 'DESC'],
            ];
        } else if(req.query.section == 'best-sellers'){
            filter = [
                ['quantity_stock', 'DESC'],
                ['quantity_sold', 'DESC'],
                ['discount_percent', 'DESC'],
            ];
        } else if(req.query.section == 'news'){
            filter = [
                ['quantity_stock', 'DESC'],
                ['createdAt', 'DESC'],
                ['discount_percent', 'DESC'],
                ['quantity_sold', 'DESC'],
            ];
        }     

        try {

            let products = [];

            if(req.query.title){

                products = await ProductModel.findAll({
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'category_id'] 
                    },
                    where: {
                        title: { 
                            [Op.iLike]: `%${req.query.title}%` 
                        }
                    },
                    limit,
                    order: filter,
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
                
                products = await ProductModel.findAll({
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'category_id'] 
                    },
                    limit,
                    order: filter,
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

            } else if(req.query.section == 'on-sale'){
                
                products = await ProductModel.findAll({
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'category_id'] 
                    },
                    limit,
                    where: {
                        discount_percent: {
                            [Op.gt]: 0
                        }
                    },
                    order: [
                        ['discount_percent', 'DESC']
                    ],
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

            } else {

                products = await ProductModel.findAll({
                    attributes: { 
                        exclude: ['updatedAt', 'deletedAt', 'category_id'] 
                    },
                    limit,
                    order: filter,
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

            return res.json(products);
            
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