import {
    GraphQLString,
    GraphQLNonNull
} from 'graphql';
import UserType from '../UserType';
import UnauthorizedError from '../../../../universal/errors/UnauthorizedError';
import NotFoundError from '../../../../universal/errors/NotFoundError';

const getUserBySessionToken = {
    type: UserType,
    args: {
        sessionToken: {
            type: GraphQLString,
            description: 'User sessionToken',
        },
    },
    resolve: async (parent, args, {
        mongo: {
            User
        }
    }) => {
        const token = await User.verifyToken(args.sessionToken);

        if (!token || !token.user) {
            return null;
        }

        const user = await User.findById(token.user.id);

        if (!user) {
            if (!token || !token.user) {
                throw new NotFoundError({
                    message: 'User not found',
                })
            }
        }

        return user;
    }
}

export default getUserBySessionToken;