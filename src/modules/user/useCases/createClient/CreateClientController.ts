import { Response, Request } from "express";

import { AppError } from "@errors/AppErro";
import { Authenticate } from "@utils/Authenticate";

import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private auth: Authenticate,
  ) {}
  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const result = await this.createClientUseCase.execute({
      name,
      email,
      password,
      phone,
    });

    this.auth.setCookies(result.token, res);

    return res.status(200).json(result.user);
  }
}
