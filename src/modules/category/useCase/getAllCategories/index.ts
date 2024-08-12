import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";
import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { GetAllCategoriesController } from "./GetAllCategoriesController";
import { GetAllCategoriesUseCase } from "./GetAllCategoriesUseCase";

const formatterResponse = new FormatterResponse();
const categoryRepository = new PrismaCategoryRepository();
const tenantRepository = new PrismaTenantRepository();

const getAllCategoriesUseCase = new GetAllCategoriesUseCase(
  tenantRepository,
  categoryRepository,
  formatterResponse,
);
const getAllCategoriesController = new GetAllCategoriesController(
  getAllCategoriesUseCase,
);
export { getAllCategoriesController, getAllCategoriesUseCase };
