import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Router, Request, Response, NextFunction } from "express";

import { createTenantController } from "@modules/tenants/useCases/createTenants";
import { createAdminController } from "@modules/user/useCases/createAdmin";
import { createClientController } from "@modules/user/useCases/createClient";
import { createDevController } from "@modules/user/useCases/createDev";

import { auth } from "@middleware/auth";

const registerRouter = Router();

registerRouter.post("/user", async (req: Request, res: Response) => {
  await createClientController.handle(req, res);
});

registerRouter.post("/admin", async (req: Request, res: Response) => {
  await createAdminController.handle(req, res);
});

registerRouter.post(
  "/tenant",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.ADMIN);
  },
  async (req: Request, res: Response) => {
    await createTenantController.handle(req, res);
  },
);

registerRouter.post(
  "/dev",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.ADMIN);
  },
  async (req: Request, res: Response) => {
    await createDevController.handle(req, res);
  },
);

export { registerRouter };
