import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";

import { CreateProfileController } from "./CreateProfileController";
import { CreateProfileUseCase } from "./CreateProfileUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();

const createProfileUseCase = new CreateProfileUseCase(userRepository, jwtApi);
const createProfileController = new CreateProfileController(
  createProfileUseCase,
);

export { createProfileController, createProfileUseCase };
