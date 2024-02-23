import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Router, Request, Response, NextFunction } from "express";

import { findTenantController } from "@modules/tenants/useCases/findTenant";
import { updateTenantController } from "@modules/tenants/useCases/updateTenants";

import { auth } from "@middleware/auth";

const tenantRouter = Router();

tenantRouter.patch(
  "/:slug",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.TENANT);
  },
  async (req: Request, res: Response) => {
    await updateTenantController.handle(req, res);
  },
);
tenantRouter.get("/:slug", async (req: Request, res: Response) => {
  await findTenantController.handle(req, res);
});
export { tenantRouter };
