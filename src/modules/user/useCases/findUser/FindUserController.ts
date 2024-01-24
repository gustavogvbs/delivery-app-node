import { Request, Response } from "express";
import { FindUserUseCase } from "./FindUserUseCase";

export class FindUserController {
	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const findUserController = new FindUserUseCase();

		const result = await findUserController.execute({ id });

		return res.status(201).json(result);
	}
}
