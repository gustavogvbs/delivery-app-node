import { Router, Response, Request } from "express";

import { createProductController } from "@modules/products/useCases/createProduct";
import { getProductController } from "@modules/products/useCases/getProduct";
import { updateProductController } from "@modules/products/useCases/updateProduct";

import { auth } from "@middleware/auth";

const productRouter = Router();

productRouter.post("/create", async (req: Request, res: Response) => {
  await createProductController.handle(req, res);
});

productRouter.get("/:slug", async (req: Request, res: Response) => {
  await getProductController.handle(req, res);
});

productRouter.patch(
  "/:slug",
  auth.tenant,
  async (req: Request, res: Response) => {
    await updateProductController.handle(req, res);
  },
);

export { productRouter };
