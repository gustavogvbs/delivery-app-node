import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { Authenticate } from "@utils/Authenticate";
import { JwtApi } from "@utils/JwtApi";

import { CreateAdminController } from "./CreateAdminController";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();
const authenticate = new Authenticate();

const createAdminUseCase = new CreateAdminUseCase(userRepository, jwtApi);
const createAdminController = new CreateAdminController(
  createAdminUseCase,
  authenticate,
);

export { createAdminController, createAdminUseCase };
