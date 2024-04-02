import { Prisma } from "@prisma/client";

import {
  ContractResponseArr,
  ContractResponseAttr,
  ContractResponseData,
} from "@type/contracts";

import { TenantResponseAttr } from "./tenant-response";
import { UserResponseAttr } from "./user-response";

export interface IOrderRelations {
  tenant?: TenantResponseAttr;
  user?: UserResponseAttr;
}

export interface IOrderData extends IOrderRelations {
  total: number;
  payback: number;
  typePayment: "DINHEIRO" | "PIX" | "CARTAO";
  products: Prisma.JsonValue[];
}

export type OrderResponseAttr = ContractResponseAttr<IOrderData>;
export type OrderResponseArr = ContractResponseArr<IOrderData>;
export type OrderResponseData = ContractResponseData<IOrderData>;
