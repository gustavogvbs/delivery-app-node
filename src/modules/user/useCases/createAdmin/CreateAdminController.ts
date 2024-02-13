import { Response, Request } from "express";

import { AppError } from "@errors/AppErro";

import { CreateAdminUseCase } from "./CreateAdminUseCase";

export class CreateAdminController {
  constructor(private createAdminUseCase: CreateAdminUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      throw new AppError("Propriedades não encontrada", 404);
    }
    const result = await this.createAdminUseCase.execute({
      name,
      email,
      password,
      phone,
    });

    return res.status(201).json(result);
  }
}
