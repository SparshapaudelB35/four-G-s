import request from "supertest";
import app from "../../app.js"; 

describe("Ayush - Auth Routes", () => {
  it("Ayush - should login successfully", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "ayush@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data.access_token");
  });

  it("Ayush - should fail login with invalid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "ayush@test.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(404);
  });

  it("Ayush - should register a new user", async () => {
    const res = await request(app).post("/auth/create").send({
      name: "Ayush",
      email: "ayush@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("data.access_token");
  });

  it("Ayush - should reset password", async () => {
    const res = await request(app).post("/auth/resetpassword").send({
      email: "ayush@test.com",
      newPassword: "newpassword",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password successfully updated");
  });
});
