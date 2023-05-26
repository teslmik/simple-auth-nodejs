import { Types } from "mongoose";
import jwt from 'jsonwebtoken';

import { secret } from "../config.js";

const generateAccessToken = (_id: Types.ObjectId, roles: string[]) => {
  const payload = {
    _id,
    roles
  };

  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export { generateAccessToken };