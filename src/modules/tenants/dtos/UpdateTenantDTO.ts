export interface UpdateTenantData {
  permission: boolean;
  name: string;
  city: string;
  phone: string;
  primaryColor: string;
  slug: string;
}

export interface UpdateTenantRequest {
  id: string;
  permission: boolean;
  name: string;
  city: string;
  phone: string;
  primaryColor: string;
  slug: string;
  token: string;
}
export interface UpdateTenantResponse {
  data: {
    id: string;
    attributes: UpdateTenantData;
  };
}
