import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'UserType',
    fields: {
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString,
        },
        updatedAt: {
            type: GraphQLString,
        }
    }
})

export default UserType;
