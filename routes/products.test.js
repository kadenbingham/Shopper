import { test, expect, describe } from "vitest";
import supertest from "supertest";
import server from "../server";

const testServer = supertest(server);

describe("GET /api/products", () => {
  test("returns all products", async () => {
    const response = await testServer.get("/api/products");
    expect(response.body).toEqual([
      {
        name: "Big jar of salsa",
      },
      { name: "Balsa wood model plane" },
      { name: "A really big balloon" },
    ]);
  });
});
