import { USERS_ROLES as typerole } from "@utils/RoleEnum";

export interface CreateProfileRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: typerole.ADMIN | typerole.DEV | typerole.TENANT | typerole.CLIENT;
}

export interface CreateProfileResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    updated_at: Date;
    created_at: Date;
  };
}
