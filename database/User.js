import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { privateKey } from '../config';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    }
});

// define method bcrypt password
UserSchema.methods.cryptPassword = async function cryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}

// compare password bcrypt
UserSchema.methods.checkPassword = async function checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
};

//create user token with jsonwebtoken
UserSchema.methods.generateToken = async function generateToken() {
    return jwt.sign({
        user: {
            id: this.id,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
      }, privateKey);
};

UserSchema.methods.verifyToken = async function verifyToken(token) {
    try {
        return await jwt.verify(token, privateKey);
    } catch (e) {
        return false;
    }
}

export default mongoose.model('User', UserSchema);
