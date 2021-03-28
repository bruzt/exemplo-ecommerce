import express from 'express';
import multer from 'multer';

import imageUploadConfig from './config/multer/imageUpload';
import multerErrorHandler from './middlewares/multerErrorHandler';

import jwtAuthentication from './middlewares/jwtAuthentication';
import adminJwtAuthentication from './middlewares/adminJwtAuthentication';

// controllers
import userController from './controllers/userController';
import sessionController from './controllers/sessionController';
import addressController from './controllers/addressController';
import categoryController from './controllers/categoryController';
import productController from './controllers/productController';
import imageController from './controllers/imageController';

// validators
import userValidator from './controllers/userController/validators';
import sessionValidator from './controllers/sessionController/validators';
import addressValidator from './controllers/addressController/validators';
import categoryValidator from './controllers/categoryController/validators';
import productValidator from './controllers/productController/validators';
import imageValidator from './controllers/imageController/validators';

const router = express.Router();

// USER
router.get('/users', userValidator.list, adminJwtAuthentication, userController.list);
router.get('/users/:id', userValidator.show, jwtAuthentication, userController.show);
router.post('/users', userValidator.store, userController.store);
router.put('/users', userValidator.update, jwtAuthentication, userController.update);
router.delete('/users', userValidator.destroy, jwtAuthentication, userController.destroy);

// SESSION
router.post('/sessions', sessionValidator.store, sessionController.store);

// ADDRESS
router.get('/addresses', addressValidator.list, jwtAuthentication, addressController.list);
router.post('/addresses', addressValidator.store, jwtAuthentication, addressController.store);
router.put('/addresses/:id', addressValidator.update, jwtAuthentication, addressController.update);
router.delete('/addresses/:id', addressValidator.destroy, jwtAuthentication, addressController.destroy);

// CATEGORY
router.get('/categories', categoryController.list);
router.post('/categories', categoryValidator.store, adminJwtAuthentication, categoryController.store);
router.put('/categories/:id', categoryValidator.update, adminJwtAuthentication, categoryController.update);
router.delete('/categories/:id', categoryValidator.destroy, adminJwtAuthentication, categoryController.destroy);

// PRODUCT
router.get('/products', productValidator.list, productController.list);
router.get('/products/:id', productValidator.show, productController.show);
router.post('/products', productValidator.store, adminJwtAuthentication, productController.store);
router.put('/products/:id', productValidator.update, adminJwtAuthentication, productController.update);
router.delete('/products/:id', productValidator.destroy, adminJwtAuthentication, productController.destroy);

// IMAGE
router.post('/products/:id/images', imageValidator.store, adminJwtAuthentication, multer(imageUploadConfig).any(), multerErrorHandler, imageController.store);

export default router;
