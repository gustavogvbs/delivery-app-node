import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";
import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";
import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const formatterResponse = new FormatterResponse();
const categoryRepository = new PrismaCategoryRepository();
const tenantRepository = new PrismaTenantRepository();
const productRepository = new PrismaProductRepository();

const createProductUseCase = new CreateProductUseCase(
  categoryRepository,
  tenantRepository,
  productRepository,
  formatterResponse,
);
const createProductController = new CreateProductController(
  createProductUseCase,
);

export { createProductController, createProductUseCase };
