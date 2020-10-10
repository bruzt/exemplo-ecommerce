const express = require('express');
const multer = require('multer');

const multerConfig = require('./config/multerConfig');

const autoRequireAll = require('./util/autoRequireAll');
const jwtAuthentication = require('./middlewares/jwtAuthentication');
const adminJwtAuthentication = require('./middlewares/adminJwtAuthentication');
const multerErrorHandler = require('./middlewares/multerErrorHandler');

const controllers = autoRequireAll(__dirname, './controllers');

const addressController = require('./controllers/addressController');
const categoryController = require('./controllers/categoryController');
const freightController = require('./controllers/freightController');
const imageController = require('./controllers/imageController');
const orderController = require('./controllers/orderController');
const productController = require('./controllers/productController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');

const validators = autoRequireAll(__dirname, './middlewares/validators');

const router = express.Router();

// BUSCA, ADICIONA, ALTERA OU REMOVE USUÁRIOS
router.get('/users', userController.list);
router.get('/users/:id', validators.userValidators.show, userController.show);
router.post('/users', validators.userValidators.store, userController.store);
router.put('/users', validators.userValidators.update, jwtAuthentication, userController.update);
router.delete('/users', validators.userValidators.destroy, jwtAuthentication, userController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE ENDEREÇOS DE UM USUÁRIO
router.get('/addresses', validators.addressValidators.index, jwtAuthentication, addressController.list);
router.post('/addresses', validators.addressValidators.store, jwtAuthentication, addressController.store);
router.put('/addresses/:id', validators.addressValidators.update, jwtAuthentication, addressController.update);
router.delete('/addresses/:id', validators.addressValidators.destroy, jwtAuthentication, addressController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE PEDIDOS DE UM USUÁRIO
router.get('/orders', validators.orderValidators.index, jwtAuthentication, orderController.list);
router.post('/orders', validators.orderValidators.store, jwtAuthentication, orderController.store);
router.put('/orders/:id', validators.orderValidators.update, adminJwtAuthentication, orderController.update);
router.delete('/orders/:id', validators.orderValidators.destroy, adminJwtAuthentication, orderController.destroy);

// UPDATE DE SENHA POR EMAIL ("PERDEU A SENHA?")
router.post('/reset-password', validators.userResetPasswordValidator.store, controllers.userResetPasswordController.store);
router.put('/reset-password', validators.userResetPasswordValidator.update, controllers.userResetPasswordController.update);

// RETORNA UMA CHAVE JWT
router.post('/sessions', validators.sessionValidators.store, sessionController.store);

// BUSCA, ADICIONA, ALTERA OU REMOVE UM PRODUTO
router.get('/products', validators.productValidators.index, productController.list);
router.get('/products/:id', validators.productValidators.show, productController.show);
router.post('/products', validators.productValidators.store, adminJwtAuthentication, productController.store);
router.put('/products/:id', validators.productValidators.update, adminJwtAuthentication, productController.update);
router.delete('/products/:id', validators.productValidators.destroy, adminJwtAuthentication, productController.destroy);

// ADICIONA, ALTERA OU REMOVE UMA IMAGEM DO PRODUTO
router.post('/products/:id/images', validators.imageValidators.store, adminJwtAuthentication, multer(multerConfig).any(), multerErrorHandler, imageController.store);
router.delete('/products/images/:id', validators.imageValidators.destroy, adminJwtAuthentication, imageController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE UMA CATEGORIA
router.get('/categories', categoryController.list);
router.post('/categories', validators.categoryValidators.store, adminJwtAuthentication, categoryController.store);
router.put('/categories/:id', validators.categoryValidators.update, adminJwtAuthentication, categoryController.update);

// CALCULO DE FRETE
router.post('/freight', validators.freightValidators.store, freightController.store);

module.exports = router;