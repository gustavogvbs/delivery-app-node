import { z } from "zod";

export const ordersTypeName = z.literal("Orders");

export const ordersSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("get-all"),
    z.literal("create"),
    z.literal("update"),
    z.literal("delete"),
  ]),
  ordersTypeName,
]);

export type OrdersTypeName = z.infer<typeof ordersTypeName>;

export type OrdersSubject = z.infer<typeof ordersSubject>;
