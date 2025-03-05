import { authController } from "../../controller/authController.js";
import { Users } from "../../model/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../security/jwt-util.js";

jest.mock("../../model/userModel.js");
jest.mock("../../security/jwt-util.js");

describe("Ayush - Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, user: { user: { name: "Ayush", email: "ayush@test.com" } } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
  });

  it("Ayush - should login successfully", async () => {
    req.body = { email: "ayush@test.com", password: "password123" };

    const mockUser = { email: "ayush@test.com", password: await bcrypt.hash("password123", 10), toJSON: jest.fn() };
    Users.findOne.mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    generateToken.mockReturnValue("fake-token");

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: { access_token: "fake-token" } }));
  });

  it("Ayush - should fail login for invalid credentials", async () => {
    req.body = { email: "ayush@test.com", password: "wrongpassword" };

    Users.findOne.mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("Ayush - should create a new user", async () => {
    req.body = { name: "Ayush", email: "ayush@test.com", password: "password123" };

    Users.findOne.mockResolvedValue(null);
    Users.create.mockResolvedValue({ toJSON: jest.fn() });
    generateToken.mockReturnValue("fake-token");

    await authController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ data: { access_token: "fake-token" } }));
  });

  it("Ayush - should reset password successfully", async () => {
    req.body = { email: "ayush@test.com", newPassword: "newpassword" };
    const mockUser = { update: jest.fn() };

    Users.findOne.mockResolvedValue(mockUser);

    await authController.resetpassword(req, res);

    expect(mockUser.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Password successfully updated" });
  });
});
