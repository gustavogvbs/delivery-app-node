import { Router, Response, Request } from "express";

import { getAllCategoriesController } from "@modules/category/useCase/getAllCategories";
import { getAllProductsController } from "@modules/products/useCases/getAllProducts";

const getAllRoutes = Router();

getAllRoutes.get("/categories", (req: Request, res: Response) => {
  getAllCategoriesController.handle(req, res);
});

getAllRoutes.get("/products", (req: Request, res: Response) => {
  getAllProductsController.handle(req, res);
});

export { getAllRoutes };
