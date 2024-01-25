import { Router } from "express";
import { userRouter } from "@routes/user.router";
import { uploadRouter } from "@routes/upload.router";

const routes = Router();

routes.use("/users", userRouter);

routes.use("/upload", uploadRouter);

export { routes };
