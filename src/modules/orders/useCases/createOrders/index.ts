import { PrismaOrderRepository } from "@repositories/implementations/PrismaOrderRepository";

import { CreateOrdercontroller } from "./CreateOrdersController";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

const orderRepository = new PrismaOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const createOrderController = new CreateOrdercontroller(createOrderUseCase);

export { createOrderController, createOrderUseCase };
