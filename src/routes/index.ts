import { Router } from "express";
import { userRouter } from "./user.router";
import { uploadRouter } from "./upload.router";

const routes = Router();

routes.use("/users", userRouter);

routes.use("/upload", uploadRouter);

export { routes };
