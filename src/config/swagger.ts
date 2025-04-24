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
        Event: {
          type: 'object',
          required: ['title', 'description', 'date', 'time'],
          properties: {
            title: {
              type: 'string',
              description: 'Event title',
              example: 'Annual Meeting',
            },
            description: {
              type: 'string',
              description: 'Event description',
              example: 'This is the annual meeting for all members.',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Event date',
              example: '2025-05-01',
            },
            time: {
              type: 'string',
              description: 'Event time',
              example: '10:00 AM',
            },
            location: {
              type: 'string',
              description: 'Event location',
              example: 'Main Hall',
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
        Session: {
          type: 'object',
          required: ['title', 'division', 'startMonth', 'endMonth'],
          properties: {
            title: {
              type: 'string',
              description: 'Session title',
              example: 'Spring 2025',
            },
            division: {
              type: 'string',
              description: 'Division ID',
              example: '64b7f3e2c9a1f2a3b4c5d6e7',
            },
            startMonth: {
              type: 'string',
              format: 'date',
              description: 'Start month of the session',
              example: '2025-01-01',
            },
            endMonth: {
              type: 'string',
              format: 'date',
              description: 'End month of the session',
              example: '2025-06-30',
            },
            day: {
              type: 'string',
              description: 'Day of the session',
              example: 'Monday',
            },
            startTime: {
              type: 'string',
              description: 'Start time of the session',
              example: '10:00 AM',
            },
            endTime: {
              type: 'string',
              description: 'End time of the session',
              example: '12:00 PM',
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
        Group: {
          type: 'object',
          required: ['name', 'division'],
          properties: {
            name: {
              type: 'string',
              description: 'Group name',
              example: 'Frontend Team',
            },
            division: {
              type: 'string',
              description: 'Division ID',
              example: '64b7f3e2c9a1f2a3b4c5d6e7',
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
        SessionUpdate: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Updated session title',
              example: 'Updated Spring 2025',
            },
            startMonth: {
              type: 'string',
              format: 'date',
              description: 'Updated start month',
              example: '2025-02-01',
            },
            endMonth: {
              type: 'string',
              format: 'date',
              description: 'Updated end month',
              example: '2025-07-31',
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