import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { CreateProfileUseCase } from "./CreateProfileUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    const createProfileUseCase = new CreateProfileUseCase();
    if (!name || !email || !password || !phone) {
      throw new AppError("Propriedades Invalidas", 501);
    }
    const result = await createProfileUseCase.execute({
      name,
      email,
      password,
      phone,
      role: "CLIENT",
    });

    return res.status(201).json(result);
  }
}
