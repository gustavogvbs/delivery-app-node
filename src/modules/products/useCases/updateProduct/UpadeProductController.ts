import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, description, categoryId, price } = req.body;
    const { slug } = req.params;

    if (!name || !description || !categoryId || !price || !slug)
      throw new AppError("Paramentros não encontrados");

    const result = await this.updateProductUseCase.execute({
      name,
      description,
      slug,
      categoryId,
      price,
    });

    return res.status(201).json(result);
  }
}
