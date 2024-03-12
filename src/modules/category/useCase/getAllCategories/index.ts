import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { GetAllCategoriesController } from "./GetAllCategoriesController";
import { GetAllCategoriesUseCase } from "./GetAllCategoriesUseCase";

const formatterResponse = new FormatterResponse();
const categoryRepository = new PrismaCategoryRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(
  categoryRepository,
  formatterResponse,
);
const getAllCategoriesController = new GetAllCategoriesController(
  getAllCategoriesUseCase,
);
export { getAllCategoriesController, getAllCategoriesUseCase };
