import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";
import { Authenticate } from "@utils/Authenticate";

import { CreateDevUseCase } from "./CreateDevUseCase";

export class CreateDevController {
  constructor(
    private createDevUseCase: CreateDevUseCase,
    private auth: Authenticate,
  ) {}
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
    this.auth.setCookies(result.token, res);

    return res.status(200).json(result.user);
  }
}
