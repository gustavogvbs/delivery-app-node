import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { UpdateTenantController } from "./UpdateTenantsController";
import { UpdateTenantUseCase } from "./UpdateTenantUseCase";

const tenantRepository = new PrismaTenantRepository();
const updateTenantUseCase = new UpdateTenantUseCase(tenantRepository);
const updateTenantController = new UpdateTenantController(updateTenantUseCase);

export { updateTenantController, updateTenantUseCase };
