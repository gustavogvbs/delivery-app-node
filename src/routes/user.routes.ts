import { Router } from "express";

import { findUserController } from "@modules/user/useCases/findUser";
import { loginUserController } from "@modules/user/useCases/loginUser";

import { auth } from "@middleware/auth";

const userRouter = Router();

userRouter.get("/login", loginUserController.handle);

userRouter.get("/:id", auth.client, findUserController.handle);

export { userRouter };
