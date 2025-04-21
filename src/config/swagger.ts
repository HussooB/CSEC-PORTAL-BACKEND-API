import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSEC Portal API',
      version: '1.0.0',
      description: 'API documentation for the CSEC Portal Backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Replace with your base API URL
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your route files
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);