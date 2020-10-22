const express = require('express');
const multer = require('multer');

// Multer
const multerConfig = require('./config/multerConfig');
const multerErrorHandler = require('./middlewares/multerErrorHandler');

const autoRequireAll = require('./util/autoRequireAll');

// Authentication
const jwtAuthentication = require('./middlewares/jwtAuthentication');
const adminJwtAuthentication = require('./middlewares/adminJwtAuthentication');

// Validators
const addressValidator = require('./middlewares/validators/addressValidator');
const categoryValidator = require('./middlewares/validators/categoryValidator');
const freightValidator = require('./middlewares/validators/freightValidator');
const imageValidator = require('./middlewares/validators/imageValidator');
const orderAdminValidator = require('./middlewares/validators/orderAdminValidator');
const orderValidator = require('./middlewares/validators/orderValidator');

// Controllers
const addressController = require('./controllers/addressController');
const categoryController = require('./controllers/categoryController');
const freightController = require('./controllers/freightController');
const imageController = require('./controllers/imageController');
const orderAdminController = require('./controllers/orderAdminController');
const orderController = require('./controllers/orderController');
const productController = require('./controllers/productController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const userResetPasswordController = require('./controllers/userResetPasswordController');

const validators = autoRequireAll(__dirname, './middlewares/validators');

const router = express.Router();

// BUSCA, ADICIONA, ALTERA OU REMOVE USUÁRIOS
router.get('/users', userController.list);
router.get('/users/:id', validators.userValidators.show, userController.show);
router.post('/users', validators.userValidators.store, userController.store);
router.put('/users', validators.userValidators.update, jwtAuthentication, userController.update);
router.delete('/users', validators.userValidators.destroy, jwtAuthentication, userController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE ENDEREÇOS DE UM USUÁRIO
router.get('/addresses', addressValidator.list, jwtAuthentication, addressController.list);
router.post('/addresses', addressValidator.store, jwtAuthentication, addressController.store);
router.put('/addresses/:id', addressValidator.update, jwtAuthentication, addressController.update);
router.delete('/addresses/:id', addressValidator.destroy, jwtAuthentication, addressController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE PEDIDOS DE UM USUÁRIO
router.get('/orders', orderValidator.list, jwtAuthentication, orderController.list);
router.post('/orders', orderValidator.store, jwtAuthentication, orderController.store);

// BUSCA, ALTERA OU REMOVE PEDIDOS DE UM USUÁRIO PELO ADMIN
router.get('/admin/orders', orderAdminValidator.list, adminJwtAuthentication, orderAdminController.list);
router.put('/admin/orders/:id', orderAdminValidator.update, adminJwtAuthentication, orderAdminController.update);
router.delete('/admin/orders/:id', orderAdminValidator.destroy, adminJwtAuthentication, orderAdminController.destroy);

// UPDATE DE SENHA POR EMAIL ("PERDEU A SENHA?")
router.post('/reset-password', validators.userResetPasswordValidator.store, userResetPasswordController.store);
router.put('/reset-password', validators.userResetPasswordValidator.update, userResetPasswordController.update);

// RETORNA UMA CHAVE JWT
router.post('/sessions', validators.sessionValidators.store, sessionController.store);

// BUSCA, ADICIONA, ALTERA OU REMOVE UM PRODUTO
router.get('/products', validators.productValidators.index, productController.list);
router.get('/products/:id', validators.productValidators.show, productController.show);
router.post('/products', validators.productValidators.store, adminJwtAuthentication, productController.store);
router.put('/products/:id', validators.productValidators.update, adminJwtAuthentication, productController.update);
router.delete('/products/:id', validators.productValidators.destroy, adminJwtAuthentication, productController.destroy);

// ADICIONA, ALTERA OU REMOVE UMA IMAGEM DO PRODUTO
router.post('/products/:id/images', imageValidator.store, adminJwtAuthentication, multer(multerConfig).any(), multerErrorHandler, imageController.store);
router.delete('/products/images/:id', imageValidator.destroy, adminJwtAuthentication, imageController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE UMA CATEGORIA
router.get('/categories', categoryController.list);
router.post('/categories', categoryValidator.store, adminJwtAuthentication, categoryController.store);
router.put('/categories/:id', categoryValidator.update, adminJwtAuthentication, categoryController.update);

// CALCULO DE FRETE
router.post('/freight', freightValidator.store, freightController.store);

module.exports = router;