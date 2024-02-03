import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateDevUseCase } from "./CreateDevUseCase";

export class CreateDevController {
  constructor(private createDevUseCase: CreateDevUseCase) {}
  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      throw new AppError("Propriedades não encontrada", 404);
    }
    const result = await this.createDevUseCase.execute({
      name,
      email,
      password,
      phone,
    });

    return res.status(201).json(result);
  }
}
