import { Order } from "@prisma/client";

import {
  ICreateOrderData,
  IOrderRepository,
} from "@repositories/IOrderRepository";

import { prisma } from "@configs/client";

export class PrismaOrderRepository implements IOrderRepository {
  createOrder({
    total,
    payBack,
    tenantId,
    typePayment,
    userId,
  }: ICreateOrderData): Promise<Order> {
    const order = prisma.order.create({
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
}
