import { app } from "@src/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { AppError } from "@errors/AppErro";

import { createClientUseCase } from ".";

describe("Create user client", () => {
  describe("By UseCase", () => {
    it("Should be possible create new user client", async () => {
      const dataUser = {
        name: "teste",
        email: "test@test.com",
        password: "1234",
        phone: "15999999999",
      };
      const sut = await createClientUseCase.execute(dataUser);

      expect(sut).toHaveProperty("token");
      expect(sut.user).toHaveProperty("id");
      expect(sut.user.email).toEqual(dataUser.email);
      expect(sut.user.name).toEqual(dataUser.name);
    });

    it("Should be return email already exists", async () => {
      const dataExistUser = {
        name: "Teste Testando",
        email: "teste.exists@test.com",
        password: "1234",
        phone: "015999999999",
      };
      await createClientUseCase.execute(dataExistUser);

      await expect(
        createClientUseCase.execute(dataExistUser),
      ).rejects.toThrow();
      await expect(createClientUseCase.execute(dataExistUser)).rejects.toEqual(
        new AppError("Email já registrado.", 400),
      );
    });
  });

  describe("By Controller", () => {
    it("Should be possible create new user client", async () => {
      const dataUser = {
        name: "Teste Testando",
        email: "client.controller@test.com",
        password: "1234",
        phone: "015999999999",
      };
      const response = await request(app).post("/auth/user").send(dataUser);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.name).toEqual(dataUser.name);
      expect(response.body.user.email).toEqual(dataUser.email);
    });

    it("Should return error email alredy exists", async () => {
      const dataUser = {
        name: "Teste Testando",
        email: "client.alredy.exist@controller.com",
        password: "1234",
        phone: "015999999999",
      };

      await createClientUseCase.execute(dataUser);

      const response = await request(app).post("/auth/user").send(dataUser);

      expect(response.status).toEqual(400);
    });
  });
});
