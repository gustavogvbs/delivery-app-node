import { z } from "zod";

export const categoryTypeName = z.literal("Category");

export const categorySubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("get-all"),
    z.literal("create"),
    z.literal("update"),
    z.literal("delete"),
    z.literal("read"),
  ]),
  categoryTypeName,
]);

export type CategoryTypeName = z.infer<typeof categoryTypeName>;

export type CategorySubject = z.infer<typeof categorySubject>;
