import { Schema, model, Document } from 'mongoose';
import bcry from 'bcryptjs';

export interface IUser  extends Document {
    username: string,
    email: string,
    password: string,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string, userPassword: string): Promise<boolean>,
    _id: string
};

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        trim: true

    },
    password: {
        type: String,
        require: true
    }
});

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcry.genSalt(10);
    return bcry.hash(password, salt)
};

userSchema.methods.validatePassword =  async function(password: string, userPassword: string): Promise<boolean> {
    return await bcry.compare(password, userPassword);

}

export default model<IUser>('User', userSchema);