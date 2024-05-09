import User from '../models/user.js';
import { createToken } from '../middleware/auth.js';
import HttpError from '../models/http-error.js';
import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new HttpError('User not found', 404);
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            throw new HttpError('Invalid credentials', 401);
        }
        const token = createToken(user);
        const {id, name, email, role} = user;
        res.json({
            user: {id, name, email, role},
            token: token,
        });
    } catch (error) {
        return handleError(error, next, 'Error while login');
    }
}

const createUser = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            throw new HttpError('User already exists', 401);
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const imagePath = req.file ? req.file.path : null;
        const newUser = new User({
            id: uuid(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            biodata: req.body.biodata,
        });
        if (imagePath) {
            newUser.image = imagePath;
        }
        const savedUser = await newUser.save();
        const {id, name, email, role, image, biodata} = savedUser;
        res.json({id, name, email, role, image, biodata});
    } catch (error) {
        return handleError(error, next, 'Error while creating new user');
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
            throw new HttpError('User does not exists', 404);
        }
        if (existingUser.role === 'admin') {
            throw new HttpError('Admin user cannot be deleted', 412);
        }
        const result = await User.findByIdAndDelete(existingUser.id);
        console.log(result);
        res.json({message: 'User deleted'});
    } catch (error) {
        return handleError(error, next, 'Error while deleting user');
    }
};

const handleError = (error, next, message) => {
    if (error instanceof HttpError) {
        return next(error);
    }
    console.log(error);
    return next(new HttpError(message, 500));
};

const getUser = async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
            throw new HttpError('User does not exists', 404);
        }
        const {id, name, email, role, image, biodata} = existingUser;
        res.json({id, name, email, role, image, biodata});
    } catch (error) {
        return handleError(error, next, 'Error while fetching user');
    }
};

const updateUser = async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
            throw new HttpError('User does not exists', 404);
        }
        if (req.body.name) {
            existingUser.name = req.body.name;
        }
        if (req.body.biodata) {
            existingUser.biodata = req.body.biodata;
        }
        console.log(req.body);
        const savedUser = await existingUser.save();
        const {id, name, email, role, image, biodata} = savedUser;
        res.json({id, name, email, role, image, biodata});
    } catch (error) {
        return handleError(error, next, 'Error while updating user');
    }
};

const getUserList = async (req, res, next) => {
    try {
        // We destructure the req.query object to get the page and limit variables from url 
        const { page = 1, limit = 10 } = req.query;

        const userList = await User.find()
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(limit * 1)
            .skip((page - 1) * limit)
            // We sort the data by the date of their creation in descending order (use 1 instead of -1 to get ascending order)
            .sort({ createdAt: 1 }).exec();

        // Getting the numbers of products stored in database
        const count = await User.countDocuments();

        return res.status(200).json({
            userList: userList.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
            })),
            totalPages: Math.ceil(count / limit),
            currentPage: page * 1,
        });
    } catch (error) {
        return handleError(error, next, 'Error while fetching user list');
    }
};

export {
    login,
    createUser,
    getUserList,
    getUser,
    deleteUser,
    updateUser,
};