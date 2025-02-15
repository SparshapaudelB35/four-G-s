const tourController = require('../controller/Tour/tourController.js');
const Tour = require('../model/Tour/tourSchema.js');

// Mock the Tour model methods
jest.mock('../model/Tour/tourSchema.js', () => ({
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findByPk: jest.fn(),
}));

describe('Tour Controller', () => {
    // Helper function to mock the response object
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    describe('createTour', () => {
        it('should create a new tour successfully', async () => {
            const req = {
                body: {
                    name: 'new test',
                    contactNumber: '9848843423744',
                    numberOfPassengers: 13,
                    destination: 'nowhere',
                    startDate: '2024-03-20',
                    endDate: '2024-03-30',
                    totalPrice: 20000,
                },
            };
            const res = mockResponse();
            Tour.create.mockResolvedValue(req.body);

            await tourController.createTour(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Successfully created tour",
                data: expect.objectContaining(req.body),
            }));
        });

        it('should return 400 if required fields are missing', async () => {
            const req = { body: {} }; // Missing required fields
            const res = mockResponse();

            await tourController.createTour(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Missing required fields" });
        });

        it('should handle database errors during creation', async () => {
            const req = {
                body: {
                    name: 'new test',
                    contactNumber: '9848843423744',
                    numberOfPassengers: 13,
                    destination: 'nowhere',
                    startDate: '2024-03-20',
                    endDate: '2024-03-30',
                    totalPrice: 20000,
                },
            };
            const res = mockResponse();
            Tour.create.mockRejectedValue(new Error('Database error'));

            await tourController.createTour(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('getAllTours', () => {
        it('should return all tours successfully', async () => {
            const req = {};
            const res = mockResponse();
            Tour.findAll.mockResolvedValue([
                { tourId: 1, name: 'Test Tour 1' },
                { tourId: 2, name: 'Test Tour 2' },
            ]);

            await tourController.getAllTours(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                data: expect.arrayContaining([
                    expect.objectContaining({ tourId: 1, name: 'Test Tour 1' }),
                    expect.objectContaining({ tourId: 2, name: 'Test Tour 2' }),
                ]),
                message: "Successfully fetched tours",
            });
        });

        it('should return 404 if no tours are found', async () => {
            const req = {};
            const res = mockResponse();
            Tour.findAll.mockResolvedValue([]);

            await tourController.getAllTours(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "No tours found" });
        });

        it('should handle database errors when fetching tours', async () => {
            const req = {};
            const res = mockResponse();
            Tour.findAll.mockRejectedValue(new Error('Database error'));

            await tourController.getAllTours(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('getTourById', () => {
        it('should return a tour by ID successfully', async () => {
            const req = { params: { tourId: 1 } };
            const res = mockResponse();
            Tour.findByPk.mockResolvedValue({ tourId: 1, name: 'Test Tour' });

            await tourController.getTourById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                data: expect.objectContaining({ tourId: 1, name: 'Test Tour' }),
                message: "Tour fetched successfully",
            });
        });

        it('should return 404 if tour is not found', async () => {
            const req = { params: { tourId: 2 } };
            const res = mockResponse();
            Tour.findByPk.mockResolvedValue(null);

            await tourController.getTourById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Tour not found" });
        });

        it('should handle database errors when fetching a tour by ID', async () => {
            const req = { params: { tourId: 1 } };
            const res = mockResponse();
            Tour.findByPk.mockRejectedValue(new Error('Database error'));

            await tourController.getTourById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('updateTour', () => {
        it('should update a tour successfully', async () => {
            const req = {
                params: { tourId: 1 },
                body: { name: 'Updated Tour' },
            };
            const res = mockResponse();
            Tour.update.mockResolvedValue([1]); // Rows updated
            Tour.findByPk.mockResolvedValue({ tourId: 1, name: 'Updated Tour' });

            await tourController.updateTour(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                data: expect.objectContaining({ tourId: 1, name: 'Updated Tour' }),
                message: "Tour updated successfully",
            });
        });

        it('should return 404 if tour is not found during update', async () => {
            const req = {
                params: { tourId: 2 },
                body: { name: 'Updated Tour' },
            };
            const res = mockResponse();
            Tour.update.mockResolvedValue([0]); // No rows updated

            await tourController.updateTour(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Tour not found" });
        });

        it('should handle database errors during update', async () => {
            const req = {
                params: { tourId: 1 },
                body: { name: 'Updated Tour' },
            };
            const res = mockResponse();
            Tour.update.mockRejectedValue(new Error('Database error'));

            await tourController.updateTour(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('deleteTourById', () => {
        it('should delete a tour successfully', async () => {
            const req = { params: { tourId: 1 } };
            const res = mockResponse();
            Tour.findByPk.mockResolvedValue({ tourId: 1, destroy: jest.fn() });

            await tourController.deleteTourById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                data: null,
                message: "Tour deleted successfully",
            });
        });

        it('should return 404 if tour is not found during deletion', async () => {
            const req = { params: { tourId: 2 } };
            const res = mockResponse();
            Tour.findByPk.mockResolvedValue(null);

            await tourController.deleteTourById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Tour not found" });
        });

        it('should handle database errors during deletion', async () => {
            const req = { params: { tourId: 1 } };
            const res = mockResponse();
            Tour.findByPk.mockResolvedValue({ tourId: 1, destroy: jest.fn().mockRejectedValue(new Error('Database error')) });

            await tourController.deleteTourById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
});