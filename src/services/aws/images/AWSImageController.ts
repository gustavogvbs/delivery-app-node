import { Request, Response } from "express";

import { AppError } from "@errors/AppErro";

import { UploadImageService } from "./UploadImageService";

export class AWSImageController {
  constructor(private uploadImageService: UploadImageService) {}
  async Upload(req: Request, res: Response) {
    const { file } = req;
    if (file) {
      await this.uploadImageService.execute(file);

      return res
        .status(201)
        .json({ message: "upload done successfully ", status: "201" });
    }
    throw new AppError("Erro");
  }
}
