import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { FormatterResponse } from "@utils/FormatterResponse";
import { JwtApi } from "@utils/JwtApi";

import { MeController } from "./MeController";
import { MeUseCase } from "./MeUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();
const formatterResponse = new FormatterResponse();

const meUseCase = new MeUseCase(formatterResponse, userRepository, jwtApi);
const meController = new MeController(meUseCase);

export { meController, meUseCase };
