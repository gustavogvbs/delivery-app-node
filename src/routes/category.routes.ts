import { Router, Response, Request } from "express";

import { createCategoryController } from "@modules/category/useCase/createCategory";

import { auth } from "@middleware/auth";

const categoryRouter = Router();

categoryRouter.post("/create", auth.tenant, (req: Request, res: Response) => {
  createCategoryController.handle(req, res);
});

export { categoryRouter };
