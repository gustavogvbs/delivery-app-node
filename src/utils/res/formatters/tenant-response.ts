import {
  ContractResponseArr,
  ContractResponseAttr,
  ContractResponseData,
} from "@type/contracts";

import { CategoryResponseAttr } from "./category-response";
import { OrderResponseAttr } from "./order-response";
import { ProductsResponseAttr } from "./products-response";

export interface ITenantRelations {
  categories?: CategoryResponseAttr[];
  orders?: OrderResponseAttr[];
  products?: ProductsResponseAttr[];
}

export interface ITenantData extends ITenantRelations {
  slug: string;
  name: string;
  city: string;
  phone: string;
  primaryColor: string;
  permission?: boolean;
}

export type TenantResponseAttr = ContractResponseAttr<ITenantData>;
export type TenantResponseArr = ContractResponseArr<ITenantData>;
export type TenantResponseData = ContractResponseData<ITenantData>;
