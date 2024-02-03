import { Router, Response, Request } from "express";

import { createProductController } from "@modules/products/useCases/createProduct";
import { getProductController } from "@modules/products/useCases/getProduct";

const productRouter = Router();

productRouter.post("/create", (req: Request, res: Response) => {
  createProductController.handle(req, res);
});

productRouter.post("/:slug", (req: Request, res: Response) => {
  getProductController.handle(req, res);
});

export { productRouter };
