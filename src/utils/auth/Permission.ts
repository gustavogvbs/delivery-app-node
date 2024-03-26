import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "./Abilities";
import { User } from "./models/user";
import { Role } from "./Role";
import { Admin } from "./roles/Admin";
import { Client } from "./roles/Client";
import { Tenant } from "./roles/Tenant";

type userPermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void;

export const permissions: Record<Role, userPermissions> = {
  ADMIN: Admin,
  TENANT: Tenant,
  CLIENT: Client,
  DEV(user, { can, cannot }) {},
};
