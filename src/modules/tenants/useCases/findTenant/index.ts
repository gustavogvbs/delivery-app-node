import { PrismaTenantRepository } from "@repositories/implementations/PrismaTenantRepository";

import { formatterArrayResponse } from "@utils/res/FormatterArrayResponse";
import { formatterDataResponse } from "@utils/res/FormatterDataResponse";

import { FindTenantController } from "./FindTenantController";
import { FindTenantUseCase } from "./FindTenantUseCase";

const tenantRepository = new PrismaTenantRepository();
const findTenantUseCase = new FindTenantUseCase(
  tenantRepository,
  formatterDataResponse,
  formatterArrayResponse,
);
const findTenantController = new FindTenantController(findTenantUseCase);

export { findTenantController, findTenantUseCase };
