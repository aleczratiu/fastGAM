import {
    GraphQLString,
    GraphQLNonNull
} from 'graphql';
import UserType from '../UserType';

const User = {
    type: UserType,
    args: {
        email: {
            type: GraphQLNonNull(GraphQLString)
        },
    },
    resolve: async (parent, args, { mongo: { User } }) => {
        const user = await User.findOne({ email: args.email});

        if(!user) {
            return null;
        }

        return user;
    }
}

export default User;
