import { PrismaOrderRepository } from "@repositories/implementations/PrismaOrderRepository";

import { GetAllOrdersController } from "./GetAllOrdersController";
import { GetAllOrdersUseCase } from "./GetAllOrdersUseCase";

const orderRepository = new PrismaOrderRepository();
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
const getAllOrdersController = new GetAllOrdersController(getAllOrdersUseCase);

export { getAllOrdersController, getAllOrdersUseCase };
