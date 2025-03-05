import request from "supertest";
import app from "../../app.js";

describe("Ayush - Security Tests", () => {
  it("Ayush - should prevent SQL injection in login", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "ayush@test.com'; DROP TABLE users;--",
      password: "password",
    });

    expect(res.statusCode).toBe(404);
  });

  it("Ayush - should prevent large payload in registration", async () => {
    const largeString = "A".repeat(100000);
    const res = await request(app).post("/auth/create").send({
      name: largeString,
      email: "ayush@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
  });

  it("Ayush - should prevent weak password in registration", async () => {
    const res = await request(app).post("/auth/create").send({
      name: "Ayush",
      email: "ayush@test.com",
      password: "123",
    });

    expect(res.statusCode).toBe(400);
  });

  it("Ayush - should prevent unauthorized access to protected route", async () => {
    const res = await request(app).get("/auth/init");

    expect(res.statusCode).toBe(401);
  });
});
