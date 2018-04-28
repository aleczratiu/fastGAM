import { GraphQLObjectType } from 'graphql';
import addUser from './Models/User/mutation/addUser';
import createSessionToken from './Models/User/mutation/createSessionToken';

const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'Here we import all mutations',
    fields: { addUser, createSessionToken }
})

export default rootMutation;
