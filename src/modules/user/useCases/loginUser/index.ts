import { JwtApi } from "@utils/JwtApi";

import { PrismaUserRepository } from "../../../../../repositories/implementations/PrismaUserRepository";
import { LoginUserController } from "./LoginUserController";
import { LoginUserUseCase } from "./LoginUserUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();

const loginUseruseCase = new LoginUserUseCase(userRepository, jwtApi);
const loginUserController = new LoginUserController(loginUseruseCase);

export { loginUserController, loginUseruseCase };
