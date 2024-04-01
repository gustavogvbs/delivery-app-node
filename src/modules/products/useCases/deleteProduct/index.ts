import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";

import { DeleteProductController } from "./DeleteProductController";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

const jwtApi = new JwtApi();
const userRepository = new PrismaUserRepository();
const productRepository = new PrismaProductRepository();
const deleteProductUseCase = new DeleteProductUseCase(
  userRepository,
  productRepository,
  jwtApi,
);
const deleteProductController = new DeleteProductController(
  deleteProductUseCase,
);

export { deleteProductController, deleteProductUseCase };
