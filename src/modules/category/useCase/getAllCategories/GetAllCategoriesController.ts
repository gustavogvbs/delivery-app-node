import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { GetAllCategoriesUseCase } from "./GetAllCategoriesUseCase";

export class GetAllCategoriesController {
  constructor(private getAllCategoriesUseCase: GetAllCategoriesUseCase) {}
  async handle(req: Request, res: Response) {
    const { slug } = req.params;

    console.log(req.body);

    if (!slug) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const result = await this.getAllCategoriesUseCase.execute({
      slug,
    });
    return res.status(200).json(result);
  }
}
