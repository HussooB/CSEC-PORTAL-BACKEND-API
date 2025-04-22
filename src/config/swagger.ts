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
    components: {
      schemas: {
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              description: 'User email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123',
            },
            rememberMe: {
              type: 'boolean',
              description: 'Whether to remember the user for a longer session',
              example: true,
            },
          },
        },
        UserRegistration: {
          type: 'object',
          required: ['email', 'password', 'divisionId', 'groupId'],
          properties: {
            email: {
              type: 'string',
              description: 'User email',
              example: 'newuser@example.com',
            },
            password: {
              type: 'string',
              description: 'Generated password for the user',
              example: 'generatedPassword123',
            },
            divisionId: {
              type: 'string',
              description: 'ID of the division the user belongs to',
              example: '64b7f3e2c9a1f2a3b4c5d6e7',
            },
            groupId: {
              type: 'string',
              description: 'ID of the group the user belongs to',
              example: '64b7f3e2c9a1f2a3b4c5d6e8',
            },
          },
        },
        UserUpdate: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'Updated user email',
              example: 'updateduser@example.com',
            },
            divisionId: {
              type: 'string',
              description: 'Updated division ID',
              example: '64b7f3e2c9a1f2a3b4c5d6e7',
            },
            groupId: {
              type: 'string',
              description: 'Updated group ID',
              example: '64b7f3e2c9a1f2a3b4c5d6e8',
            },
          },
        },
        Division: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'Division name',
              example: 'Engineering',
            },
          },
        },
        DivisionUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Updated division name',
              example: 'Updated Engineering',
            },
          },
        },
        Event: {
          type: 'object',
          required: ['title', 'divisionId', 'startDate', 'endDate'],
          properties: {
            title: {
              type: 'string',
              description: 'Event title',
              example: 'Annual Meeting',
            },
            divisionId: {
              type: 'string',
              description: 'ID of the division',
              example: '64b7f3e2c9a1f2a3b4c5d6e7',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Start date of the event',
              example: '2025-05-01',
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'End date of the event',
              example: '2025-05-02',
            },
          },
        },
        Attendance: {
          type: 'object',
          required: ['sessionId', 'profileId', 'status'],
          properties: {
            sessionId: {
              type: 'string',
              description: 'ID of the session',
              example: '64b7f3e2c9a1f2a3b4c5d6e7',
            },
            profileId: {
              type: 'string',
              description: 'ID of the profile',
              example: '64b7f3e2c9a1f2a3b4c5d6e8',
            },
            status: {
              type: 'string',
              enum: ['present', 'absent', 'excused'],
              description: 'Attendance status',
              example: 'present',
            },
          },
        },
        Resource: {
          type: 'object',
          required: ['name', 'link'],
          properties: {
            name: {
              type: 'string',
              description: 'Resource name',
              example: 'Documentation',
            },
            link: {
              type: 'string',
              description: 'Resource link',
              example: 'https://example.com/resource',
            },
          },
        },
        HeadsUp: {
          type: 'object',
          required: ['type', 'reason'],
          properties: {
            type: {
              type: 'string',
              description: 'Type of heads-up',
              example: 'Excused Absence',
            },
            reason: {
              type: 'string',
              description: 'Reason for the heads-up',
              example: 'Medical emergency',
            },
          },
        },
        ProfileUpdate: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'Updated first name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Updated last name',
              example: 'Doe',
            },
            phoneNumber: {
              type: 'string',
              description: 'Updated phone number',
              example: '+1234567890',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to your route files
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);