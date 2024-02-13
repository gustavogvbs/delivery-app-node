import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email ou senha não informado", 400);
    }
    const result = await this.loginUserUseCase.execute({ email, password });

    return res.status(200).json(result);
  }
}
