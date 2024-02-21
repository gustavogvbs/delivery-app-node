import { Order } from "@prisma/client";

import {
  ICreateOrderData,
  IGetOrderData,
  IOrderRepository,
} from "@repositories/IOrderRepository";

import { prisma } from "@configs/client";

export class PrismaOrderRepository implements IOrderRepository {
  async createOrder({
    total,
    payBack,
    tenantId,
    typePayment,
    userId,
  }: ICreateOrderData): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        total,
        payBack,
        typePayment,
        tenantId,
        userId,
      },
    });
    return order;
  }
  async getOrder({ id }: IGetOrderData): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    return order;
  }
}
