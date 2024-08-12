import jwt from "jsonwebtoken";

import { env } from "@src/env";

import { AppError } from "@errors/AppErro";

import { JWTTypes, JWTZod } from "@type/jwtType";

export interface IJwtApi {
  generate({ id, name, role }: JWTTypes): string;
  decoded(token: string): string | jwt.JwtPayload;
  verify(token: string): { id: string; name: string; role: string };
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
  decoded(token: string) {
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY);

    return decoded;
  }
  verify(token: string) {
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY);
    const res = JWTZod.safeParse(decoded);

    if (!res.success) throw new AppError("jwt invalido", 403);

    return { id: res.data.id, name: res.data.name, role: res.data.role };
  }
}
