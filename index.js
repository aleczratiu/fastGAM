import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './graphql/schema';
import { addSchemaLevelResolveFunction } from 'graphql-tools';
import mongoose from 'mongoose';
import mongoModel from './database';
import cors from 'cors';
import bodyParser from 'body-parser';
import { checkAuth } from './utils';
import { ALLOWED_PATH } from './config';
import path from 'path';

const app = express();
const port = process.env.PORT || 4004;
const mongoDBUrl = 'mongodb://localhost:27017/api';

if (!mongoDBUrl) {
    throw new Error('Must provide mongoDB url');
}

//set HBS view engine
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(cors());

addSchemaLevelResolveFunction(schema, (root, args, context, info) => {
    if (!context.loggedUser && !ALLOWED_PATH.CREATE_SESSION) {
        throw new Error('non-auth');
    }
});

mongoose.Promise = global.Promise;
mongoose.connect(mongoDBUrl);
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use('/', expressGraphQL(req => ({
    graphiql: true,
    schema,
    context: {
        mongo: mongoModel,
        loggedUser: checkAuth(req.headers.authorization)
    },
})));

app.listen(port);

console.log(`Server is running on port ${port}`);
