import { GraphQLSchema } from 'graphql'
import rootQuery from './rootQuery';
import rootMutation from './rootMutation';

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

export default schema;
