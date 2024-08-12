import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";
import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { formatterResponse } from "@utils/FormatterResponse";
import { JwtApi } from "@utils/JwtApi";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const tenantRepository = new PrismaTenantRepository();
const categoryRepository = new PrismaCategoryRepository();
const jwtApi = new JwtApi();

const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
  tenantRepository,
  formatterResponse,
  jwtApi,
);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);
export { createCategoryController, createCategoryUseCase };
