import { PrismaCategoryRepository } from "@repositories/implementations/PrismaCategoryRepository";
import { PrismaProductRepository } from "@repositories/implementations/PrismaProductRepository";
import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { uploadImageService } from "@services/aws/images";
import { FormatterResponse } from "@utils/FormatterResponse";
import { JwtApi } from "@utils/JwtApi";

import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const formatterResponse = new FormatterResponse();
const categoryRepository = new PrismaCategoryRepository();
const tenantRepository = new PrismaTenantRepository();
const productRepository = new PrismaProductRepository();
const userRepository = new PrismaUserRepository();
const jwt = new JwtApi();

const createProductUseCase = new CreateProductUseCase(
  userRepository,
  categoryRepository,
  tenantRepository,
  productRepository,
  formatterResponse,
  jwt,
);
const createProductController = new CreateProductController(
  createProductUseCase,
  uploadImageService,
);

export { createProductController, createProductUseCase };
