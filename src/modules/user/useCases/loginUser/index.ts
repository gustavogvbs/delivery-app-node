import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { Authenticate } from "@utils/Authenticate";
import { formatterResponse } from "@utils/FormatterResponse";
import { JwtApi } from "@utils/JwtApi";

import { LoginUserController } from "./LoginUserController";
import { LoginUserUseCase } from "./LoginUserUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();
const authenticate = new Authenticate();

const loginUseruseCase = new LoginUserUseCase(
  userRepository,
  jwtApi,
  formatterResponse,
);
const loginUserController = new LoginUserController(
  loginUseruseCase,
  authenticate,
);

export { loginUserController, loginUseruseCase };
