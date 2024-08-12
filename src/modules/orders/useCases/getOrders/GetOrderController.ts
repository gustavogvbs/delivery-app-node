import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { GetOrderUseCase } from "./GetOrderUseCase";

export class GetOrderController {
  constructor(private getOrderUseCase: GetOrderUseCase) {}
  async handle(req: Request, res: Response) {
    const { id, userId } = req.body;

    if (!id || !userId) {
      throw new AppError("Propriedades não encontradas", 400);
    }
    const result = await this.getOrderUseCase.execute({ id, userId });

    return res.status(200).json(result);
  }
}
