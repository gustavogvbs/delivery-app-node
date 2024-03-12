import { Request, Response } from "express";

import { GetTenantsUseCase } from "./GetTenantUseCase";

export class GetTenantsController {
  constructor(private getTenantUseCase: GetTenantsUseCase) {}

  async handle(__: Request, res: Response) {
    const result = await this.getTenantUseCase.execute();

    console.log(result, "controller");

    res.status(200).json(result);
  }
}
