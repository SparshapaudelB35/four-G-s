const request = require('supertest');
const app = require('../index');

// Define API endpoints as constants for reusability
const TOUR_API_BASE = '/api/tour';
const CREATE_TOUR_ENDPOINT = `${TOUR_API_BASE}/createTour`;
const GET_ALL_TOURS_ENDPOINT = `${TOUR_API_BASE}/getAllTours`;
const GET_TOUR_BY_ID_ENDPOINT = (id) => `${TOUR_API_BASE}/${id}`;
const UPDATE_TOUR_ENDPOINT = (id) => `${TOUR_API_BASE}/${id}`;
const DELETE_TOUR_ENDPOINT = (id) => `${TOUR_API_BASE}/${id}`;

describe('Tour API Endpoints', () => {
    let tourId;

    it('should create a tour successfully', async () => {
        const res = await request(app)
            .post(CREATE_TOUR_ENDPOINT)
            .send({
                name: 'Test Tour',
                contactNumber: '9848843423744',
                numberOfPassengers: 13,
                destination: 'Nowhere',
                startDate: '2024-03-20',
                endDate: '2024-03-30',
                totalPrice: 20000,
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('tourId'); // Ensure the response contains the created tour's ID
        tourId = res.body.tourId; // Store the tour ID for subsequent tests
    });

    it('should return all tours successfully', async () => {
        const res = await request(app).get(GET_ALL_TOURS_ENDPOINT);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); // Ensure the response is an array
        expect(res.body.length).toBeGreaterThan(0); // Ensure at least one tour exists
    });

    it('should get a tour by ID successfully', async () => {
        const res = await request(app).get(GET_TOUR_BY_ID_ENDPOINT(tourId));

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('tourId', tourId); // Ensure the correct tour is returned
        expect(res.body).toHaveProperty('name', 'Test Tour'); // Validate the tour's name
    });

    it('should update a tour successfully', async () => {
        const updatedData = {
            name: 'Updated Test Tour',
            contactNumber: '9848843744',
            numberOfPassengers: 5,
            destination: 'Somewhere Else',
            startDate: '2024-04-01',
            endDate: '2024-04-10',
            totalPrice: 25000,
        };

        const res = await request(app)
            .put(UPDATE_TOUR_ENDPOINT(tourId))
            .send(updatedData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Tour updated successfully'); // Validate success message
        expect(res.body.data).toHaveProperty('name', updatedData.name); // Validate updated fields
    });

    it('should delete a tour successfully', async () => {
        const res = await request(app).delete(DELETE_TOUR_ENDPOINT(tourId));

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Tour deleted successfully'); // Validate success message
    });

    it('should return 404 if tour not found during GET', async () => {
        const nonExistentTourId = 9999;
        const res = await request(app).get(GET_TOUR_BY_ID_ENDPOINT(nonExistentTourId));

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Tour not found'); // Validate error message
    });

    it('should return 404 if tour not found during UPDATE', async () => {
        const nonExistentTourId = 9999;
        const res = await request(app)
            .put(UPDATE_TOUR_ENDPOINT(nonExistentTourId))
            .send({ name: 'Nonexistent Tour' });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Tour not found'); // Validate error message
    });

    it('should return 404 if tour not found during DELETE', async () => {
        const nonExistentTourId = 9999;
        const res = await request(app).delete(DELETE_TOUR_ENDPOINT(nonExistentTourId));

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Tour not found'); // Validate error message
    });

    it('should handle invalid input during creation', async () => {
        const res = await request(app)
            .post(CREATE_TOUR_ENDPOINT)
            .send({}); // Missing required fields

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Missing required fields'); // Validate error message
    });
});