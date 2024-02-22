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

export interface CreateTenantResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    updated_at: Date;
    created_at: Date;
  };
}
