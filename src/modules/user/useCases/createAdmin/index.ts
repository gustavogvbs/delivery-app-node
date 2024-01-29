import { PrismaUserRepository } from "../../../../../repositories/implementations/PrismaUserRepository";
import { CreateAdminController } from "./CreateAdminController";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

const userRepository = new PrismaUserRepository();

const createAdminUseCase = new CreateAdminUseCase(userRepository);

const createAdminController = new CreateAdminController(createAdminUseCase);

export { createAdminController, createAdminUseCase };
