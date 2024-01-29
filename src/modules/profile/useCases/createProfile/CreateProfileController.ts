import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";
import { USERS_ROLES } from "@utils/RoleEnum";

import { CreateProfileUseCase } from "./CreateProfileUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    const createProfileUseCase = new CreateProfileUseCase();
    if (!name || !email || !password || !phone) {
      throw new AppError("Propriedades Invalidas", 500);
    }
    const result = await createProfileUseCase.execute({
      name,
      email,
      password,
      phone,
      role: USERS_ROLES.TENANT,
    });

    return res.status(201).json(result);
  }
}
