import { Router } from "express";
import { useRouter } from "./user.router";

const routes = Router();

routes.use("/users", useRouter);

export { routes };
