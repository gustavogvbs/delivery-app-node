import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.cookies;

    if (!id) {
      throw new AppError("Propriedade não encontrada", 404);
    }
    await this.deleteCategoryUseCase.execute({ id, token });

    res.status(200).json({
      message: "Categoria deletada com sucesso!",
    });
  }
}
