import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";
import { USERS_ROLES } from "@utils/RoleEnum";

import { CreateProfileUseCase } from "./CreateProfileUseCase";

export class CreateProfileController {
  constructor(private createProfileUseCase: CreateProfileUseCase) {}
  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      throw new AppError("Propriedades Invalidas", 500);
    }
    const result = await this.createProfileUseCase.execute({
      name,
      email,
      password,
      phone,
      role: USERS_ROLES.CLIENT,
    });

    return res.status(201).json(result);
  }
}
