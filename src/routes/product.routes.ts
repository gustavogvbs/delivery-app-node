import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Router, Response, Request, NextFunction } from "express";

import { createProductController } from "@modules/products/useCases/createProduct";
import { getProductController } from "@modules/products/useCases/getProduct";
import { updateProductController } from "@modules/products/useCases/updateProduct";

import { useUpload } from "@configs/multer.config";
import { auth } from "@middleware/auth";

const productRouter = Router();

productRouter.post(
  "/create",
  useUpload.single("image"),
  async (req: Request, res: Response) => {
    await createProductController.handle(req, res);
  },
);

productRouter.get("/:slug", async (req: Request, res: Response) => {
  await getProductController.handle(req, res);
});

productRouter.patch(
  "/:slug",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.TENANT);
  },
  async (req: Request, res: Response) => {
    await updateProductController.handle(req, res);
  },
);

export { productRouter };
