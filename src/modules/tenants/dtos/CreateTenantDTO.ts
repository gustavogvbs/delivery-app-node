import { USERS_ROLES as typerole } from "@src/enums/RoleEnum";

export interface CreateTenantRequest {
  user: {
    name: string;
    email: string;
    password: string;
    role: typerole.ADMIN | typerole.DEV | typerole.TENANT | typerole.CLIENT;
  };
  tenant: {
    name: string;
    primaryColor: string;
    phone: string;
    city: string;
  };
}

export interface CreateTenantData {
  name: string;
  slug: string;
  city: string;
  primaryColor: string;
  phone: string;
  permission: boolean;
}

export interface CreateTenantResponse {
  token: string;
  tenant: {
    data: {
      id: string;
      attributes: CreateTenantData;
    };
  };
}
