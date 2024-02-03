import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "@src/env";

import { AppError } from "@errors/AppErro";
import { USERS_ROLES } from "@utils/RoleEnum";

import { JWTZod } from "@type/jwtType";

class authAccess {
  client(req: Request, res: Response, next: NextFunction): void {
    let seccess = false;
    const { authorization } = req.headers;

    if (authorization) {
      const [authType, token] = authorization.split(" ");
      if (authType === "Bearer") {
        try {
          const decoded = JWTZod.safeParse(
            jwt.verify(token, env.JWT_SECRET_KEY),
          );

          if (decoded.success && decoded.data.role === USERS_ROLES.CLIENT) {
            seccess = true;
          }
        } catch (e) {
          console.error("error");
        }
      }
    }

    if (!seccess) {
      throw new AppError("403 Forbidem", 403);
    }

    next();
  }
  admin(req: Request, res: Response, next: NextFunction): void {
    let seccess = false;
    const { authorization } = req.headers;

    if (authorization) {
      const [authType, token] = authorization.split(" ");
      if (authType === "Bearer") {
        try {
          const decoded = JWTZod.safeParse(
            jwt.verify(token, env.JWT_SECRET_KEY),
          );

          if (decoded.success && decoded.data.role === USERS_ROLES.ADMIN) {
            seccess = true;
          }
        } catch (e) {
          console.error("error");
        }
      }
    }

    if (!seccess) {
      throw new AppError("403 Forbidem", 403);
    }

    next();
  }

  tenant(req: Request, res: Response, next: NextFunction): void {
    let seccess = false;
    const { authorization } = req.headers;

    if (authorization) {
      const [authType, token] = authorization.split(" ");
      if (authType === "Bearer") {
        try {
          const decoded = JWTZod.safeParse(
            jwt.verify(token, env.JWT_SECRET_KEY),
          );

          if (decoded.success && decoded.data.role === USERS_ROLES.TENANT) {
            seccess = true;
          }
        } catch (e) {
          console.error("error");
        }
      }
    }

    if (!seccess) {
      throw new AppError("403 Forbidem", 403);
    }

    next();
  }
}

const auth = new authAccess();

export { auth };
