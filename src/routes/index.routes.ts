import { Router } from "express";

import { productRouter } from "@routes/product.routes";
import { registerRouter } from "@routes/register.routes";
import { uploadRouter } from "@routes/upload.routes";
import { userRouter } from "@routes/user.routes";

const routes = Router();

routes.use("/users", userRouter);

routes.use("/upload", uploadRouter);

routes.use("/auth", registerRouter);

routes.use("/product", productRouter);

export { routes };
