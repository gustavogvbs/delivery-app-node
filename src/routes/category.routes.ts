import { Router, Response, Request } from "express";

import { createCategoryController } from "@modules/category/useCase/createCategory";
import { getAllCategoriesController } from "@modules/category/useCase/getAllCategories";

import { auth } from "@middleware/auth";

const categoryRouter = Router();

categoryRouter.post("/create", auth.tenant, (req: Request, res: Response) => {
  createCategoryController.handle(req, res);
});
categoryRouter.get("/", auth.tenant, (req: Request, res: Response) => {
  getAllCategoriesController.handle(req, res);
});

export { categoryRouter };
