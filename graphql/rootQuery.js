import {
    GraphQLObjectType
} from 'graphql';
import userQuery from './Models/User/userQuery';

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'All queries',
    fields: Object.assign({},
        userQuery
    ),
});

export default rootQuery;