import { UpdateAdressRequest } from "@modules/adresses/dtos/UpdateAdressDTO";
import { IAdressRepository } from "@repositories/IAdressRepository";

export class UpdateAdressUseCase {
  constructor(private adressRepository: IAdressRepository) {}
  async execute({
    cep,
    city,
    complement,
    neighborhood,
    number,
    street,
    userId,
  }: UpdateAdressRequest) {
    const updateAdress = await this.adressRepository.updateAdress({
      cep,
      city,
      complement,
      neighborhood,
      number,
      street,
      userId,
    });

    return updateAdress;
  }
}
