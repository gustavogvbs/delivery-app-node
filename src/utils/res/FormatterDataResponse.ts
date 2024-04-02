import { Category, Order, Product, Tenant, User } from "@prisma/client";

import { imageJsonSchema } from "@type/image-json";

import {
  CategoryResponseData,
  ICategoryRelations,
} from "./formatters/category-response";
import {
  IOrderRelations,
  OrderResponseData,
} from "./formatters/order-response";
import {
  IProductsRelations,
  ProductsResponseData,
} from "./formatters/products-response";
import {
  ITenantRelations,
  TenantResponseData,
} from "./formatters/tenant-response";
import { IUserRelations, UserResponseData } from "./formatters/user-response";

export class FormatterDataResponse {
  category(data: Category, relations?: ICategoryRelations) {
    const result: CategoryResponseData = {
      data: {
        id: data.id,
        attributes: {
          name: data.name,
          slug: data.slug,
          created_at: data.created_at,
          updated_at: data.updated_at,
          products: relations?.products ?? undefined,
          tenant: relations?.tenant ?? undefined,
        },
      },
    };

    return result;
  }

  product(data: Product, relations?: IProductsRelations) {
    const result: ProductsResponseData = {
      data: {
        id: data.id,
        attributes: {
          name: data.name,
          slug: data.slug,
          price: data.price,
          description: data.description,
          image: imageJsonSchema.parse(data.image),
          created_at: data.created_at,
          updated_at: data.updated_at,
          category: relations?.category ?? undefined,
          tenant: relations?.tenant ?? undefined,
        },
      },
    };

    return result;
  }

  tenant(data: Tenant, relations?: ITenantRelations) {
    const result: TenantResponseData = {
      data: {
        id: data.id,
        attributes: {
          name: data.name,
          slug: data.slug,
          city: data.city,
          phone: data.phone,
          primaryColor: data.primaryColor,
          categories: relations?.categories ?? undefined,
          orders: relations?.orders ?? undefined,
          products: relations?.products ?? undefined,
        },
      },
    };

    return result;
  }

  user(data: User, relations?: IUserRelations) {
    const result: UserResponseData = {
      data: {
        id: data.id,
        attributes: {
          email: data.email,
          name: data.name,
          phone: data.phone,
          created_at: data.created_at,
          updated_at: data.updated_at,
          orders: relations?.orders ?? undefined,
          tenant: relations?.tenant ?? undefined,
        },
      },
    };

    return result;
  }

  order(data: Order, relations?: IOrderRelations) {
    const result: OrderResponseData = {
      data: {
        id: data.orderNum.toString(),
        attributes: {
          payback: data.payBack,
          products: data.products,
          total: data.total,
          typePayment: data.typePayment,
          tenant: relations?.tenant ?? undefined,
        },
      },
    };

    return result;
  }
}

export const formatterDataResponse = new FormatterDataResponse();
