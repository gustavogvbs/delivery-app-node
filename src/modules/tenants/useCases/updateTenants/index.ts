import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { FormatterResponse } from "@utils/FormatterResponse";
import { JwtApi } from "@utils/JwtApi";

import { UpdateTenantController } from "./UpdateTenantsController";
import { UpdateTenantUseCase } from "./UpdateTenantUseCase";

const formatterResponse = new FormatterResponse();
const tenantRepository = new PrismaTenantRepository();
const userRepository = new PrismaUserRepository();
const jwtApi = new JwtApi();

const updateTenantUseCase = new UpdateTenantUseCase(
  tenantRepository,
  userRepository,
  formatterResponse,
  jwtApi,
);
const updateTenantController = new UpdateTenantController(updateTenantUseCase);

export { updateTenantController, updateTenantUseCase };
