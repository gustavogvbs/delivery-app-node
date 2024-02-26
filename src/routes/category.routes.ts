import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Router, Response, Request, NextFunction } from "express";

import { createCategoryController } from "@modules/category/useCase/createCategory";
import { updateCategoryController } from "@modules/category/useCase/updateCategoty";

import { auth } from "@middleware/auth";

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.TENANT);
  },
  async (req: Request, res: Response) => {
    await createCategoryController.handle(req, res);
  },
);

categoryRouter.patch(
  "/:slug",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.TENANT);
  },
  async (req: Request, res: Response) => {
    await updateCategoryController.handle(req, res);
  },
);

export { categoryRouter };
