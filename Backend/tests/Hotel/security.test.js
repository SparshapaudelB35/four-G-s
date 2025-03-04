import request from "supertest";
import app from "../../app.js";

describe("Security Tests", () => {
  it("should prevent SQL injection in booking creation", async () => {
    const res = await request(app).post("/hotels").send({
      name: "Hacker",
      contactNumber: "1234567890'; DROP TABLE hotels;--",
      hotelName: "Malicious Hotel",
      numberOfPeople: 2,
      startDate: "2025-03-05",
      endDate: "2025-03-10",
      totalPrice: 1000,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid contact number");
  });

  it("should return 400 for invalid date format", async () => {
    const res = await request(app).post("/hotels").send({
      name: "Test User",
      contactNumber: "9876543210",
      hotelName: "Nice Stay",
      numberOfPeople: 3,
      startDate: "invalid-date",
      endDate: "2025-03-05",
      totalPrice: 5000,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid date range");
  });

  it("should prevent large payload attacks", async () => {
    const largeString = "A".repeat(100000);
    const res = await request(app).post("/hotels").send({
      name: largeString,
      contactNumber: "9876543210",
      hotelName: "Nice Stay",
      numberOfPeople: 2,
      startDate: "2025-03-05",
      endDate: "2025-03-10",
      totalPrice: 5000,
    });

    expect(res.statusCode).toBe(400);
  });
});
