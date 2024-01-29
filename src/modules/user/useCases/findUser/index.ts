import { PrismaUserRepository } from "../../../../../repositories/implementations/PrismaUserRepository";
import { FindUserController } from "./FindUserController";
import { FindUserUseCase } from "./FindUserUseCase";

const userRepository = new PrismaUserRepository();
const findUserUseCase = new FindUserUseCase(userRepository);
const findUserController = new FindUserController(findUserUseCase);

export { findUserController, findUserUseCase };
