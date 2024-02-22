import { Order, Prisma } from "@prisma/client";
import { type PAYMENTS } from "@src/enums/PaymentEnum";

export interface ICreateOrderData {
  total: number;
  typePayment: PAYMENTS;
  payBack: number;
  products: Prisma.InputJsonValue[];
  tenantId: string;
  userId: string;
}
export interface IGetOrderData {
  id: string;
}
export interface IGetAllOrderData {
  id: string;
}

export interface IOrderRepository {
  createOrder(data: ICreateOrderData): Promise<Order>;
  getOrder(data: IGetOrderData): Promise<Order | null>;
  getAll(data: IGetAllOrderData): Promise<Order[]>;
}
