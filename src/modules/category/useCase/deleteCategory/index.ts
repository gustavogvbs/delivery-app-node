import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";

import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

const jwtApi = new JwtApi();
const categoryRepository = new PrismaCategoryRepository();
const userRepository = new PrismaUserRepository();
const deleteCategoryUseCase = new DeleteCategoryUseCase(
  jwtApi,
  userRepository,
  categoryRepository,
);
const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase,
);

export { deleteCategoryController, deleteCategoryUseCase };
