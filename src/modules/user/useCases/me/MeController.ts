import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { MeUseCase } from "./MeUseCase";

export class MeController {
  constructor(private meUseCase: MeUseCase) {}

  async handle(req: Request, res: Response) {
    const { token } = req.cookies;
    const { role } = req.params;
    const { populate } = req.query;

    const query = typeof populate === "string" ? [populate] : populate;

    if (!token) {
      throw new AppError("Token não encontrado", 404);
    }

    const result = await this.meUseCase.execute({
      token,
      role: role.toUpperCase(),
      query: populate ? (query as string[]) : undefined,
    });

    return res.status(200).json(result);
  }
}
