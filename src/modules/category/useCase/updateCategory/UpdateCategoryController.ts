import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
export class UpdateCategoryController {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const { slug } = req.params;
    if (!name || !slug) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const result = await this.updateCategoryUseCase.execute({ name, slug });
    return res.status(200).json(result);
  }
}
