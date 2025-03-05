import { Hotel } from "../../model/hotelModel.js";

describe("Hotel Model", () => {
  it("should have the correct schema", () => {
    expect(Hotel.rawAttributes).toHaveProperty("bookingId");
    expect(Hotel.rawAttributes).toHaveProperty("name");
    expect(Hotel.rawAttributes).toHaveProperty("contactNumber");
    expect(Hotel.rawAttributes).toHaveProperty("hotelName");
    expect(Hotel.rawAttributes).toHaveProperty("numberOfPeople");
    expect(Hotel.rawAttributes).toHaveProperty("startDate");
    expect(Hotel.rawAttributes).toHaveProperty("endDate");
    expect(Hotel.rawAttributes).toHaveProperty("totalPrice");
  });

  it("should require a name", async () => {
    try {
      await Hotel.create({ contactNumber: "1234567890" });
    } catch (error) {
      expect(error.name).toBe("SequelizeValidationError");
    }
  });

  it("should not allow negative total price", async () => {
    try {
      await Hotel.create({
        name: "Ayush",
        contactNumber: "9876543210",
        hotelName: "Luxury Inn",
        numberOfPeople: 2,
        startDate: "2025-03-01",
        endDate: "2025-03-05",
        totalPrice: 5000,
      });
    } catch (error) {
      expect(error.name).toBe("SequelizeValidationError");
    }
  });
});
