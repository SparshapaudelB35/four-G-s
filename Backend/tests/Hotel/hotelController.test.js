import { hotelController } from "../../controller/hotelController.js";
import { Hotel } from "../../model/hotelModel.js";

jest.mock("../../model/hotelModel.js");

describe("Hotel Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  it("should return all hotel bookings", async () => {
    Hotel.findAll.mockResolvedValue([{ bookingId: 1, name: "Test User" }]);

    await hotelController.getAllHotelBookings(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: expect.any(Array) }));
  });

  it("should handle no hotel bookings found", async () => {
    Hotel.findAll.mockResolvedValue([]);

    await hotelController.getAllHotelBookings(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No hotel bookings found" });
  });

  it("should create a hotel booking", async () => {
    req.body = {
      name: "Ayush",
      contactNumber: "9876543210",
      hotelName: "Luxury Inn",
      numberOfPeople: 3,
      startDate: "2025-03-01",
      endDate: "2025-03-05",
      totalPrice: 7500,
    };

    Hotel.create.mockResolvedValue(req.body);

    await hotelController.createHotelBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Hotel booking created successfully" }));
  });

  it("should return error if required fields are missing", async () => {
    req.body = { name: "Ayush" };

    await hotelController.createHotelBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Missing required fields" });
  });

  it("should delete a hotel booking", async () => {
    req.params.bookingId = 1;
    const mockBooking = { destroy: jest.fn() };

    Hotel.findByPk.mockResolvedValue(mockBooking);

    await hotelController.deleteHotelBookingById(req, res);

    expect(mockBooking.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Hotel booking deleted successfully" });
  });

  it("should return error if hotel booking not found", async () => {
    req.params.bookingId = 1;
    Hotel.findByPk.mockResolvedValue(null);

    await hotelController.deleteHotelBookingById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Hotel booking not found" });
  });
});
