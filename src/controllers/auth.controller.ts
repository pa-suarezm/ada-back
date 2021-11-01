import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async (req:Request, res:Response) => {

    // saving new user
    let { username, email, password } = req.body;
    const user : IUser = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(password);

    const saveUser = await user.save();
    // create token
    const token: string = jwt.sign({ _id: saveUser._id}, process.env.TOKEN_SECRET || 'holamundo');
    res.header('auth-token', token).json(saveUser);
}

// INICIAT SESION
export const signin = async (req:Request, res:Response)  => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if(!user) {
       return res.status(400).json('Usuario no encontrado')
    } 

    let correctPassword = await user?.validatePassword(password, user.password);
    if(!correctPassword) {
        return res.status(400).json('Invalid password');
    }

    const token: string = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET || 'holamundo', {
        expiresIn: 60 * 60 * 24
    });

    return res.header('auth-token', token).json(user);
    
}

// Ver perfil
export const profile = async (req:Request, res:Response)  => {
    const user = await User.findById(req.userId, { password: 0 });
    if(!user) res.status(404).json('No user found');
    res.json(user);

}

