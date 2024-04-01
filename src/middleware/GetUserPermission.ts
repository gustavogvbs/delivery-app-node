import { defineAbilityFor } from "../utils/auth/Abilities";
import { userSchema } from "../utils/auth/models/user";
import { Role } from "../utils/auth/Role";

export const getUserPermission = (userId: string, role: Role) => {
  const authUser = userSchema.parse({
    id: userId,
    role,
  });

  const ability = defineAbilityFor(authUser);
  console.log(defineAbilityFor(authUser));

  return ability;
};
