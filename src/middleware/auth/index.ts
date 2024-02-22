import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "@src/env";

import { AppError } from "@errors/AppErro";

import { JWTZod } from "@type/jwtType";

class authAccess {
  admin(req: Request, __: Response, next: NextFunction): void {
    const { token } = req.cookies;
    const { role } = req.params;

    if (token && token !== "") {
      try {
        const decoded = JWTZod.safeParse(jwt.verify(token, env.JWT_SECRET_KEY));

        if (decoded.success && decoded.data.role === role) {
          next();
        } else {
          throw new AppError("403 Forbidem", 403);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}

const auth = new authAccess();

export { auth };
