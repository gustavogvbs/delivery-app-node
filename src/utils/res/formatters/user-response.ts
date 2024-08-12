import { DefaultParams } from "@utils/DefaultParams";

import {
  ContractResponseArr,
  ContractResponseAttr,
  ContractResponseData,
} from "@type/contracts";

import { OrderResponseAttr } from "./order-response";
import { TenantResponseAttr } from "./tenant-response";

export interface IUserRelations {
  tenant?: TenantResponseAttr;
  orders?: OrderResponseAttr[];
}

export interface IUserData extends DefaultParams, IUserRelations {
  name: string;
  email: string;
  phone: string;
}

export type UserResponseAttr = ContractResponseAttr<IUserData>;
export type UserResponseArr = ContractResponseArr<IUserData>;
export type UserResponseData = ContractResponseData<IUserData>;
