import { Router } from "express";

import { FindUserController } from "@modules/user/useCases/findUser/FindUserController";
import { LoginUserController } from "@modules/user/useCases/loginUser/LoginUserController";

import { auth } from "@middleware/auth";

const loginUserController = new LoginUserController();
const findUserController = new FindUserController();

const useAuth = new auth();

const userRouter = Router();

userRouter.get("/login", loginUserController.handle);

userRouter.get("/:id", useAuth.private, findUserController.handle);

export { userRouter };
