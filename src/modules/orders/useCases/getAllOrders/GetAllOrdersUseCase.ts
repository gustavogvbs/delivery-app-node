import { Order } from "@prisma/client";

import { GetAllOrdersRequest } from "@modules/orders/dtos/GetAllOrdersDTO";
import { IOrderRepository } from "@repositories/IOrderRepository";

import { AppError } from "@errors/AppErro";

export class GetAllOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}
  async execute({ id }: GetAllOrdersRequest): Promise<Order[]> {
    const getAllOrders = await this.orderRepository.getAll({
      id,
    });
    if (getAllOrders.length === 0) {
      throw new AppError("Ordens não encontradas", 404);
    }
    return getAllOrders;
  }
}
