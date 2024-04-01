import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  role: z.union([
    z.literal(role.ADMIN),
    z.literal(role.CLIENT),
    z.literal(role.DEV),
    z.literal(role.TENANT),
  ]),
});

export type User = z.infer<typeof userSchema>;
