import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    console.log('header', req.header('auth-token'));
    let token: string = req.header('auth-token') || '';
    if(!token) res.status(401).json('Access denied');

    console.log('----LLEGAAAA');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'holamundo') as IPayload;
    console.log('payload',payload);
    // declaration mergin
    req.userId = payload._id;

    next();

}