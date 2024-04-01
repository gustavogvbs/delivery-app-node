import { Request, Response, Router } from "express";

import { userAuthController } from "@modules/user/useCases/authentication";

const authRouter = Router();

authRouter.get("/:role", async (req: Request, res: Response) => {
  await userAuthController.handle(req, res);
});

export { authRouter };
