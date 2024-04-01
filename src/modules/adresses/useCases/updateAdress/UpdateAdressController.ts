import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { UpdateAdressUseCase } from "./UpdateAdressUseCase";
export class UpdateAdressController {
  constructor(private updateAdressUseCase: UpdateAdressUseCase) {}
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
      throw new AppError("Endereço não encontrado", 404);
    }
    const result = await this.updateAdressUseCase.execute({
      cep,
      city,
      complement,
      neighborhood,
      number,
      street,
      userId,
    });

    return res.status(204).json(result);
  }
}
