import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";

import { CreateDevController } from "./CreateDevController";
import { CreateDevUseCase } from "./CreateDevUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();

const createDevUseCase = new CreateDevUseCase(userRepository, jwtApi);
const createDevController = new CreateDevController(createDevUseCase);

export { createDevController, createDevUseCase };
