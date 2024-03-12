import { USERS_ROLES as role } from "@src/enums/RoleEnum";
import { Request, NextFunction } from "express";

import { AppError } from "@errors/AppErro";
import { JwtApi } from "@utils/JwtApi";

import { JWTZod } from "@type/jwtType";

class authAccess {
  constructor(private jwt: JwtApi) {}

  execute(req: Request, next: NextFunction, layerPermission: role): void {
    const cookie = req.cookies;

    console.log(cookie, "middleware");

    if (!cookie || !cookie.token) {
      throw new AppError("Token não encontrado", 404);
    }

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

    if (cookie.token && cookie.token !== "") {
      try {
        const decoded = JWTZod.safeParse(this.jwt.decoded(cookie.token));

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

const jwtApi = new JwtApi();

const auth = new authAccess(jwtApi);

export { auth };
