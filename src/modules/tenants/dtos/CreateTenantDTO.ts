import { USERS_ROLES as typerole } from "@utils/RoleEnum";

export interface CreateTenantDTO {
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
