import { Router } from "express";

import { CreateUserController } from "@modules/profile/useCases/createProfile/CreateProfileController";

const createProfileController = new CreateUserController();

const registerRouter = Router();

registerRouter.post("/user", createProfileController.handle);

export { registerRouter };
