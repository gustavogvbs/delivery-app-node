import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { FindUserUseCase } from "./FindUserUseCase";

export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.cookies;

    if (!id) throw new AppError("Propriedades não encontrada", 404);

    const result = await this.findUserUseCase.execute({ id, token });

    return res.status(200).json(result);
  }
}
