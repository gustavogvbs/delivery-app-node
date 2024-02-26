import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";
import { Authenticate } from "@utils/Authenticate";

import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
    private auth: Authenticate,
  ) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      throw new AppError("Email ou senha não informado", 404);
    }
    const { user, token } = await this.loginUserUseCase.execute({
      email,
      password,
    });
    this.auth.setCookies(token, res);

    return res.status(200).json(user);
  }
}
