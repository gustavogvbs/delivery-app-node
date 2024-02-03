import { Router, Response, Request } from "express";

import { createProductController } from "@modules/products/useCases/createProduct";
import { getProductController } from "@modules/products/useCases/getProduct";
import { updateProductController } from "@modules/products/useCases/updateProduct";

import { auth } from "@middleware/auth";

const productRouter = Router();

productRouter.post("/create", (req: Request, res: Response) => {
  createProductController.handle(req, res);
});

productRouter.get("/:slug", (req: Request, res: Response) => {
  getProductController.handle(req, res);
});

productRouter.patch("/:slug", auth.tenant, (req: Request, res: Response) => {
  updateProductController.handle(req, res);
});

export { productRouter };
