import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Router, Response, Request, NextFunction } from "express";

import { findUserController } from "@modules/user/useCases/findUser";
import { loginUserController } from "@modules/user/useCases/loginUser";

import { auth } from "@middleware/auth";

const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response) => {
  await loginUserController.handle(req, res);
});

userRouter.get(
  "/:id",
  async (req: Request, __: Response, next: NextFunction) => {
    auth.execute(req, next, role.CLIENT);
  },
  async (req: Request, res: Response) => {
    await findUserController.handle(req, res);
  },
);

export { userRouter };
