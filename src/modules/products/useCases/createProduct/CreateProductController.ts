import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";
import { UploadImageService } from "@services/aws/images/UploadImageService";

import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private uploadImageService: UploadImageService,
  ) {}

  async handle(req: Request, res: Response) {
    const data = req.body;
    const { token } = req.cookies;
    const { populate } = req.query;
    const { file } = req;

    const query = typeof populate === "string" ? [populate] : populate;

    if (!file) throw new AppError("Imagens não encontrada", 400);

    if (!data.name || !data.price || !data.description || !data.categoryId)
      throw new AppError("Propriedades não encontrada", 404);

    const image = await this.uploadImageService.execute(file, data.name);

    const result = await this.createProductUseCase.execute({
      ...data,
      image,
      token,
      query: populate ? (query as string[]) : undefined,
    });

    return res.status(201).json(result);
  }
}
