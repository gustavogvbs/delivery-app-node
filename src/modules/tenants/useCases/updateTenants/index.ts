import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

import { UpdateTenantController } from "./UpdateTenantsController";
import { UpdateTenantUseCase } from "./UpdateTenantUseCase";

const formatterResponse = new FormatterResponse();
const tenantRepository = new PrismaTenantRepository();
const updateTenantUseCase = new UpdateTenantUseCase(
  tenantRepository,
  formatterResponse,
);
const updateTenantController = new UpdateTenantController(updateTenantUseCase);

export { updateTenantController, updateTenantUseCase };
