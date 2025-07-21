import { Router } from 'express';

import { 
  getUsers, 
  getUser, 
  createUserAsAdmin, 
  updateUser, 
  deleteUser 
} from '../controllers/user.controller.js';

import authorize from '../middlewares/auth.middleware.js';
import requireAdmin from '../middlewares/admin.middleware.js';

const userRouter = Router();

// 1 (Admin only route)
userRouter.get('/', authorize, requireAdmin, getUsers);

// 2
userRouter.get('/:id', authorize, getUser);

// 3 (Admin only route)
userRouter.post('/', authorize, requireAdmin, createUserAsAdmin);

// 4
userRouter.put('/:id', authorize, updateUser);

// 5
userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;