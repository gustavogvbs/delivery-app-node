import { Router } from "express";

import { categoryRouter } from "@routes/category.routes";
import { getAllRoutes } from "@routes/get-all.routes";
import { productRouter } from "@routes/product.routes";
import { registerRouter } from "@routes/register.routes";
import { uploadRouter } from "@routes/upload.routes";
import { userRouter } from "@routes/user.routes";

import { adressRouter } from "./adress.routes";
import { orderRouter } from "./order.routes";
import { tenantRouter } from "./tenants.routes";

const routes = Router();

routes.use("/users", userRouter);

routes.use("/upload", uploadRouter);

routes.use("/auth", registerRouter);

routes.use("/category", categoryRouter);

routes.use("/product", productRouter);

routes.use("/tenant", tenantRouter);

routes.use("/order", orderRouter);

routes.use("/adress", adressRouter);

routes.use(getAllRoutes);

export { routes };
