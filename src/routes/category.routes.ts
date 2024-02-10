import { Router, Response, Request } from "express";

import { createCategoryController } from "@modules/category/useCase/createCategory";
import { getAllCategoriesController } from "@modules/category/useCase/getAllCategories";

import { auth } from "@middleware/auth";

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  auth.tenant,
  async (req: Request, res: Response) => {
    await createCategoryController.handle(req, res);
  },
);

categoryRouter.patch(
  "/:slug",
  auth.tenant,
  async (req: Request, res: Response) => {
    await updateCategoryController.handle(req, res);
  },
);

export { categoryRouter };
