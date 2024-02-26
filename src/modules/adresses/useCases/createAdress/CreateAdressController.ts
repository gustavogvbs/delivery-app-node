import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateAdressUseCase } from "./CreateAdressUseCase";

export class CreateAdressController {
  constructor(private createAdressUseCase: CreateAdressUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId, cep, city, neighborhood, street, number, complement } =
      req.body;
    if (
      !userId ||
      !cep ||
      !city ||
      !neighborhood ||
      !street ||
      !number ||
      !complement
    ) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const result = await this.createAdressUseCase.execute({
      userId,
      cep,
      city,
      complement,
      neighborhood,
      number,
      street,
    });
    return res.status(200).json(result);
  }
}
