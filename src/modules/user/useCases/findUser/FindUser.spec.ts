import { app } from "@src/app";
import { USERS_ROLES } from "@src/enums/RoleEnum";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { AppError } from "@errors/AppErro";

import { findUserUseCase } from ".";
import { createClientUseCase } from "../createClient";

describe("Find user", async () => {
  const dataUser = {
    id: "",
    token: "",
    name: "Teste Testando",
    email: "login.users.test@test.com",
    password: "1234",
    phone: "015999999999",
    role: USERS_ROLES.CLIENT,
  };
  beforeAll(async () => {
    const { user, token } = await createClientUseCase.execute({
      ...dataUser,
    });
    dataUser.id = user.id;
    dataUser.token = token;
  });
  describe("By UseCase", async () => {
    it("Should be possible to get user information by id", async () => {
      const sut = await findUserUseCase.execute({ id: dataUser.id });

      expect(sut).toHaveProperty("id");
      expect(sut.name).toEqual(dataUser.name);
      expect(sut.email).toEqual(dataUser.email);
      expect(sut.id).toEqual(dataUser.id);
    });

    it("should return a not found error", async () => {
      const sut = findUserUseCase.execute({ id: "id_not_exist" });

      await expect(sut).rejects.toEqual(
        new AppError("Usuário não encontrado", 404),
      );
    });
  });

  describe("by Controller", async () => {
    it("Should be possible to get user information by id", async () => {
      const response = await request(app)
        .get(`/users/${dataUser.id}`)
        .set("Authorization", `Bearer ${dataUser.token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.email).toEqual(dataUser.email);
      expect(response.body.name).toEqual(dataUser.name);
    });

    it("should return a not found error", async () => {
      const response = await request(app)
        .get(`/users/id_not_exists`)
        .set("Authorization", `Bearer ${dataUser.token}`);

      expect(response.status).toEqual(404);
    });

    it("should return a error forbiden", async () => {
      const response = await request(app).get(`/users/id_not_exists`);

      expect(response.status).toEqual(403);
    });
  });
});
