import { app } from "@src/app";
import bcrypt from "bcrypt";
import request from "supertest";
import { it, describe, expect, beforeAll } from "vitest";

import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { AppError } from "@errors/AppErro";
import { USERS_ROLES } from "@utils/RoleEnum";

import { loginUseruseCase } from ".";

const userRepository = new PrismaUserRepository();

describe("Log in user", async () => {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash("1234", salt);
  const dataUser = {
    name: "Teste Testando",
    email: "login.users.test@test.com",
    password: "1234",
    phone: "015999999999",
    role: USERS_ROLES.CLIENT,
  };

  describe("By UseCase", () => {
    beforeAll(async () => {
      await userRepository.createUser({ ...dataUser, password: passwordHash });
    });

    it("Should be possible to log in as a client", async () => {
      const sut = loginUseruseCase.execute({
        email: dataUser.email,
        password: dataUser.password,
      });

      await expect(sut).not.resolves.toThrow();
      await expect(sut).resolves.toHaveProperty("user.id");
      await expect(sut).resolves.toHaveProperty("token");
    });

    it("Not should be possible to log in if the email does not exist", async () => {
      const sut = loginUseruseCase.execute({
        email: "notexist@test.com",
        password: dataUser.password,
      });

      await expect(sut).rejects.toEqual(
        new AppError("Email não registrado", 404),
      );
    });

    it("Not should be possible to log in if password is incorrect", async () => {
      const sut = loginUseruseCase.execute({
        email: dataUser.email,
        password: "password.incorrect",
      });

      await expect(sut).rejects.toEqual(new AppError("Senha incorreta!", 400));
    });
  });

  describe("by Controller", () => {
    it("Should be possible to log in as a client", async () => {
      const response = await request(app).get("/users/login").send({
        email: dataUser.email,
        password: dataUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("id");
    });

    it("It should give an invalid properties error ", async () => {
      const response = await request(app).get("/users/login").send();

      expect(response.status).toBe(400);
    });
  });
});
