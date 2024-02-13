import { z } from "zod";

const JWTZod = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  exp: z.number(),
  iat: z.number(),
});

interface JWTTypes {
  id: string;
  name: string;
  role: string;
}

export { JWTZod, JWTTypes };
