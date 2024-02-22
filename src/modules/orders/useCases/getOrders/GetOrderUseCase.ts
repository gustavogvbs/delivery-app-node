import { Order } from "@prisma/client";

import { GetOrderRequest } from "@modules/orders/dtos/GetOrdersDTO";
import { IOrderRepository } from "@repositories/IOrderRepository";

import { AppError } from "@errors/AppErro";

export class GetOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}
  async execute({ id, userId }: GetOrderRequest): Promise<Order> {
    const order = await this.orderRepository.getOrder({
      id,
    });
    if (!order) {
      throw new AppError("Pedido não encontrado", 404);
    }
    if (userId !== order.userId || userId !== order.tenantId) {
      throw new AppError("Usuario sem permissão para acessar o pedido", 403);
    }
    return order;
  }
}
