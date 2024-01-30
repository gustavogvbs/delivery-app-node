import { Router, Request, Response } from "express";

import { createProfileController } from "@modules/profile/useCases/createProfile";
import { createTenantController } from "@modules/tenants/useCases/createTenants";
import { createAdminController } from "@modules/user/useCases/createAdmin";

import { auth } from "@middleware/auth";

const registerRouter = Router();

registerRouter.post("/user", (req: Request, res: Response) => {
  return createProfileController.handle(req, res);
});

registerRouter.post("/admin", (req: Request, res: Response) => {
  createAdminController.handle(req, res);
});

registerRouter.post("/tenant", auth.admin, (req: Request, res: Response) => {
  createTenantController.handle(req, res);
});

export { registerRouter };
