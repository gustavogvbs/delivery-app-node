import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { GetTenantsController } from "./GetTenantController";
import { GetTenantsUseCase } from "./GetTenantUseCase";

const tenantRepository = new PrismaTenantRepository();
const formatterResponse = new FormatterResponse();

const getTenantsUseCase = new GetTenantsUseCase(
  tenantRepository,
  formatterResponse,
);

const getTenantsController = new GetTenantsController(getTenantsUseCase);

export { getTenantsUseCase, getTenantsController };
