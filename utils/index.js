import {
    privateKey
} from "../config";
import jwt from 'jsonwebtoken';
import NotFoundError from "./errors/NotFoundError";
import {
    PUBLIC_OPERATIONS
} from "../universal/constants";
import UnauthorizedError from "./errors/UnauthorizedError";

export const checkAuth = (operationName, loggedUser) => {
    if (!PUBLIC_OPERATIONS.includes(operationName) && !loggedUser) {
        throw new UnauthorizedError();
    }
};

export const authenticate = async (token, {
    User
}) => {
    try {
        const {
            user: {
                id
            }
        } = jwt.verify(token, privateKey);

        const user = await User.findById(id);

        if (!user) {
            throw new NotFoundError({
                message: 'User not found',
            })
        }

        return {
            id: user.id,
            email: user.email,
        };

    } catch (e) {
        console.log('e', e);
    }
};