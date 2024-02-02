import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { GetAllCategoriesUseCase } from "./GetAllCategoriesUseCase";

export class GetAllCategoriesController {
  constructor(private getAllCategoriesUseCase: GetAllCategoriesUseCase) {}
  async handle(req: Request, res: Response) {
    const { idTenant } = req.body;
    if (!idTenant) {
      throw new AppError("Propriedades invalidas", 500);
    }
    const result = await this.getAllCategoriesUseCase.execute({
      idTenant,
    });
    return res.status(201).json(result);
  }
}