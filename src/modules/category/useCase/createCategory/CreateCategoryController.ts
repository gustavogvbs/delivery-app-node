import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  async handle(req: Request, res: Response) {
    const { tenantId, name } = req.body;
    if (!tenantId || !name) {
      throw new AppError("Propriedades invalidas", 404);
    }
    const result = await this.createCategoryUseCase.execute({
      tenantId,
      name,
    });
    return res.status(201).json(result);
  }
}
