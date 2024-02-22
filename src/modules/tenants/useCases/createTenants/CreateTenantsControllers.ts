import { USERS_ROLES } from "@src/enums/RoleEnum";
import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";
import { Authenticate } from "@utils/Authenticate";

import { CreateTenantUseCase } from "./CreateTenantsUseCases";

export class CreateTenantController {
  constructor(
    private createTenantUseCase: CreateTenantUseCase,
    private auth: Authenticate,
  ) {}
  async handle(req: Request, res: Response) {
    const { name, email, password, tenantName, city, phone, primaryColor } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !tenantName ||
      !city ||
      !phone ||
      !primaryColor
    )
      throw new AppError("Propriedades não encontrada", 404);

    const result = await this.createTenantUseCase.execute({
      user: {
        name,
        email,
        password,
        role: USERS_ROLES.TENANT,
      },
      tenant: {
        name: tenantName,
        city,
        phone,
        primaryColor,
      },
    });

    this.auth.setCookies(result.token, res);

    return res.status(201).json(result.user);
  }
}
