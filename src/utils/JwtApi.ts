import jwt from "jsonwebtoken";

import { env } from "@src/env";

import { JWTTypes } from "@type/jwtType";

export interface IJwtApi {
  generate({ id, name, role }: JWTTypes): string;
}

export class JwtApi implements IJwtApi {
  generate({ id, name, role }: JWTTypes) {
    const token = jwt.sign(
      {
        id: id,
        name: name,
        role: role,
      },
      env.JWT_SECRET_KEY,
      {
        expiresIn: 60 * 60 * 24 * 7,
      },
    );

    return token;
  }
}
