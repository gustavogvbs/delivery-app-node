import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "../Abilities";
import { User } from "../models/user";

export const Admin = (
  user: User,
  { can, cannot }: AbilityBuilder<AppAbility>,
) => {
  // TENANT
  can("manage", "Tenant");
  cannot(["delete", "update"], "Tenant");
  can("update", "Permission");
  // CATEGORY
  cannot("manage", "Category");
  // PRODUCTS
  cannot("manage", "Products");
  // ORDER
  cannot("manage", "Orders");
  // USER
  can("manage", "Users", { ownerId: { $eq: user.id } });
};
