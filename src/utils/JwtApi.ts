import jwt from "jsonwebtoken";
import { env } from "../env";
import { JWTTypes } from "../types/jwt-types";

export class JwtApi {
	generate({ id, name, role }: JWTTypes) {
		const token = jwt.sign(
			{
				id: id,
				name: name,
				role: role,
			},
			env.JWT_SECRET_KEY,
			{
				expiresIn: "12h",
			}
		);

		return token;
	}
}