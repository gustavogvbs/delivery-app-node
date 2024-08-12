import { z } from "zod";

const imageJsonSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
});

type ImageJsonSchemaType = z.infer<typeof imageJsonSchema>;

export { type ImageJsonSchemaType, imageJsonSchema };
