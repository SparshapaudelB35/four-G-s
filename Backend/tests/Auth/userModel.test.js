import { Users } from "../../model/userModel.js";

describe("Ayush - User Model", () => {
  it("Ayush - should have correct schema", () => {
    expect(Users.rawAttributes).toHaveProperty("name");
    expect(Users.rawAttributes).toHaveProperty("email");
    expect(Users.rawAttributes).toHaveProperty("password");
  });

  it("Ayush - should not allow duplicate email", async () => {
    expect(Users.rawAttributes.email.unique).toBeTruthy();
  });

  it("Ayush - should require name, email, and password", async () => {
    try {
      await Users.create({});
    } catch (error) {
      expect(error.name).toBe("SequelizeValidationError");
    }
  });

  it("Ayush - should validate email format", async () => {
    try {
      await Users.create({ name: "Ayush", email: "invalid-email", password: "password" });
    } catch (error) {
      expect(error.name).toBe("SequelizeValidationError");
    }
  });
});
