import { Router } from "express";

import { CreateUserController } from "@modules/profile/useCases/createProfile/CreateProfileController";
import { createAdminController } from "@modules/user/useCases/createAdmin";

const createProfileController = new CreateUserController();

const registerRouter = Router();

registerRouter.post("/user", createProfileController.handle);

registerRouter.post("/admin", createAdminController.handle);

export { registerRouter };
