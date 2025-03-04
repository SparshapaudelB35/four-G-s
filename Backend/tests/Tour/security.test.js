const request = require('supertest');
const app = require('../index');

describe('Security Tests', () => {
    // Helper function to create a base tour payload
    const createTourPayload = (overrides = {}) => ({
        name: 'Test Tour',
        contactNumber: '9848843744',
        numberOfPassengers: 1,
        destination: 'Nowhere',
        startDate: '2024-03-20',
        endDate: '2024-03-30',
        totalPrice: 20000,
        ...overrides, // Allow overriding specific fields
    });

    it('should prevent SQL Injection', async () => {
        const maliciousInput = "' OR 1=1 --"; // Example of SQL injection attempt
        const res = await request(app)
            .post('/api/tour/createTour')
            .send(createTourPayload({ name: maliciousInput }));

        expect(res.status).toBe(400); // Expect validation error or rejection
        expect(res.body).toHaveProperty('message'); // Ensure an error message is returned
        expect(res.body.message).not.toContain(maliciousInput); // Ensure malicious input is not echoed back
    });

    it('should prevent XSS attacks', async () => {
        const maliciousInput = "<script>alert('XSS')</script>"; // Example of XSS attack
        const res = await request(app)
            .post('/api/tour/createTour')
            .send(createTourPayload({ name: maliciousInput }));

        expect(res.status).toBe(400); // Expect validation error or rejection
        expect(res.body).toHaveProperty('message'); // Ensure an error message is returned
        expect(res.body.message).not.toContain(maliciousInput); // Ensure malicious input is not echoed back
    });

    it('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/api/unknown');

        expect(res.status).toBe(404); // Expect a 404 status code for unknown routes
        expect(res.body).toHaveProperty('message', 'Route not found'); // Validate error message
    });

    it('should sanitize user input', async () => {
        const potentiallyMaliciousInput = '<b>bold text</b>'; // Example of HTML input
        const res = await request(app)
            .post('/api/tour/createTour')
            .send(createTourPayload({ name: potentiallyMaliciousInput }));

        expect(res.status).toBe(201); // Expect successful creation if sanitization works
        expect(res.body.name).not.toContain('<b>'); // Ensure HTML tags are removed or escaped
        expect(res.body.name).not.toContain('</b>');
    });

    it('should enforce proper data validation', async () => {
        const invalidPayload = createTourPayload({
            name: '', // Empty name
            contactNumber: 'invalid-contact', // Invalid contact number
            numberOfPassengers: -5, // Negative passengers
            startDate: 'invalid-date', // Invalid date
            totalPrice: -1000, // Negative price
        });

        const res = await request(app)
            .post('/api/tour/createTour')
            .send(invalidPayload);

        expect(res.status).toBe(400); // Expect validation error
        expect(res.body).toHaveProperty('message'); // Ensure an error message is returned
        expect(res.body.message).toContain('Validation failed'); // Validate error message
    });
});