import { Router } from "express";

import { findUserController } from "@modules/user/useCases/findUser";
import { loginUserController } from "@modules/user/useCases/loginUser";

import { auth } from "@middleware/auth";

const useAuth = new auth();

const userRouter = Router();

userRouter.get("/login", loginUserController.handle);

userRouter.get("/:id", useAuth.private, findUserController.handle);

export { userRouter };
