import { Router, Response, Request } from "express";

import { createProductController } from "@modules/products/useCases/createProduct";

const productRouter = Router();

productRouter.post("/create", (req: Request, res: Response) => {
  createProductController.handle(req, res);
});

export { productRouter };
