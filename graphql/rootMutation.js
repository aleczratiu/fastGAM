import { GraphQLObjectType } from 'graphql';
import addUser from './Models/User/mutation/addUser';

const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'Here we import all mutations',
    fields: { addUser }
})

export default rootMutation;
