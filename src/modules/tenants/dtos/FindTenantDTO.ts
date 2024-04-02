import { CategoryResponseAttr } from "@utils/res/formatters/category-response";

export interface FindTenantData {
  slug: string;
  name: string;
  city: string;
  phone: string;
  primaryColor: string;
  categories: CategoryResponseAttr[];
}

export interface FindTenantRequest {
  slug: string;
  query?: string[];
}

export interface FindTenantResponse {
  data: {
    id: string;
    attributes: FindTenantData;
  };
}
