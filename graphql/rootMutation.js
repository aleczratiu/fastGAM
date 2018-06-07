import {
    GraphQLObjectType
} from 'graphql';
import registerUser from './Models/User/mutation/registerUser';
import createSessionToken from './Models/User/mutation/createSessionToken';

const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'Here we import all mutations',
    fields: {
        registerUser,
        createSessionToken
    }
})

export default rootMutation;