import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";
import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { GetAllProductsController } from "./GetAllProductsController";
import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

const formatterResponse = new FormatterResponse();
const productRepository = new PrismaProductRepository();
const tenantRepository = new PrismaTenantRepository();

const getAllProductsUseCase = new GetAllProductsUseCase(
  tenantRepository,
  productRepository,
  formatterResponse,
);
const getAllProductsController = new GetAllProductsController(
  getAllProductsUseCase,
);
export { getAllProductsController, getAllProductsUseCase };
