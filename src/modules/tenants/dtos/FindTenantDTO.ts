export interface FindTenantData {
  slug: string;
  name: string;
  city: string;
  phone: string;
  primaryColor: string;
}

export interface FindTenantRequest {
  slug: string;
}

export interface FindTenantResponse {
  data: {
    id: string;
    attributes: FindTenantData;
  };
}
