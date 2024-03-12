import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { UpdateProductController } from "./UpadeProductController";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

const formatterResponse = new FormatterResponse();
const productRepository = new PrismaProductRepository();

const updateProductUseCase = new UpdateProductUseCase(
  productRepository,
  formatterResponse,
);
const updateProductController = new UpdateProductController(
  updateProductUseCase,
);

export { updateProductController, updateProductUseCase };
