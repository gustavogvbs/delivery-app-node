import { z } from "zod";

export const orderProductsSchema = z.array(
  z.object({
    id: z.string(),
    qtd: z.number(),
    product: z.string(),
    price: z.number(),
  }),
);
