import { Router } from 'express';
import { check } from 'express-validator';

import { AuthController } from './auth.controller.js';
import { varifyAdmin } from './middleware/role.middleware.js'

const router = Router();

router.post(
  '/registration',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check('email', 'Email cannot be empty').notEmpty().isEmail(),
    check('password', 'Password must be at least five and no more than thirty characters').isLength(
      { min: 5, max: 30 },
    ),
  ],
  AuthController.registration,
);
router.post('/login', AuthController.login);
router.get('/users', varifyAdmin(['ADMIN']), AuthController.getUsers);

export default router;
