import express from 'express';

import jwtAuthentication from './middlewares/jwtAuthentication';
import adminJwtAuthentication from './middlewares/adminJwtAuthentication';

// controllers
import userController from './controllers/userController';

// validators
import userValidators from './controllers/userController/validators';

const router = express.Router();

router.get('/users', userValidators.list, adminJwtAuthentication, userController.list);
router.get('/users/:id', userValidators.show, jwtAuthentication, userController.show);
router.post('/users', userValidators.store, userController.store);

export default router;
