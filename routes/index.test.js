import { expect, test, describe } from "vitest";
import server from "../server";
import supertest from "supertest";

const testServer = supertest(server);

describe("GET /api/health", () => {
  test("returns status 200", async () => {
    await testServer.get("/api/health").expect(200);
  });

  test("returns positive health message", async () => {
    const response = await testServer.get("/api/health");
    expect(response.body).toEqual({
      message: "Api is up and healthy!",
    });
  });
});
