import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

export class GetAllProductsController {
  constructor(private getALlProductsUseCase: GetAllProductsUseCase) {}

  async handle(req: Request, res: Response) {
    const { slug } = req.params;
    const { populate } = req.query;

    const query = typeof populate === "string" ? [populate] : populate;

    if (!slug) throw new AppError("Propriedades não encontrada", 404);

    const result = await this.getALlProductsUseCase.execute({
      slug,
      query: populate ? (query as string[]) : undefined,
    });

    return res.status(200).json(result);
  }
}
