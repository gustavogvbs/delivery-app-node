import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/AppErro";

export class auth {
	login(req: Request, res: Response, next: NextFunction) {
		const token = true;

		if (!token) {
			throw new AppError("403 Forbidem");
		}
	}
}
