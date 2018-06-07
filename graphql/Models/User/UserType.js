import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user object.',
    fields: {
        id: {
            type: GraphQLID,
            description: "A user's id.",
        },
        firstName: {
            type: GraphQLString,
            description: "A user's fistName",
        },
        lastName: {
            type: GraphQLString,
            description: "A user's lastName",
        },
        email: {
            type: GraphQLString,
            description: "A user's email."
        },
        password: {
            type: GraphQLString,
            description: "A user's password."
        },
        createdAt: {
            type: GraphQLString,
            description: "A user's createdAt."
        },
        updatedAt: {
            type: GraphQLString,
            description: "A user's updatedAt."
        },
        sessionToken: {
            type: GraphQLString,
            description: "A user's sessionToken."
        }
    }
})

export default UserType;
