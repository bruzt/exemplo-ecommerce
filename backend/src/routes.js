const express = require('express');
const multer = require('multer');

const multerConfig = require('./config/multerConfig');

const autoRequireAll = require('./util/autoRequireAll');
const jwtAuthentication = require('./middlewares/jwtAuthentication');
const adminJwtAuthentication = require('./middlewares/adminJwtAuthentication');
const multerErrorHandler = require('./middlewares/multerErrorHandler');

const controllers = autoRequireAll(__dirname, './controllers');
const validators = autoRequireAll(__dirname, './middlewares/validators');

const router = express.Router();

// BUSCA, ADICIONA, ALTERA OU REMOVE USUÁRIOS
router.get('/users', controllers.userController.index);
router.get('/users/:id', validators.userValidators.show, controllers.userController.show);
router.post('/users', validators.userValidators.store, controllers.userController.store);
router.put('/users', validators.userValidators.update, jwtAuthentication, controllers.userController.update);
router.delete('/users', validators.userValidators.destroy, jwtAuthentication, controllers.userController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE ENDEREÇOS DE UM USUÁRIO
router.get('/addresses', validators.addressValidators.index, jwtAuthentication, controllers.addressController.index);
router.post('/addresses', validators.addressValidators.store, jwtAuthentication, controllers.addressController.store);
router.put('/addresses/:id', validators.addressValidators.update, jwtAuthentication, controllers.addressController.update);
router.delete('/addresses/:id', validators.addressValidators.destroy, jwtAuthentication, controllers.addressController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE PEDIDOS DE UM USUÁRIO
router.get('/orders', validators.orderValidators.index, jwtAuthentication, controllers.orderController.index);
router.post('/orders', validators.orderValidators.store, jwtAuthentication, controllers.orderController.store);
router.put('/orders/:id', validators.orderValidators.update, adminJwtAuthentication, controllers.orderController.update);
router.delete('/orders/:id', validators.orderValidators.destroy, adminJwtAuthentication, controllers.orderController.destroy);

// UPDATE DE SENHA POR EMAIL ("PERDEU A SENHA?")
router.post('/reset-password', validators.userResetPasswordValidator.store, controllers.userResetPasswordController.store);
router.put('/reset-password', validators.userResetPasswordValidator.update, controllers.userResetPasswordController.update);

// RETORNA UMA CHAVE JWT
router.post('/sessions', validators.sessionValidators.store, controllers.sessionController.store);

// BUSCA, ADICIONA, ALTERA OU REMOVE UM PRODUTO
router.get('/products', validators.productValidators.index, controllers.productController.index);
router.get('/products/:id', validators.productValidators.show, controllers.productController.show);
router.post('/products', validators.productValidators.store, adminJwtAuthentication, controllers.productController.store);
router.put('/products/:id', validators.productValidators.update, adminJwtAuthentication, controllers.productController.update);
router.delete('/products/:id', validators.productValidators.destroy, adminJwtAuthentication, controllers.productController.destroy);

// ADICIONA, ALTERA OU REMOVE UMA IMAGEM DO PRODUTO
router.post('/products/:id/images', validators.imageValidators.store, adminJwtAuthentication, multer(multerConfig).any(), multerErrorHandler, controllers.imageController.store);
router.delete('/products/images/:id', validators.imageValidators.destroy, adminJwtAuthentication, controllers.imageController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE UMA CATEGORIA
router.get('/categories', controllers.categoryController.index);
//router.get('/categories/:id', controllers.categoryController.show);
router.post('/categories', validators.categoryValidators.store, adminJwtAuthentication, controllers.categoryController.store);
router.put('/categories/:id', validators.categoryValidators.update, adminJwtAuthentication, controllers.categoryController.update);

// CORREIOS
router.post('/freight', validators.freightValidators.store, controllers.freightController.store);

module.exports = router;