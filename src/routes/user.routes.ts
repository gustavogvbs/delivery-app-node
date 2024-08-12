import { Router, Response, Request } from "express";

import { loginUserController } from "@modules/user/useCases/loginUser";
import { logoutUserController } from "@modules/user/useCases/logoutUser";
import { meController } from "@modules/user/useCases/me";

const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response) => {
  await loginUserController.handle(req, res);
});

userRouter.get("/logout", async (req: Request, res: Response) => {
  await logoutUserController.handle(req, res);
});

userRouter.get("/me/:role", async (req: Request, res: Response) => {
  await meController.handle(req, res);
});

export { userRouter };
