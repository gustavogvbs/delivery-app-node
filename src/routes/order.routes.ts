import { Router, Request, Response } from "express";

import { createOrderController } from "@modules/orders/useCases/createOrders";

const orderRouter = Router();

orderRouter.post("/:create", async (req: Request, res: Response) => {
  await createOrderController.handle(req, res);
});
export { orderRouter };
