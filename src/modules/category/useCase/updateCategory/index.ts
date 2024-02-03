import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";

import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

const categoryRepository = new PrismaCategoryRepository();
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase,
);
export { updateCategoryController, UpdateCategoryUseCase };
