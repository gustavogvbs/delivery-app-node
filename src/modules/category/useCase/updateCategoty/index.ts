import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { UpdateCategoryController } from "./UpadateCategoryController";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

const formatterResponse = new FormatterResponse();
const categoryRepository = new PrismaCategoryRepository();
const updateCategoryUseCase = new UpdateCategoryUseCase(
  categoryRepository,
  formatterResponse,
);
const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase,
);
export { updateCategoryController, updateCategoryUseCase };
