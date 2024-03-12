export interface GetTenantData {
  name: string;
  city: string;
  permission: boolean;
  phone: string;
  primaryColor: string;
  slug: string;
}

export interface GetTenantResponse {
  data: {
    id: string;
    attributes: GetTenantData;
  }[];
}
