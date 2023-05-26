import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { secret } from '../config.js';

export const verifyToken = (req: Request & { user: string | jwt.JwtPayload }, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Access denied' });
  }
};
