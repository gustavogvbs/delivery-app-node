import { app } from "@src/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { AppError } from "@errors/AppErro";

import { createAdminUseCase } from ".";
import { createClientUseCase } from "../createClient";

describe("Create admin by Controller", () => {
  it("Should be create new Admin", async () => {
    const dataAdmin = {
      name: "admin",
      email: "admin@admin.com",
      password: "admin",
      phone: "123123123",
    };
    const response = await request(app).post("/auth/admin").send(dataAdmin);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toEqual(dataAdmin.email);
    expect(response.body.user.name).toEqual(dataAdmin.name);
  });

  it("Should return error user admin alredy exists", async () => {
    const dataAdmin = {
      name: "admin",
      email: "admin@controller.com",
      password: "admin",
      phone: "123123123",
    };
    const response = await request(app).post("/auth/admin").send(dataAdmin);

    expect(response.status).toEqual(403);
  });
});

describe("Create user Admin", () => {
  it("Should return email already exist", async () => {
    const dataAdmin = {
      name: "admin",
      email: "admin@test.com",
      password: "admin",
      phone: "123123123",
    };
    await createClientUseCase.execute(dataAdmin);

    await expect(createAdminUseCase.execute(dataAdmin)).rejects.toEqual(
      new AppError("Email ja registrado.", 400),
    );
  });

  it("Should return admin alredy exists", async () => {
    const dataAdmin = {
      name: "admin",
      email: "admin.already.exists@admin.com",
      password: "admin",
      phone: "123123123",
    };

    await expect(createAdminUseCase.execute(dataAdmin)).rejects.toThrow();
    await expect(createAdminUseCase.execute(dataAdmin)).rejects.toEqual(
      new AppError("Ja existe um usuário como Admin.", 403),
    );
  });
});
