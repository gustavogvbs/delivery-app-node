import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { UpdateTenantUseCase } from "./UpdateTenantUseCase";
export class UpdateTenantController {
  constructor(private upadateTenantUseCase: UpdateTenantUseCase) {}
  async handle(req: Request, res: Response) {
    const { token } = req.cookies;
    const { slug, name, city, primaryColor, phone, permission } = req.body;
    const { id } = req.params;

    console.log(req.body, "update");

    if (!id) {
      throw new AppError("Propriedades não encontradas", 400);
    }
    const result = await this.upadateTenantUseCase.execute({
      city,
      id,
      name,
      permission,
      phone,
      primaryColor,
      slug,
      token,
    });

    console.log(result, "teste");

    return res.status(204).json(result);
  }
}
