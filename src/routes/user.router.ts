import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

const userRouter = Router();

userRouter.post("/", createUserController.handle);

export { userRouter };
