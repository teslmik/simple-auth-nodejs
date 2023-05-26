import jwt from 'jsonwebtoken';
import { secret } from '../config.js';
export const varifyAdmin = (roles) => {
    return function (req, res, next) {
        var _a, _b;
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Access denied' });
            }
            const { roles: userRoles } = jwt.verify(token, secret);
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
        }
        catch (error) {
            console.log(error);
            return res.status(403).json({ message: 'Access denied' });
        }
    };
};
//# sourceMappingURL=role.middleware.js.map