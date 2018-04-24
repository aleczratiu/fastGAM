import {
    GraphQLObjectType
} from 'graphql';
import getUser from './Models/User/query/getUser';

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Here we import all queries',
    fields: { getUser }
})

export default rootQuery;
