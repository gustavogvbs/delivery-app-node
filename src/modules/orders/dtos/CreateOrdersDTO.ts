import { Json } from "aws-sdk/clients/robomaker";

export interface CreateOrderRequest {
  total: string;
  typePayment: string;
  payBack: number;
  products: Json[];
  tenantId: string;
  userId: string;
}
