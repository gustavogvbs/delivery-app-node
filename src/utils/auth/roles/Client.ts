import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "../Abilities";
import { User } from "../models/user";

export const Client = (user: User, { can }: AbilityBuilder<AppAbility>) => {
  // TENANT
  can("get", "Tenant");
  // CATEGORY
  can(["get", "get-all"], "Category");
  // ORDER
  can(["create", "delete", "update", "get", "get-all"], "Orders", {
    ownerId: { $eq: user.id },
  });
  // USER
  can("manage", "Users", {
    ownerId: { $eq: user.id },
  });
  // PRODUCTS
  can(["get", "get-all"], "Products");
};
