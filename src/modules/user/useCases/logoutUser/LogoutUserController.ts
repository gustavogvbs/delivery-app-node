import { Request, Response } from "express";

import { Authenticate } from "@utils/Authenticate";

export class LogoutUserController {
  constructor(private auth: Authenticate) {}
  async handle(req: Request, res: Response) {
    const { token } = req.cookies;

    this.auth.deleteCookie(token, res);

    res.status(201).json({ message: "Desconectado com sucesso" });
  }
}
