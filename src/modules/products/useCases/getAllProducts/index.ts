import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";

import { GetAllProductsController } from "./GetAllProductsController";
import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

const productRepository = new PrismaProductRepository();

const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getAllProductsController = new GetAllProductsController(
  getAllProductsUseCase,
);
export { getAllProductsController, getAllProductsUseCase };
