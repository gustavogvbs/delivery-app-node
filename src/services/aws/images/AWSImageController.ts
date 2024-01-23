import { Request, Response } from "express";

import { UploadImageService } from "./UploadImageService";
import { AppError } from "../../../errors/AppErro";

export class AWSImageController {
	async Upload(req: Request, res: Response) {
		const { file } = req;
		if (file) {
			const uploadImageService = new UploadImageService();

			await uploadImageService.execute(file);

			return res
				.status(201)
				.json({ message: "upload done successfully ", status: "201" });
		}
		throw new AppError("Erro");
	}
}
