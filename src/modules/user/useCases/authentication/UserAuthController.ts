import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { UserAuthUseCase } from "./UserAuthUseCase";

export class UserAuthController {
  constructor(private userAuthUseCase: UserAuthUseCase) {}
  async handle(req: Request, res: Response) {
    const { token } = req.cookies;
    const { role } = req.params;

    if (!role || !token) {
      throw new AppError("Propriedade não encontrada", 404);
    }

    await this.userAuthUseCase.execute({
      token,
      role,
    });

    res
      .status(200)
      .json({ success: true, message: "Usuário logado com sucesso." });
  }
}
