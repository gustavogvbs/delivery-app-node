import { z } from "zod";

export const tenantTypeName = z.literal("Tenant");

export const tenantSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  city: z.string(),
  primaryColor: z.string(),
  phone: z.string(),
  permission: z.boolean(),
});
