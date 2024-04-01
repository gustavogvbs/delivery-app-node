import { PrismaAdressRepository } from "@repositories/implementations/PrismaAdressRepository";

import { CreateAdressController } from "./CreateAdressController";
import { CreateAdressUseCase } from "./CreateAdressUseCase";

const adressRepository = new PrismaAdressRepository();
const createAdressUseCase = new CreateAdressUseCase(adressRepository);
const createAdressController = new CreateAdressController(createAdressUseCase);

export { createAdressController, createAdressUseCase };
