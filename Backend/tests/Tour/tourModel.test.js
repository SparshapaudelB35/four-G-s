const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

// Define the mocked Tour model
const TourMock = dbMock.define('Tour', {
    tourId: 1,
    name: 'test',
    contactNumber: '9848843744', // Use string for consistency with schema
    numberOfPassengers: 1,
    destination: 'nowhere',
    startDate: '2024-03-20', // ISO date string
    endDate: '2024-03-30',   // ISO date string
    totalPrice: 20000
});

describe('Tour Model', () => {
    it('should create a tour with valid data', async () => {
        const tour = await TourMock.create({
            name: 'new test',
            contactNumber: '9848843423744', // String for consistency
            numberOfPassengers: 13,
            destination: 'nowfewwhereffwe',
            startDate: '2024-03-20', // ISO date string
            endDate: '2024-03-30',   // ISO date string
            totalPrice: 2000023
        });

        // Validate the created tour's properties
        expect(tour.name).toBe('new test');
        expect(tour.contactNumber).toBe('9848843423744'); // String comparison
        expect(tour.numberOfPassengers).toBe(13);
        expect(tour.destination).toBe('nowfewwhereffwe');
        expect(tour.startDate).toBe('2024-03-20');
        expect(tour.endDate).toBe('2024-03-30');
        expect(tour.totalPrice).toBe(2000023);
    });

    it('should require all required fields', async () => {
        try {
            await TourMock.create({}); // Attempt to create a tour without required fields
            throw new Error("Expected validation error but none was thrown");
        } catch (error) {
            expect(error.message).toContain("expected"); // Adjust based on Sequelize's error message
        }
    });

    it('should reject invalid contact number', async () => {
        try {
            await TourMock.create({
                name: 'test',
                contactNumber: 'invalid-contact', // Invalid contact number
                numberOfPassengers: 5,
                destination: 'somewhere',
                startDate: '2024-03-20',
                endDate: '2024-03-30',
                totalPrice: 10000
            });
            throw new Error("Expected validation error but none was thrown");
        } catch (error) {
            expect(error.message).toContain("Invalid contact number");
        }
    });

    it('should reject invalid date range', async () => {
        try {
            await TourMock.create({
                name: 'test',
                contactNumber: '9848843744',
                numberOfPassengers: 5,
                destination: 'somewhere',
                startDate: '2024-03-30', // Start date after end date
                endDate: '2024-03-20',
                totalPrice: 10000
            });
            throw new Error("Expected validation error but none was thrown");
        } catch (error) {
            expect(error.message).toContain("Invalid date range");
        }
    });

    it('should reject non-positive number of passengers', async () => {
        try {
            await TourMock.create({
                name: 'test',
                contactNumber: '9848843744',
                numberOfPassengers: -5, // Negative number of passengers
                destination: 'somewhere',
                startDate: '2024-03-20',
                endDate: '2024-03-30',
                totalPrice: 10000
            });
            throw new Error("Expected validation error but none was thrown");
        } catch (error) {
            expect(error.message).toContain("Number of passengers must be a positive integer");
        }
    });

    it('should reject negative total price', async () => {
        try {
            await TourMock.create({
                name: 'test',
                contactNumber: '9848843744',
                numberOfPassengers: 5,
                destination: 'somewhere',
                startDate: '2024-03-20',
                endDate: '2024-03-30',
                totalPrice: -10000 // Negative total price
            });
            throw new Error("Expected validation error but none was thrown");
        } catch (error) {
            expect(error.message).toContain("Total price must be a positive number");
        }
    });
});