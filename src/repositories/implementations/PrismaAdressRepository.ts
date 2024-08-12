import { Adress } from "@prisma/client";

import {
  IAdressRepository,
  ICreateAdressData,
  IUpdateAdressData,
} from "@repositories/IAdressRepository";

import { prisma } from "@configs/client";

export class PrismaAdressRepository implements IAdressRepository {
  async createAdress({
    userId,
    cep,
    city,
    complement,
    neighborhood,
    number,
    street,
  }: ICreateAdressData): Promise<Adress> {
    const adress = prisma.adress.create({
      data: {
        userId,
        cep,
        city,
        neighborhood,
        number,
        street,
        complement,
      },
    });
    return adress;
  }
  updateAdress({
    cep,
    city,
    complement,
    neighborhood,
    number,
    street,
    userId,
  }: IUpdateAdressData): Promise<Adress> {
    const adress = prisma.adress.update({
      where: {
        userId,
      },
      data: {
        cep,
        city,
        complement,
        neighborhood,
        number,
        street,
      },
    });
    return adress;
  }
}
