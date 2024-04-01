import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { DeleteProductUseCase } from "./DeleteProductUseCase";
export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.cookies;

    if (!id) throw new AppError("Propriedade não encontrada!", 400);

    await this.deleteProductUseCase.execute({ id, token });

    return res.status(200).json({
      message: "Produto deletado com sucesso!",
    });
  }
}
