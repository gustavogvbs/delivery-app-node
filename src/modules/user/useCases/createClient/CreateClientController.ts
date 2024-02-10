import { Response, Request } from "express";

import { AppError } from "@errors/AppErro";

import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}
  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    if (!name || !email || password || !phone) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const result = await this.createClientUseCase.execute({
      name,
      email,
      password,
      phone,
    });
    return res.status(201).json(result);
  }
}
