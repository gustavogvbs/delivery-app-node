import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(req: Request, res: Response) {
    const data = req.body;
    const { token } = req.cookies;
    const { populate } = req.query;

    const query = typeof populate === "string" ? [populate] : populate;

    if (!data.name || !data.price || !data.description || !data.categoryId)
      throw new AppError("Propriedades não encontrada", 404);

    console.log(req.body);

    const result = await this.createProductUseCase.execute({
      ...data,
      token,
      query: populate ? (query as string[]) : undefined,
    });

    return res.status(201).json(result);
  }
}
