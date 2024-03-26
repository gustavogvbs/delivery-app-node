import { z } from "zod";

export const usersTypeName = z.literal("Users");

export const usersSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("get-all"),
    z.literal("create"),
    z.literal("update"),
    z.literal("delete"),
  ]),
  usersTypeName,
]);

export type UsersTypeName = z.infer<typeof usersTypeName>;

export type UsersSubject = z.infer<typeof usersSubject>;
