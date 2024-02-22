import { PrismaOrderRepository } from "@repositories/implementations/PrismaOrderRepository";

import { GetOrderController } from "./GetOrderController";
import { GetOrderUseCase } from "./GetOrderUseCase";

const getOrderRepository = new PrismaOrderRepository();
const getOrderUseCase = new GetOrderUseCase(getOrderRepository);
const getOrdercontroller = new GetOrderController(getOrderUseCase);

export { getOrdercontroller, getOrderUseCase };
