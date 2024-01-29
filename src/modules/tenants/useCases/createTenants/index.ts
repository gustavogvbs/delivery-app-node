import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { JwtApi } from "@utils/JwtApi";

import { CreateTenantController } from "./CreateTenantsControllers";
import { CreateTenantUseCase } from "./CreateTenantsUseCases";

const jwpApi = new JwtApi();
const userRepository = new PrismaUserRepository();
const tenantRepository = new PrismaTenantRepository();

const createTenantUseCase = new CreateTenantUseCase(
  userRepository,
  tenantRepository,
  jwpApi,
);
const createTenantController = new CreateTenantController(createTenantUseCase);

export { createTenantController, createTenantUseCase };
