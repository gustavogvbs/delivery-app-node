import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { FindUserUseCase } from "./FindUserUseCase";

export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) throw new AppError("Propriedades não encontrada", 404);

    const result = await this.findUserUseCase.execute({ id });

    return res.status(200).json(result);
  }
}
