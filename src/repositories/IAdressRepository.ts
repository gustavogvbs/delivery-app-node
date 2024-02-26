import { Adress } from "@prisma/client";

export interface ICreateAdressData {
  userId: string;
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}

export interface IUpdateAdressData {
  userId: string;
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}

export interface IAdressRepository {
  createAdress(data: ICreateAdressData): Promise<Adress>;
  updateAdress(data: IUpdateAdressData): Promise<Adress>;
}
