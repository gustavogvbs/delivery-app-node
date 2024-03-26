import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";

import { UserAuthController } from "./UserAuthController";
import { UserAuthUseCase } from "./UserAuthUseCase";

const jwtApi = new JwtApi();
const userRepository = new PrismaUserRepository();
const userAuthUseCase = new UserAuthUseCase(userRepository, jwtApi);
const userAuthController = new UserAuthController(userAuthUseCase);

export { userAuthController, userAuthUseCase };
