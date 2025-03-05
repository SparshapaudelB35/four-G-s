import request from "supertest";
import app from "../../app.js"; 
import { Hotel } from "../../model/hotelModel.js";

jest.mock("../../model/hotelModel.js");

describe("Hotel API Endpoints", () => {
  it("should fetch all hotel bookings", async () => {
    Hotel.findAll.mockResolvedValue([{ bookingId: 1, name: "Ayush K.C." }]);

    const res = await request(app).get("/hotels");
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should create a hotel booking", async () => {
    Hotel.create.mockResolvedValue({ bookingId: 1, name: "Ayush K.C." });

    const res = await request(app).post("/hotels").send({
      name: "Ayush K.C.",
      contactNumber: "1234567890",
      hotelName: "Hotel ABC",
      numberOfPeople: 2,
      startDate: "2025-03-05",
      endDate: "2025-03-10",
      totalPrice: 5000,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Hotel booking created successfully");
  });

  it("should return 400 for invalid booking creation", async () => {
    const res = await request(app).post("/hotels").send({ name: "Ayush K.C." });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing required fields");
  });

  it("should delete a hotel booking", async () => {
    Hotel.findByPk.mockResolvedValue({ destroy: jest.fn() });

    const res = await request(app).delete("/hotels/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hotel booking deleted successfully");
  });
});
