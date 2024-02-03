import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  async handle(req: Request, res: Response) {
    const { idTenant, name } = req.body;
    if (!idTenant || !name) {
      throw new AppError("Propriedades invalidas", 500);
    }
    const result = await this.createCategoryUseCase.execute({
      idTenant,
      name,
    });
    return res.status(201).json(result);
  }
}
