import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";
import { formatterArrayResponse } from "@utils/res/FormatterArrayResponse";
import { formatterDataResponse } from "@utils/res/FormatterDataResponse";

import { MeController } from "./MeController";
import { MeUseCase } from "./MeUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();

const meUseCase = new MeUseCase(
  formatterDataResponse,
  formatterArrayResponse,
  userRepository,
  jwtApi,
);
const meController = new MeController(meUseCase);

export { meController, meUseCase };
