import UserType from '../UserType';
import {
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';
import sendMail from '../../../../utils/mail';
import InternalServerError from '../../../../utils/errors/InternalServerError';

const addUser = {
    type: UserType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        updatedAt: {
            type: GraphQLString,
        },
        createdAt: {
            type: GraphQLString,
        },
    },
    resolve: async(parent, args, { mongo: { User } }) => {
        const user = await new User(args);

        // bcrypt password from args
        user.password = await user.cryptPassword(args.password);

        // create session Token
        const sessionToken = await user.generateToken();

        await user.save();

        try {
            sendMail({
                to: user.email,
                from: 'contact@raulratiu.me',
                subject: 'Welcome to MyProject',
                context:
                    {
                        templateName: '/register/',
                        args: {
                            email: user.email,
                            title: 'Welcome',
                        },

                    },
            });
        } catch (e) {
            throw new InternalServerError({
                message: e.message,
            });
        }

        return {
            user,
            sessionToken
        };
    }
}

export default addUser;
