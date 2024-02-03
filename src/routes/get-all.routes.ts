import { Router, Response, Request } from "express";

import { getAllCategoriesController } from "@modules/category/useCase/getAllCategories";

const getAllRoutes = Router();

getAllRoutes.get("/categories", (req: Request, res: Response) => {
  getAllCategoriesController.handle(req, res);
});

export { getAllRoutes };
