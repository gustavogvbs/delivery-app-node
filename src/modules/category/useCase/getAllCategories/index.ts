import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";

import { GetAllCategoriesController } from "./GetAllCategoriesController";
import { GetAllCategoriesUseCase } from "./GetAllCategoriesUseCase";

const categoryRepository = new PrismaCategoryRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
const getAllCategoriesController = new GetAllCategoriesController(
  getAllCategoriesUseCase,
);
export { getAllCategoriesController, getAllCategoriesUseCase };
