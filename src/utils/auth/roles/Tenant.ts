import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "../Abilities";
import { User } from "../models/user";

export const Tenant = (
  user: User,
  { can, cannot }: AbilityBuilder<AppAbility>,
) => {
  // TENANT
  cannot("manage", "Tenant");
  can("manage", "Tenant", {
    ownerId: { $eq: user.id },
  });
  // CATEGORY
  cannot("manage", "Category");
  can(["delete", "update", "get", "get-all"], "Category", {
    ownerId: { $eq: user.id },
  });
  // ORDER
  can(["get", "get-all", "update"], "Orders", {
    ownerId: { $eq: user.id },
  });
  //USER
  can("manage", "Users", {
    ownerId: { $eq: user.id },
  });
  // PRODUCTS
  can("manage", "Products");
  cannot(["update", "delete"], "Products");
  can(["delete", "update"], "Products", {
    ownerId: { $eq: user.id },
  });
};
