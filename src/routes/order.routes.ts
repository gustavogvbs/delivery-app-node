import { Router, Request, Response } from "express";

import { createOrderController } from "@modules/orders/useCases/createOrders";
import { getOrdercontroller } from "@modules/orders/useCases/getOrders";

const orderRouter = Router();

orderRouter.post("/:create", async (req: Request, res: Response) => {
  await createOrderController.handle(req, res);
});

orderRouter.get("/:get", async (req: Request, res: Response) => {
  await getOrdercontroller.handle(req, res);
});
export { orderRouter };
