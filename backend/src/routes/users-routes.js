import { Router } from 'express';
import { login, createUser, getUserList, getUser, deleteUser, updateUser } from '../controllers/users-controller.js';
import { authCheck, authAdminCheck } from '../middleware/auth.js';
import { check, param } from 'express-validator';
import validateInput from '../middleware/validate.js';
import fileUpload from '../middleware/file-upload.js';

const usersRouter = Router();

usersRouter.post(
    '/login', 
    [
        check('email').normalizeEmail().isEmail(),
        check('password').not().isEmpty(),
    ],
    validateInput,
    login
);

usersRouter.use(authCheck);
usersRouter.get(
    '/:id', 
    param('id').isAlphanumeric(),
    validateInput,
    getUser
);
usersRouter.get('/', getUserList);
usersRouter.post(
    '/', 
    fileUpload.single('image'),
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').not().isEmpty(),
    ],
    validateInput,
    authAdminCheck, 
    createUser
);
usersRouter.delete(
    '/:id', 
    param('id').isAlphanumeric(),
    validateInput,
    deleteUser,
);
usersRouter.patch(
    '/:id', 
    fileUpload.single('image'),
    param('id').isAlphanumeric(),
    validateInput,
    updateUser,
);

export default usersRouter;