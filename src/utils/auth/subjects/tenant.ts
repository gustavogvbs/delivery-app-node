import { z } from "zod";

import { tenantTypeName, tenantSchema } from "../models/tenant";

export const tenantSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("get-all"),
    z.literal("create"),
    z.literal("update"),
    z.literal("delete"),
  ]),
  z.union([tenantSchema, tenantTypeName, z.literal("Permission")]),
]);

export type TenantTypeName = z.infer<typeof tenantTypeName>;

export type TenantSubject = z.infer<typeof tenantSubject>;
