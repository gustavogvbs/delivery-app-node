import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { GetProductUseCase } from "./GetProductUseCase";

export class GetProductController {
  constructor(private getProductUseCase: GetProductUseCase) {}

  async handle(req: Request, res: Response) {
    const { slug } = req.params;

    if (!slug) throw new AppError("Paramentro não encontrado");

    const result = await this.getProductUseCase.execute({ slug });

    return res.status(201).json(result);
  }
}
