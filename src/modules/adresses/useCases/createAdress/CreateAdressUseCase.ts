import { Adress } from "@prisma/client";

import { CreateAdressRequest } from "@modules/adresses/dtos/CreateAdressDTO";
import { IAdressRepository } from "@repositories/IAdressRepository";

import { AppError } from "@errors/AppErro";

export class CreateAdressUseCase {
  constructor(private adressRepository: IAdressRepository) {}
  async execute({
    userId,
    cep,
    city,
    complement,
    neighborhood,
    number,
    street,
  }: CreateAdressRequest): Promise<Adress> {
    const createAdress = await this.adressRepository.createAdress({
      cep,
      city,
      complement,
      neighborhood,
      number,
      street,
      userId,
    });

    if (!createAdress) {
      throw new AppError("Endereço não encontrado", 404);
    }

    return createAdress;
  }
}
