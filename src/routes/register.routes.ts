import { Router } from "express";

import { createProfileController } from "@modules/profile/useCases/createProfile";
import { createTenantController } from "@modules/tenants/useCases/createTenants";
import { createAdminController } from "@modules/user/useCases/createAdmin";

import { auth } from "@middleware/auth";

const registerRouter = Router();

registerRouter.post("/user", createProfileController.handle);

registerRouter.post("/admin", createAdminController.handle);

registerRouter.post("/tenant", auth.admin, createTenantController.handle);

export { registerRouter };
