import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const verifyAuthToken = async (
    req: Request,
    res: Response,
    next: Function
): Promise<void> => {
    try {
        const authorizationHeader = req.headers.authorization!;
        const token = authorizationHeader.split(' ')[1];
        // console.log(token);
        res.status(200);
        jwt.verify(token, process.env.TOKEN_SECRET!);
        next();
    } catch (err) {
        console.log(err);
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
