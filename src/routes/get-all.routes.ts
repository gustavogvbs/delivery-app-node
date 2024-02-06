import { Router, Response, Request } from "express";

import { getAllCategoriesController } from "@modules/category/useCase/getAllCategories";
import { getAllProductsController } from "@modules/products/useCases/getAllProducts";

const getAllRoutes = Router();

getAllRoutes.get("/categories", async (req: Request, res: Response) => {
  await getAllCategoriesController.handle(req, res);
});

getAllRoutes.get("/products", async (req: Request, res: Response) => {
  await getAllProductsController.handle(req, res);
});

export { getAllRoutes };
