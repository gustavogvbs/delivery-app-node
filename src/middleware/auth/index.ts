import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "@src/env";

import { AppError } from "@errors/AppErro";

import { JWTZod } from "@type/jwtType";

class authAccess {
  execute(req: Request, next: NextFunction, layerPermission: role): void {
    const { token } = req.cookies;

    let permission: string[] = [];

    switch (layerPermission) {
      case role.ADMIN:
        permission = [role.ADMIN];
        break;
      case role.DEV:
        permission = [role.ADMIN, role.DEV];
        break;
      case role.TENANT:
        permission = [role.ADMIN, role.DEV, role.TENANT];
        break;
      case role.CLIENT:
        permission = [role.ADMIN, role.DEV, role.TENANT, role.CLIENT];
        break;
      default:
        permission = [];
        break;
    }

    if (token && token !== "") {
      try {
        const decoded = JWTZod.safeParse(jwt.verify(token, env.JWT_SECRET_KEY));

        if (decoded.success && decoded.data.role) {
          const hasPermission = permission.includes(decoded.data.role);
          if (hasPermission) {
            next();
          } else {
            throw new AppError("403 Forbidem", 403);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}

const auth = new authAccess();

export { auth };
