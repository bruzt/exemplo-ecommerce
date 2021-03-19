import express from 'express';

import jwtAuthentication from './middlewares/jwtAuthentication';
import adminJwtAuthentication from './middlewares/adminJwtAuthentication';

// controllers
import userController from './controllers/userController';
import sessionController from './controllers/sessionController';
import addressController from './controllers/addressController';

// validators
import userValidator from './controllers/userController/validators';
import sessionValidator from './controllers/sessionController/validators';
import addressValidator from './controllers/addressController/validators';

const router = express.Router();

router.get('/users', userValidator.list, adminJwtAuthentication, userController.list);
router.get('/users/:id', userValidator.show, jwtAuthentication, userController.show);
router.post('/users', userValidator.store, userController.store);
router.put('/users', userValidator.update, jwtAuthentication, userController.update);
router.delete('/users', userValidator.destroy, jwtAuthentication, userController.destroy);

router.post('/sessions', sessionValidator.store, sessionController.store);

router.get('/addresses', addressValidator.list, jwtAuthentication, addressController.list);
router.post('/addresses', addressValidator.store, jwtAuthentication, addressController.store);
router.put('/addresses/:id', addressValidator.update, jwtAuthentication, addressController.update);

export default router;
