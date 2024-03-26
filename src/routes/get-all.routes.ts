import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Router, Response, Request, NextFunction } from "express";

import { getAllCategoriesController } from "@modules/category/useCase/getAllCategories";
import { getAllProductsController } from "@modules/products/useCases/getAllProducts";
import { getTenantsController } from "@modules/tenants/useCases/getTenants";

import { auth } from "@middleware/auth";

const getAllRoutes = Router();

getAllRoutes.get("/categories/:slug", async (req: Request, res: Response) => {
  await getAllCategoriesController.handle(req, res);
});

getAllRoutes.get("/products", async (req: Request, res: Response) => {
  await getAllProductsController.handle(req, res);
});

getAllRoutes.get(
  "/tenants",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.DEV);
  },
  async (req: Request, res: Response) => {
    await getTenantsController.handle(req, res);
  },
);

export { getAllRoutes };
