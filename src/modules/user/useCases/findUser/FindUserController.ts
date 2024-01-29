import { Request, Response } from "express";

import { FindUserUseCase } from "./FindUserUseCase";

export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.findUserUseCase.execute({ id });

    return res.status(201).json(result);
  }
}
