import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './graphql/schema';
import mongoose from 'mongoose';
import mongoModel from './database';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 4004;
const mongoDBUrl = 'mongodb://localhost:27017/api';

if (!mongoDBUrl) {
    throw new Error('Must provide mongoDB url');
}

app.use(bodyParser.json());
app.use(cors());


mongoose.Promise = global.Promise;
mongoose.connect(mongoDBUrl);
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use('/', expressGraphQL({
    graphiql: true,
    schema,
    context: {
        mongo: mongoModel,
    },
}))

app.listen(port);

console.log(`Server is running on port ${port}`);
