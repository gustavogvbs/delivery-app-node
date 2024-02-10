import { Router, Response, Request } from "express";

import { findUserController } from "@modules/user/useCases/findUser";
import { loginUserController } from "@modules/user/useCases/loginUser";

import { auth } from "@middleware/auth";

const userRouter = Router();

userRouter.get("/login", async (req: Request, res: Response) => {
  await loginUserController.handle(req, res);
});

userRouter.get("/:id", auth.client, (req: Request, res: Response) => {
  findUserController.handle(req, res);
});

export { userRouter };
