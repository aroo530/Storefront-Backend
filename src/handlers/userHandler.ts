import express, { Request, Response } from 'express';
import { User, UserOperations } from '../models/users';
import { verifyAuthToken } from '../middleware/verifyToken';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
const ROUNDS: number = Number(process.env.SALT_ROUNDS);
const BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
dotenv.config();

const operations = new UserOperations();

const getUser = async (req: Request, res: Response) => {
    const first_name: string = req.params.first_name;
    const user: User = await operations.getUser(first_name);
    res.json(user);
};

const getUsers = async (req: Request, res: Response) => {
    const users: User[] = await operations.getUsers();
    res.json(users);
};

const createUser = async (req: Request, res: Response) => {
    const tempUser: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: await bcrypt.hash(
            req.body.password + BCRYPT_PASSWORD,
            ROUNDS
        ),
    };
    //we pass the user object to the createUser function to save user in the database
    const newUser: User = await operations.createUser(tempUser);
    res.status(201).json(await createToken(newUser));
};

const login = async (req: Request, res: Response) => {
    try {
        const { first_name, password } = req.body;
        //find user
        const result = await operations.getUsers();
        const userFound = result.find((user) => {
            return user.first_name === first_name;
        });

        // console.log(userFound);
        if (userFound) {
            //send the token if the password is correct
            const isPasswordCorrect = bcrypt.compareSync(
                password + BCRYPT_PASSWORD,
                userFound.password
            );
            // console.log(isPasswordCorrect);
            if (isPasswordCorrect) {
                res.json(await createToken(userFound));
            } else {
                res.status(401).json('Password is incorrect');
            }
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
const updateUser = async (req: Request, res: Response) => {
    const password: string = await bcrypt.hash(
        req.body.password + process.env.BCRYPT_PASSWORD!,
        ROUNDS
    );
    const first_name: string = req.body.first_name;
    const updatedUser: User = await operations.updateUser(password, first_name);
    res.json(updatedUser);
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const first_name: string = req.params.first_name;
        await operations.deleteUser(first_name);
        res.json('User deleted');
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const userOperaionsRoutes = (app: express.Application) => {
    app.get('/users/:first_name', getUser);
    app.get('/users', getUsers);
    app.post('/users/signup', createUser);
    app.post('/users/login', login);
    app.put('/users', verifyAuthToken, updateUser);
    app.delete('/users/:first_name', verifyAuthToken, deleteUser);
};

const createToken = async (user: any) => {
    return jwt.sign(user, process.env.TOKEN_SECRET!);
};
