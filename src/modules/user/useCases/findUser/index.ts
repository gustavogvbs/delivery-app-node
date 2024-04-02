import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";
import { formatterDataResponse } from "@utils/res/FormatterDataResponse";

import { FindUserController } from "./FindUserController";
import { FindUserUseCase } from "./FindUserUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();

const findUserUseCase = new FindUserUseCase(
  userRepository,
  jwtApi,
  formatterDataResponse,
);
const findUserController = new FindUserController(findUserUseCase);

export { findUserController, findUserUseCase };
