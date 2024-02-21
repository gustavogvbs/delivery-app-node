import { Order } from "@prisma/client";
import { Json } from "aws-sdk/clients/robomaker";

export interface ICreateOrderData {
  total: string;
  typePayment: string;
  payBack: number;
  products: Json[];
  tenantId: string;
  userId: string;
}
export interface IGetOrderData {
  id: string;
}

export interface IOrderRepository {
  createOrder(data: ICreateOrderData): Promise<Order>;
  getOrder(data: IGetOrderData): Promise<Order | null>;
}
