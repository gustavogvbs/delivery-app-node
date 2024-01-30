import { Request, Response } from "express";

import { USERS_ROLES } from "@utils/RoleEnum";

import { CreateTenantUseCase } from "./CreateTenantsUseCases";

export class CreateTenantController {
  constructor(private createTenantUseCase: CreateTenantUseCase) {}
  async handle(req: Request, res: Response) {
    const { name, email, password, tenantName, city, phone, primaryColor } =
      req.body;

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

    return res.status(201).json(result);
  }
}
