import { DefaultParams } from "@utils/DefaultParams";

import {
  ContractResponseArr,
  ContractResponseAttr,
  ContractResponseData,
} from "@type/contracts";

import { ProductsResponseAttr } from "./products-response";
import { TenantResponseAttr } from "./tenant-response";

export interface ICategoryRelations {
  tenant?: TenantResponseAttr;
  products?: ProductsResponseAttr[];
}

export interface ICategoryData extends DefaultParams, ICategoryRelations {
  name: string;
  slug: string;
}

export type CategoryResponseAttr = ContractResponseAttr<ICategoryData>;
export type CategoryResponseArr = ContractResponseArr<ICategoryData>;
export type CategoryResponseData = ContractResponseData<ICategoryData>;
