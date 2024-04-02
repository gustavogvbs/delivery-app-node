import { DefaultParams } from "@utils/DefaultParams";

import {
  ContractResponseArr,
  ContractResponseAttr,
  ContractResponseData,
} from "@type/contracts";
import { ImageJsonSchemaType } from "@type/image-json";

import { CategoryResponseAttr } from "./category-response";
import { TenantResponseAttr } from "./tenant-response";

export interface IProductsRelations {
  tenant?: TenantResponseAttr;
  category?: CategoryResponseAttr;
}

export interface IProductsData extends DefaultParams, IProductsRelations {
  name: string;
  slug: string;
  price: number;
  description: string;
  image: ImageJsonSchemaType;
}

export type ProductsResponseAttr = ContractResponseAttr<IProductsData>;
export type ProductsResponseArr = ContractResponseArr<IProductsData>;
export type ProductsResponseData = ContractResponseData<IProductsData>;
