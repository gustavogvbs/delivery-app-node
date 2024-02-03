import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";
import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";
import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const categoryRepository = new PrismaCategoryRepository();
const tenantRepository = new PrismaTenantRepository();
const productRepository = new PrismaProductRepository();

const createProductUseCase = new CreateProductUseCase(
  categoryRepository,
  tenantRepository,
  productRepository,
);
const createProductController = new CreateProductController(
  createProductUseCase,
);

export { createProductController, createProductUseCase };
