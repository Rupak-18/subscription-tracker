import { Router } from 'express';

import { getUsers, getUser, createUserAsAdmin, updateUser, deleteUser } from '../controllers/user.controller.js';

import authorize from '../middlewares/auth.middleware.js';
import requireAdmin from '../middlewares/admin.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

// Admin only route
userRouter.post('/', authorize, requireAdmin, createUserAsAdmin);

userRouter.put('/:id', authorize, updateUser);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;