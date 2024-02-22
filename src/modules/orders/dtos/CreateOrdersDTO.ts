import { Prisma } from "@prisma/client";
import { type PAYMENTS } from "@src/enums/PaymentEnum";

export interface IOrderProductsData {
  id: string;
  qtd: number;
  product: string;
  price: number;
}

export interface CreateOrderRequest {
  total: number;
  typePayment: PAYMENTS;
  payBack: number;
  products: Prisma.JsonArray;
  tenantId: string;
  userId: string;
}
