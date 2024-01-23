import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { LoginUserController } from "../modules/user/useCases/loginUser/LoginUserController";

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

const userRouter = Router();

userRouter.post("/", createUserController.handle);

userRouter.get("/login", loginUserController.handle);

export { userRouter };
