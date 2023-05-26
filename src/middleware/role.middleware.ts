import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { secret } from '../config.js';

export const varifyAdmin = (roles: string[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers?.authorization?.split(' ')[1];

      if (!token) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const { roles: userRoles } = jwt.verify(token, secret) as { roles: string[] };
      let hasRole = false;
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: 'Access denied' });
    }
  }
};
