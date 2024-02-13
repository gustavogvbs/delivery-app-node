import { app } from "@src/app";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { AppError } from "@errors/AppErro";

import { createDevUseCase } from ".";
import { createAdminUseCase } from "../createAdmin";

describe("Create new user Dev", () => {
  describe("By UseCase", () => {
    it("Should be possible create new user Dev", async () => {
      const dataUser = {
        name: "Teste Testando",
        email: "teste@test.com",
        password: "1234",
        phone: "015999999999",
      };
      const sut = await createDevUseCase.execute(dataUser);

      expect(sut).toHaveProperty("token");
      expect(sut.user).toHaveProperty("id");
      expect(sut.user.email).toEqual(dataUser.email);
      expect(sut.user.name).toEqual(dataUser.name);
    });

    it("Should return error email 'already exists'", async () => {
      const dataExistUser = {
        name: "Teste Testando",
        email: "teste.exists@test.com",
        password: "1234",
        phone: "015999999999",
      };
      await createDevUseCase.execute(dataExistUser);

      await expect(createDevUseCase.execute(dataExistUser)).rejects.toThrow();
      await expect(createDevUseCase.execute(dataExistUser)).rejects.toEqual(
        new AppError("Email já registrado.", 400),
      );
    });
  });

  describe("By Controller", () => {
    const dataAdm = {
      token: "",
      id: "",
    };
    beforeAll(async () => {
      const admin = await createAdminUseCase.execute({
        email: "admin@admin.com",
        name: "Admin Teste",
        password: "admin",
        phone: "9999999999",
      });
      dataAdm.id = admin.user.id;
      dataAdm.token = admin.token;
    });

    it("Should be possible create new user Dev", async () => {
      const dataUser = {
        name: "Teste Testando",
        email: "teste.controller@test.com",
        password: "1234",
        phone: "015999999999",
      };
      const response = await request(app)
        .post("/auth/dev")
        .send(dataUser)
        .set("Authorization", `Bearer ${dataAdm.token}`);

      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.email).toEqual(dataUser.email);
      expect(response.body.user.name).toEqual(dataUser.name);
    });

    it("Should be return error email already exists", async () => {
      const dataExistUser = {
        name: "Teste Testando",
        email: "teste.already.exists@test.com",
        password: "1234",
        phone: "015999999999",
      };

      await createDevUseCase.execute(dataExistUser);

      const response = await request(app)
        .post("/auth/dev")
        .send(dataExistUser)
        .set("Authorization", `Bearer ${dataAdm.token}`);

      expect(response.status).toEqual(400);
    });

    it("Should be return error forbidden", async () => {
      const dataExistUser = {
        name: "Teste Testando",
        email: "teste.forbidden@test.com",
        password: "1234",
        phone: "015999999999",
      };

      const response = await request(app).post("/auth/dev").send(dataExistUser);

      expect(response.status).toEqual(403);
    });
  });
});
