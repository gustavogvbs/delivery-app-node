import { JwtApi } from "@utils/JwtApi";

import { PrismaUserRepository } from "../../../../../repositories/implementations/PrismaUserRepository";
import { CreateAdminController } from "./CreateAdminController";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();

const createAdminUseCase = new CreateAdminUseCase(userRepository, jwtApi);
const createAdminController = new CreateAdminController(createAdminUseCase);

export { createAdminController, createAdminUseCase };
