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
        // Existing schemas
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
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '64b7f3e2c9a1f2a3b4c5d6e7',
            },
            email: {
              type: 'string',
              description: 'User email',
              example: 'user@example.com',
            },
            role: {
              type: 'string',
              description: 'User role',
              enum: ['super_admin', 'president', 'division_head', 'member'],
              example: 'member',
            },
            personal_info: {
              type: 'object',
              properties: {
                first_name: {
                  type: 'string',
                  description: 'First name of the user',
                  example: 'John',
                },
                last_name: {
                  type: 'string',
                  description: 'Last name of the user',
                  example: 'Doe',
                },
                profile_picture: {
                  type: 'string',
                  description: 'URL of the user\'s profile picture',
                  example: 'https://example.com/profile.jpg',
                },
                cv_link: {
                  type: 'string',
                  description: 'URL of the user\'s CV',
                  example: 'https://example.com/cv.pdf',
                },
              },
            },
            profile_list: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of profile IDs associated with the user',
            },
            current_profile_id: {
              type: 'string',
              description: 'Currently active profile ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
              example: '2025-04-24T07:53:17.108Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User update timestamp',
              example: '2025-04-24T07:53:17.108Z',
            },
          },
        },
        ProfileCreate: {
          type: 'object',
          required: ['user', 'division'],
          properties: {
            user: { type: 'string', example: '64b7f3e2c9a1f2a3b4c5d6e7' },
            division: { type: 'string', example: '64b7f3e2c9a1f2a3b4c5d6e8' },
            group: { type: 'string', example: 'Frontend Team' },
            mentor: { type: 'string', example: '64b7f3e2c9a1f2a3b4c5d6e9' },
          },
        },
        Profile: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            division: { $ref: '#/components/schemas/Division' },
            group: { type: 'string' },
            joining_date: { type: 'string', format: 'date-time' },
            status: { type: 'string', enum: ['active', 'past'] },
          },
        },
        Notification: {
          type: 'object',
          properties: {
            user: { type: 'string' },
            content: { type: 'string' },
            read: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Contribution: {
          type: 'object',
          properties: {
            profile: { type: 'string' },
            type: { type: 'string', enum: ['document', 'code', 'idea'] },
            description: { type: 'string' },
            submitted_at: { type: 'string', format: 'date-time' },
          },
        },
        AttendanceStatus: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['Active', 'Needs Attention', 'Inactive'] },
            absencesCount: { type: 'integer' },
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