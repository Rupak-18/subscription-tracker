import { Router } from "express";

import { SignUp, SignIn, SignOut } from "../controllers/auth.controller.js";

const authRouter = Router();

// 1
authRouter.post('/sign-up', SignUp);

// 2
authRouter.post('/sign-in', SignIn);

// 3
authRouter.post('/sign-out', SignOut);

export default authRouter;