import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { LoginUserController } from "../modules/user/useCases/loginUser/LoginUserController";
import { FindUserController } from "../modules/user/useCases/findUser/FindUserController";
import { auth } from "../middleware/auth";

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const findUserController = new FindUserController();

const useAuth = new auth();

const userRouter = Router();

userRouter.post("/register", createUserController.handle);

userRouter.get("/login", loginUserController.handle);

userRouter.get("/:id", useAuth.private, findUserController.handle);

export { userRouter };
