import { privateKey } from "../config";
import jwt from 'jsonwebtoken';

export const checkAuth = (token) => {
    try {
        const { user } = jwt.verify(token, privateKey);
        return user;
    } catch(e) {
        return null;
    }
};
