import { USERS_ROLES as user } from "@src/enums/RoleEnum";
import { z } from "zod";

export const roleSchema = z.union([
  z.literal(user.ADMIN),
  z.literal(user.DEV),
  z.literal(user.TENANT),
  z.literal(user.CLIENT),
]);

export type Role = z.infer<typeof roleSchema>;
