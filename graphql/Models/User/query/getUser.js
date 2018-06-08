import {
    GraphQLString,
    GraphQLNonNull
} from 'graphql';
import UserType from '../UserType';
import NotFoundError from '../../../../universal/errors/NotFoundError';

const User = {
    type: UserType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: async (parent, args, { mongo: { User } }) => {
        const user = await User.findOne({ email: args.email});

        if(!user) {
            throw new NotFoundError({
                message: 'Not found this email',
            });
        };

        return user;
    }
}

export default User;
