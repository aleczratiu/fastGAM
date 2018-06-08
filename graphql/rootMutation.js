import {
    GraphQLObjectType
} from 'graphql';
import userMutation from './Models/User/userMutations';

const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'All mutations',
    fields: Object.assign({},
        userMutation,
    ),
})

export default rootMutation;