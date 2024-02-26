import { PrismaAdressRepository } from "@repositories/implementations/PrismaAdressRepository";

import { UpdateAdressController } from "./UpdateAdressController";
import { UpdateAdressUseCase } from "./UpdateAdressUseCase";

const adressRepository = new PrismaAdressRepository();
const updateAdressUseCase = new UpdateAdressUseCase(adressRepository);
const updateAdressController = new UpdateAdressController(updateAdressUseCase);

export { updateAdressController, updateAdressUseCase };
