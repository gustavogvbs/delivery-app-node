import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "./Abilities";
import { User } from "./models/user";
import { Role } from "./Role";

type userPermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void;

export const permissions: Record<Role, userPermissions> = {
  ADMIN(__, { can, cannot }) {
    can("manage", "Tenant");
    cannot(["delete", "update"], "Tenant");
    can("update", "Permission");
    cannot("manage", "Category");
    cannot("manage", "Products");
  },
  TENANT(user, { can, cannot }) {
    can("manage", "Tenant");
    cannot(["update", "delete"], "Tenant");
    can(["delete", "update"], "Tenant", {
      ownerId: { $eq: user.id },
    });
    can(["delete", "update", "get", "get-all"], "Category", {
      ownerId: { $eq: user.id },
    });
    can("create", "Category");
    can("manage", "Products");
    cannot(["delete", "update"], "Products");
    can(["delete", "update"], "Products", { ownerId: { $eq: user.id } });
  },
  CLIENT(user, { can, cannot }) {},
  DEV(user, { can, cannot }) {},
};
