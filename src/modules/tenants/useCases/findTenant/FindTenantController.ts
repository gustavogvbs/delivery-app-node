import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { FindTenantUseCase } from "./FindTenantUseCase";
export class FindTenantController {
  constructor(private findTenantUseCase: FindTenantUseCase) {}
  async handle(req: Request, res: Response) {
    const { slug } = req.params;

    if (!slug) {
      throw new AppError("Parâmetros não encontrados", 400);
    }
    const result = await this.findTenantUseCase.execute({ slug });

    return res.status(200).json(result);
  }
}
