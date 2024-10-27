import request from 'supertest';
import server from './server';  // Your Express app
import pool from './db';  // Your database pool

jest.mock('./db');  // Mock the database connection

afterAll((done) => {
  server.close(done);  // Ensure the server is closed after tests
});

describe('GET /api/products', () => {
  afterEach(() => {
    jest.clearAllMocks();  // Clear mocks after each test
  });

  test('should return a list of products', async () => {
    // Mock the database query to return fake product data
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, name: 'Waffle with Berries', price: 6.50, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLWWia07XlYcaXwLB19f_GpalAihOtP2tuA&s' },
        { id: 2, name: 'Vanilla Bean Creme Brulee', price: 7.00, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUdZ7fq_lxzcCInZ7wz0I7ZGSVr3Avq-J9Kw&s' }
      ]
    });

    const response = await request(server).get('/api/products');
    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('name', 'Waffle with Berries');
  });

  test('should return 500 if the database query fails', async () => {
    // Mock the database query to throw an error
    pool.query.mockRejectedValue(new Error('Database query error'));

    const response = await request(server).get('/api/products');
    console.log(response);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Database query error');
  });
});