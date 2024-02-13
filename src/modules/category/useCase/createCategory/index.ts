import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";
import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const tenantRepository = new PrismaTenantRepository();
const categoryRepository = new PrismaCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
  tenantRepository,
);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);
export { createCategoryController, createCategoryUseCase };
