import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";

import { GetProductController } from "./GetProductController";
import { GetProductUseCase } from "./GetProductUseCase";

const productRepository = new PrismaProductRepository();

const getProductUseCase = new GetProductUseCase(productRepository);
const getProductController = new GetProductController(getProductUseCase);

export { getProductController, getProductUseCase };
