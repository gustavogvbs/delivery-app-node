import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(req: Request, res: Response) {
    const data = req.body;

    if (
      !data.price ||
      !data.name ||
      !data.description ||
      !data.categoryId ||
      !data.tenantId
    )
      throw new AppError("Propriedades invalidas");

    const result = await this.createProductUseCase.execute(data);

    return res.status(201).json(result);
  }
}
