import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { UpdateTenantUseCase } from "./UpdateTenantUseCase";
export class UpdateTenantController {
  constructor(private upadateTenantUseCase: UpdateTenantUseCase) {}
  async handle(req: Request, res: Response) {
    const { name, city, primaryColor, phone, permission } = req.body;
    const { slug } = req.params;

    if (!name || !city || !primaryColor || !phone || !slug || !permission) {
      throw new AppError("Propriedades não encontradas", 400);
    }
    const result = await this.upadateTenantUseCase.execute({
      name,
      city,
      primaryColor,
      phone,
      slug,
      permission,
    });

    return res.status(204).json(result);
  }
}
