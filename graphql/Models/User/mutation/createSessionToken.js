import UserType from '../UserType';
import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import NotFoundError from '../../../../utils/errors/NotFoundError';
import BadRequestError from '../../../../utils/errors/BadRequestError';

const createSessionToken = {
    type: UserType,
    args: {
        email: {
            type: GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async(parent, { email, password }, { mongo: { User } }) => {
        const user = await User.findOne({ email });

        console.log('user', user);

        if (!user) {
            throw new NotFoundError({
                message: 'User not found',
            })
        };
        
        if (!await user.checkPassword(password)) {
            throw new BadRequestError({
                message: 'Invalid password',
            });
        };

        const sessionToken = await user.generateToken();

        user.sessionToken = sessionToken;

        return user;
    }
}

export default createSessionToken;
