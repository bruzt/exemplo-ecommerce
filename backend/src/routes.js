const express = require('express');

const autoRequireAll = require('./util/autoRequireAll');
const verifyJwt = require('./middlewares/verifyJwt');

const controllers = autoRequireAll(__dirname, './controllers');
const validators = autoRequireAll(__dirname, './middlewares/validators');

const router = express.Router();

// BUSCA, ADICIONA, ALTERA OU REMOVE USUÁRIOS
router.get('/users', controllers.userController.index);
router.get('/users/:id', validators.userValidators.show, controllers.userController.show);
router.post('/users', validators.userValidators.store, controllers.userController.store);
router.put('/users', validators.userValidators.update, verifyJwt, controllers.userController.update);
router.delete('/users', validators.userValidators.destroy, verifyJwt, controllers.userController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE ENDEREÇOS DE UM USUÁRIO
router.get('/addresses', validators.addressValidators.index, verifyJwt, controllers.addressController.index);
router.post('/addresses', validators.addressValidators.store, verifyJwt, controllers.addressController.store);
router.put('/addresses/:id', validators.addressValidators.update, verifyJwt, controllers.addressController.update);
router.delete('/addresses/:id', validators.addressValidators.destroy, verifyJwt, controllers.addressController.destroy);

// BUSCA, ADICIONA, ALTERA OU REMOVE PEDIDOS DE UM USUÁRIO
router.get('/orders', validators.orderValidators.index, verifyJwt, controllers.orderController.index);
router.get('/orders/:id', validators.orderValidators.show, controllers.orderController.show);
router.post('/orders', validators.orderValidators.store, verifyJwt, controllers.orderController.store);
router.put('/orders/:id', validators.orderValidators.update, verifyJwt, controllers.orderController.update);
router.delete('/orders/:id', validators.orderValidators.destroy, verifyJwt, controllers.orderController.destroy);

// UPDATE DE SENHA POR EMAIL ("PERDEU A SENHA?")
router.post('/reset-password', validators.userResetPasswordValidator.store, controllers.userResetPasswordController.store);
router.put('/reset-password', validators.userResetPasswordValidator.update, controllers.userResetPasswordController.update);

// RETORNA UMA CHAVE JWT
router.post('/sessions', validators.sessionValidators.store, controllers.sessionController.store);

// BUSCA, ADICIONA, ALTERA OU REMOVE UM PRODUTO
router.get('/products', controllers.productController.index);
router.get('/products/:id', controllers.productController.show);
router.post('/products', validators.productValidators.store, verifyJwt, controllers.productController.store);
router.put('/products/:id', validators.productValidators.update, verifyJwt, controllers.productController.update);
router.delete('/products/:id', validators.productValidators.destroy, verifyJwt, controllers.productController.destroy);

module.exports = router;