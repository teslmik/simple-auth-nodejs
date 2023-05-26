import jwt from 'jsonwebtoken';
import { secret } from "../config.js";
const generateAccessToken = (_id, roles) => {
    const payload = {
        _id,
        roles
    };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};
export { generateAccessToken };
//# sourceMappingURL=generate-access-token.js.map