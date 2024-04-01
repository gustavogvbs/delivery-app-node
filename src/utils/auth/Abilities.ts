import { AbilityBuilder, InferSubjects, PureAbility } from "@casl/ability";
import { USERS_ROLES } from "@src/enums/RoleEnum";

import { User } from "./models/user";
import { permissions } from "./Permission";
import { CategorySubject } from "./subjects/category";
import { OrdersSubject } from "./subjects/order";
import { ProductsSubject } from "./subjects/products";
import { TenantSubject } from "./subjects/tenant";
import { UsersSubject } from "./subjects/user";

type subjects = InferSubjects<
  | CategorySubject
  | TenantSubject
  | ProductsSubject
  | OrdersSubject
  | UsersSubject
>;

export type AppAbility = PureAbility<subjects>;

export const defineAbilityFor = (user: User): AppAbility => {
  const builder = new AbilityBuilder<AppAbility>(PureAbility);

  if (user.role === USERS_ROLES.ADMIN) permissions.ADMIN(user, builder);
  if (user.role === USERS_ROLES.DEV) permissions.DEV(user, builder);
  if (user.role === USERS_ROLES.TENANT) permissions.TENANT(user, builder);
  if (user.role === USERS_ROLES.CLIENT) permissions.CLIENT(user, builder);

  return builder.build();
};
