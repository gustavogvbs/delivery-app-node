import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { GetAllOrdersUseCase } from "./GetAllOrdersUseCase";
export class GetAllOrdersController {
  constructor(private getAllOrdersUseCase: GetAllOrdersUseCase) {}
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    if (!id) {
      throw new AppError("Ordens não encontradas", 404);
    }
    const result = await this.getAllOrdersUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
