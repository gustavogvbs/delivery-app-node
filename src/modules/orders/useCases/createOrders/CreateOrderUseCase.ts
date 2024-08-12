import { Order } from "@prisma/client";

import { CreateOrderRequest } from "@modules/orders/dtos/CreateOrdersDTO";
import { IOrderRepository } from "@repositories/IOrderRepository";

import { AppError } from "@errors/AppErro";

import { orderProductsSchema } from "@type/order-products";

export class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}
  async execute(order: CreateOrderRequest): Promise<Order> {
    const products = orderProductsSchema.parse(order.products);

    const orderRes = await this.orderRepository.createOrder({
      ...order,
      products,
    });

    if (!orderRes) {
      throw new AppError("Erro ao criar pedido", 500);
    }
    return orderRes;
  }
}
