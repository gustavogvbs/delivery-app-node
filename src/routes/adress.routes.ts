import { Router, Request, Response } from "express";

import { createAdressController } from "@modules/adresses/useCases/createAdress";
import { updateAdressController } from "@modules/adresses/useCases/updateAdress";

const adressRouter = Router();

adressRouter.post("/:create", async (req: Request, res: Response) => {
  await createAdressController.handle(req, res);
});

adressRouter.patch("/:update", async (req: Request, res: Response) => {
  await updateAdressController.handle(req, res);
});

export { adressRouter };
