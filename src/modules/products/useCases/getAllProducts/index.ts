import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { GetAllProductsController } from "./GetAllProductsController";
import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

const formatterResponse = new FormatterResponse();
const productRepository = new PrismaProductRepository();

const getAllProductsUseCase = new GetAllProductsUseCase(
  productRepository,
  formatterResponse,
);
const getAllProductsController = new GetAllProductsController(
  getAllProductsUseCase,
);
export { getAllProductsController, getAllProductsUseCase };
