import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { FormatterResponse } from "@utils/FormatterResponse";
import { JwtApi } from "@utils/JwtApi";

import { FindUserController } from "./FindUserController";
import { FindUserUseCase } from "./FindUserUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();
const formatterResponse = new FormatterResponse();

const findUserUseCase = new FindUserUseCase(
  userRepository,
  jwtApi,
  formatterResponse,
);
const findUserController = new FindUserController(findUserUseCase);

export { findUserController, findUserUseCase };
