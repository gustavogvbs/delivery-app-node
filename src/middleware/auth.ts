import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "@src/env";

import { AppError } from "@errors/AppErro";

import { JWTZod } from "@type/jwt-types";

export class auth {
  private(req: Request, res: Response, next: NextFunction) {
    let seccess = false;
    const { authorization } = req.headers;

    if (authorization) {
      const [authType, token] = authorization.split(" ");
      if (authType === "Bearer") {
        try {
          const decoded = JWTZod.safeParse(
            jwt.verify(token, env.JWT_SECRET_KEY),
          );

          if (decoded.success && decoded.data.role === "client") {
            seccess = true;
          }
        } catch (e) {
          console.log("error");
        }
      }
    }

    if (!seccess) {
      throw new AppError("403 Forbidem", 403);
    }

    next();
  }
}
