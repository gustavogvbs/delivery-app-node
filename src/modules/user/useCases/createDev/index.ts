import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { Authenticate } from "@utils/Authenticate";
import { JwtApi } from "@utils/JwtApi";

import { CreateDevController } from "./CreateDevController";
import { CreateDevUseCase } from "./CreateDevUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();
const authenticate = new Authenticate();

const createDevUseCase = new CreateDevUseCase(userRepository, jwtApi);
const createDevController = new CreateDevController(
  createDevUseCase,
  authenticate,
);

export { createDevController, createDevUseCase };
