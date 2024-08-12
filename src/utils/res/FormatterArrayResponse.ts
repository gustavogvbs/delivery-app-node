import { Category, Order, Product, Tenant, User } from "@prisma/client";

import { imageJsonSchema } from "@type/image-json";

import { formatterDataResponse } from "./FormatterDataResponse";
import { CategoryResponseArr } from "./formatters/category-response";
import { OrderResponseArr } from "./formatters/order-response";
import { ProductsResponseArr } from "./formatters/products-response";
import { TenantResponseArr } from "./formatters/tenant-response";

export class FormatterArrayResponse {
  categories(
    data: (Category & { products?: Product[]; tenant?: Tenant })[],
    query?: string[],
  ) {
    const result: CategoryResponseArr = { data: [] };
    data.forEach((category) => {
      const { tenant, products } = category;

      const resPod = products ? this.products(products) : undefined;
      const resTen = tenant ? formatterDataResponse.tenant(tenant) : undefined;

      result.data.push({
        id: category.id,
        attributes: {
          name: category.name,
          slug: category.slug,
          created_at: category.created_at,
          updated_at: category.updated_at,
          products: query?.includes("products") ? resPod?.data : undefined,
          tenant: query?.includes("tenant") ? resTen?.data : undefined,
        },
      });
    });
    return result;
  }

  orders(data: (Order & { tenant?: Tenant; user?: User })[], query?: string[]) {
    const result: OrderResponseArr = { data: [] };
    data.forEach((order) => {
      const { tenant, user } = order;

      const resTen = tenant ? formatterDataResponse.tenant(tenant) : undefined;
      const resUse = user ? formatterDataResponse.user(user) : undefined;

      result.data.push({
        id: order.orderNum.toString(),
        attributes: {
          payback: order.payBack,
          products: order.products,
          total: order.total,
          typePayment: order.typePayment,
          tenant: query?.includes("tenant") ? resTen?.data : undefined,
          user: query?.includes("user") ? resUse?.data : undefined,
        },
      });
    });
    return result;
  }

  products(
    data: (Product & { tenant?: Tenant; category?: Category })[],
    query?: string[],
  ) {
    const result: ProductsResponseArr = { data: [] };
    data.forEach((product) => {
      const { tenant, category } = product;

      const resTen = tenant ? formatterDataResponse.tenant(tenant) : undefined;
      const resCat = category
        ? formatterDataResponse.category(category)
        : undefined;

      result.data.push({
        id: product.id,
        attributes: {
          name: product.name,
          slug: product.slug,
          price: product.price,
          description: product.description,
          created_at: product.created_at,
          updated_at: product.updated_at,

          image: imageJsonSchema.parse(product.image),

          category: query?.includes("category") ? resCat?.data : undefined,
          tenant: query?.includes("tenant") ? resTen?.data : undefined,
        },
      });
    });
    return result;
  }

  tenants(
    data: (Tenant & {
      categories?: Category[];
      orders?: Order[];
      products: Product[];
    })[],
    query?: string[],
  ) {
    const result: TenantResponseArr = { data: [] };
    data.forEach((tenant) => {
      const { categories, orders, products } = tenant;
      const resCat = categories ? this.categories(categories) : undefined;
      const resOrd = orders ? this.orders(orders) : undefined;
      const resPro = products ? this.products(products) : undefined;

      result.data.push({
        id: tenant.id,
        attributes: {
          name: tenant.name,
          slug: tenant.slug,
          city: tenant.city,
          phone: tenant.phone,
          primaryColor: tenant.primaryColor,
          permission: tenant.permission,
          categories: query?.includes("categories") ? resCat?.data : undefined,
          orders: query?.includes("orders") ? resOrd?.data : undefined,
          products: query?.includes("products") ? resPro?.data : undefined,
        },
      });
    });
    return result;
  }
}

export const formatterArrayResponse = new FormatterArrayResponse();
