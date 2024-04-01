import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { formatterResponse } from "@utils/FormatterResponse";

import { FindTenantController } from "./FindTenantController";
import { FindTenantUseCase } from "./FindTenantUseCase";

const tenantRepository = new PrismaTenantRepository();
const findTenantUseCase = new FindTenantUseCase(
  tenantRepository,
  formatterResponse,
);
const findTenantController = new FindTenantController(findTenantUseCase);

export { findTenantController, findTenantUseCase };
