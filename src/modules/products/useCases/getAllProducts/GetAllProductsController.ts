import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

export class GetAllProductsController {
  constructor(private getALlProductsUseCase: GetAllProductsUseCase) {}

  async handle(req: Request, res: Response) {
    const { tenantId } = req.body;

    if (!tenantId) throw new AppError("Propriedades não encontrada", 404);

    const result = await this.getALlProductsUseCase.execute({ tenantId });

    return res.status(200).json(result);
  }
}
