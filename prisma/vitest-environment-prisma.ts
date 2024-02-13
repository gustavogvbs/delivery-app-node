import { execSync } from "child_process";
import dotenv from "dotenv";
import { resolve } from "path";
import { Client } from "pg";
import { v4 as uuid } from "uuid";
import type { Environment } from "vitest";

dotenv.config({
  path: resolve(__dirname, "..", ".env.test"),
});

export default <Environment>{
  name: "custom",
  transformMode: "ssr",
  setup(global, options) {
    options;

    const schema = `code_schema_${uuid()}`;
    const connectionString = `${process.env.DATABASE_URL}${schema}`;

    process.env.DATABASE_URL = connectionString;
    global.process.env.DATABASE_URL = connectionString;

    execSync(`npx prisma migrate dev`);

    return {
      async teardown() {
        const client = new Client({
          connectionString: connectionString,
        });

        await client.connect();
        await client.query(`drop SCHEMA IF EXISTS "${schema}" CASCADE`);
        await client.end();
      },
    };
  },
};
