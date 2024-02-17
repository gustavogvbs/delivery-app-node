import { Router, Request, Response } from "express";

import { findTenantController } from "@modules/tenants/useCases/findTenant";
import { updateTenantController } from "@modules/tenants/useCases/updateTenants";

import { auth } from "@middleware/auth";

const tenantRouter = Router();

tenantRouter.patch(
  "/:slug",
  auth.admin,
  async (req: Request, res: Response) => {
    await updateTenantController.handle(req, res);
  },
);
tenantRouter.get("/:slug", async (req: Request, res: Response) => {
  await findTenantController.handle(req, res);
});
export { tenantRouter };
