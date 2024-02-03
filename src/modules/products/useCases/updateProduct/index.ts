import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";

import { UpdateProductController } from "./UpadeProductController";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

const productRepository = new PrismaProductRepository();

const updateProductUseCase = new UpdateProductUseCase(productRepository);
const updateProductController = new UpdateProductController(
  updateProductUseCase,
);

export { updateProductController, updateProductUseCase };
