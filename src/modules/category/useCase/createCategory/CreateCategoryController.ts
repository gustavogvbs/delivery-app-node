import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const { token } = req.cookies;
    if (!name || !token) {
      throw new AppError("Propriedades invalidas", 404);
    }
    const result = await this.createCategoryUseCase.execute({
      name,
      token,
    });
    return res.status(201).json(result);
  }
}
