"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOperaionsRoutes = void 0;
const users_1 = require("../models/users");
const verifyToken_1 = require("../middleware/verifyToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const ROUNDS = Number(process.env.SALT_ROUNDS);
const BCRYPT_PASSWORD = String(process.env.BCRYPT_PASSWORD);
dotenv_1.default.config();
const operations = new users_1.UserOperations();
const getUser = async (req, res) => {
    try {
        const first_name = req.params.first_name;
        const user = await operations.getUser(first_name);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await operations.getUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const createUser = async (req, res) => {
    try {
        const tempUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: await bcrypt_1.default.hash(req.body.password + BCRYPT_PASSWORD, ROUNDS),
        };
        //we pass the user object to the createUser function to save user in the database
        const newUser = await operations.createUser(tempUser);
        res.status(201).json(await createToken(newUser));
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const login = async (req, res) => {
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
            const isPasswordCorrect = bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, userFound.password);
            // console.log(isPasswordCorrect);
            if (isPasswordCorrect) {
                res.json(await createToken(userFound));
            }
            else {
                res.status(401).json('Password is incorrect');
            }
        }
        else {
            res.status(404).json('User not found');
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
const updateUser = async (req, res) => {
    try {
        const password = await bcrypt_1.default.hash(req.body.password + process.env.BCRYPT_PASSWORD, ROUNDS);
        const first_name = req.body.first_name;
        const updatedUser = await operations.updateUser(password, first_name);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
const deleteUser = async (req, res) => {
    try {
        const first_name = req.params.first_name;
        await operations.deleteUser(first_name);
        res.json('User deleted');
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
const userOperaionsRoutes = (app) => {
    app.get('/users/:first_name', verifyToken_1.verifyAuthToken, getUser);
    app.get('/users', verifyToken_1.verifyAuthToken, getUsers);
    app.post('/users/signup', createUser);
    app.post('/users/login', login);
    app.put('/users', verifyToken_1.verifyAuthToken, updateUser);
    app.delete('/users/:first_name', verifyToken_1.verifyAuthToken, deleteUser);
};
exports.userOperaionsRoutes = userOperaionsRoutes;
const createToken = async (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
};
