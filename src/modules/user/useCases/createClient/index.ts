import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { Authenticate } from "@utils/Authenticate";
import { JwtApi } from "@utils/JwtApi";

import { CreateClientController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";

const jwtApi = new JwtApi();
const userRepository = new PrismaUserRepository();
const authenticate = new Authenticate();

const createClientUseCase = new CreateClientUseCase(userRepository, jwtApi);
const createClientController = new CreateClientController(
  createClientUseCase,
  authenticate,
);

export { createClientController, createClientUseCase };
