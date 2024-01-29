import { USERS_ROLES as typerole } from "@utils/RoleEnum";

export interface CreateProfileDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: typerole.ADMIN | typerole.DEV | typerole.TENANT | typerole.CLIENT;
}
