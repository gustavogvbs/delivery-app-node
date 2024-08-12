import { Router, Request, Response } from "express";

import { findTenantController } from "@modules/tenants/useCases/findTenant";
import { updateTenantController } from "@modules/tenants/useCases/updateTenants";

const tenantRouter = Router();

tenantRouter.patch("/:id", async (req: Request, res: Response) => {
  await updateTenantController.handle(req, res);
});

tenantRouter.get("/:slug", async (req: Request, res: Response) => {
  await findTenantController.handle(req, res);
});

export { tenantRouter };
