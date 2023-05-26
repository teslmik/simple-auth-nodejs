import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { validationResult } from 'express-validator';
import { Request } from 'express-validator/src/base.js';

import UserModel from './models/user.model.js';
import RoleModel from './models/role.model.js';
import { generateAccessToken } from './utils/generate-access-token.js';

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error...', errors });
      }

      const { username, password, email } = req.body;
      const checkEmail = await UserModel.findOne({ email });

      if (checkEmail) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await RoleModel.findOne({ value: 'USER' });
      const user = new UserModel({ username, email, password: hashPassword, role: [userRole?.value] });
      await user.save();

      return res.json({ message: 'User successfully registered' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Registration error...' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const validPassword = user && bcrypt.compareSync(password, user.password);

      if (!user || !validPassword) {
        return res.json({ message: 'Invalid password or username...' });
      }

      const token = generateAccessToken(user._id, user.role);

      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login error...' });
    }
  }

  async getUsers(_: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }

}

export const AuthController = new authController();
