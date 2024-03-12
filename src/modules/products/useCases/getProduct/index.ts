import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { GetProductController } from "./GetProductController";
import { GetProductUseCase } from "./GetProductUseCase";

const formatterResponse = new FormatterResponse();
const productRepository = new PrismaProductRepository();

const getProductUseCase = new GetProductUseCase(
  productRepository,
  formatterResponse,
);
const getProductController = new GetProductController(getProductUseCase);

export { getProductController, getProductUseCase };
