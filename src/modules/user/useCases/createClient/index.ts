import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";

import { CreateClientController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";

const jwtApi = new JwtApi();
const userRepository = new PrismaUserRepository();
const createClientUseCase = new CreateClientUseCase(userRepository, jwtApi);
const createClientController = new CreateClientController(createClientUseCase);

export { createClientController, createClientUseCase };
