import { z } from "zod";

export const productsTypeName = z.literal("Products");

export const productsSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("get-all"),
    z.literal("create"),
    z.literal("update"),
    z.literal("delete"),
    z.literal("read"),
  ]),
  productsTypeName,
]);

export type ProductsTypeName = z.infer<typeof productsTypeName>;

export type ProductsSubject = z.infer<typeof productsSubject>;
