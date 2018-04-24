import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
UserSchema.methods.cryptPassword = async (password) => {
    return bcrypt.hashSync(password, 10);
}

export default mongoose.model('User', UserSchema);
