import jwt from 'jsonwebtoken';
import { secret } from '../config.js';
export const verifyToken = (req, res, next) => {
    var _a, _b;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'Access denied' });
    }
};
//# sourceMappingURL=auth.middleware.js.map