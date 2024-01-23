import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

const useRouter = Router();

useRouter.post("/", createUserController.handle);

export { useRouter };
