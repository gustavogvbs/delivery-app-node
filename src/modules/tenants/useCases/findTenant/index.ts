import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { FindTenantController } from "./FindTenantController";
import { FindTenantUseCase } from "./FindTenantUseCase";

const tenantRepository = new PrismaTenantRepository();
const findTenantUseCase = new FindTenantUseCase(tenantRepository);
const findTenantController = new FindTenantController(findTenantUseCase);

export { findTenantController, findTenantUseCase };
