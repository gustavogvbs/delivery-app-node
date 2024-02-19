import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateOrderUseCase } from "./CreateOrderUseCase";

export class CreateOrdercontroller {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}
  async handle(req: Request, res: Response) {
    const orders = req.body;

    if (
      !orders.total ||
      !orders.typePayment ||
      !orders.payBack ||
      !orders.products ||
      !orders.idTenant ||
      !orders.idUser
    )
      throw new AppError("Propriedades não encontradas", 400);

    const createOrder = await this.createOrderUseCase.execute(orders);

    return res.status(200).json(createOrder);
  }
}
