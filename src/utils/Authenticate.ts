import { serialize } from "cookie";
import { Response } from "express";

import { AppError } from "@errors/AppErro";

export class Authenticate {
  setCookies(token: string, res: Response) {
    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
  }

  deleteCookie(token: string, res: Response) {
    if (!token) {
      throw new AppError("Não autoriazado", 401);
    }

    const serialized = serialize("token", "", {
      httpOnly: true,
      maxAge: -1,
      path: "/",
      secure: false,
    });

    res.cookie("Set-Cookie", serialized);
  }
}
