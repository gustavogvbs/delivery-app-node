import { it, describe, expect } from "vitest";

import { loginUseruseCase } from ".";
import { AppError } from "../../../../errors/AppErro";

describe("Login user", () => {
  it("It should be possible to log in as a customer", () => {
    const sut = loginUseruseCase.execute({
      email: "Teste2@teste.com",
      password: "1234",
    });
    expect(sut).not.resolves.toBeInstanceOf(AppError);
    expect(sut).resolves.toHaveProperty("user.id");
    expect(sut).resolves.toHaveProperty("token");
  });
});
