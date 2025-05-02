import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { validateMultipartBody } from '../middleware/validateMultipartBody';
import { userRegistrationSchema } from '../utils/validationSchemas/user.schema';
import { personalInfoSchema } from '../utils/validationSchemas/personalInfo.schema';
import {
  createUserAsPresident,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteUserCV,
  deleteUserProfilePicture,
  updateFullPersonalInfo,
  getLastSeen,
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
import { uploadCV, uploadProfilePicture, uploadFullInfo } from '../middleware/cloudinary';
import { rolePermissions } from '../utils/rolePermissions';

const router = Router();

/**
 * @swagger
 * /user/roles:
 *   get:
 *     summary: Get all user roles with permissions
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user roles with permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         example: "vice_president"
 *                       permissions:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["add members", "manage members", "schedule sessions", "create divisions"]
 *       401:
 *         description: Unauthorized
 */
// Define static routes first
router.get('/roles', verifyToken, restrictTo('president'), (_req, res, next) => {
  try {
    const roles: Array<'vice_president' | 'division_head'> = ['vice_president', 'division_head'];
    const rolesWithPermissions = roles.map((role) => ({
      role,
      permissions: rolePermissions[role] || [], // Fallback to an empty array
    }));

    res.status(200).json({ roles: rolesWithPermissions });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
// Define dynamic routes after static routes
router.get('/:id', verifyToken, getUserById);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, getAllUsers);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/register',
  verifyToken,
  restrictTo('president', 'division_head'),
  validateBody(userRegistrationSchema),
  createUserAsPresident
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', verifyToken, restrictTo('president', 'division_head'), updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', verifyToken, restrictTo('president'), deleteUser);

/**
 * @swagger
 * /user/update-full-info/{id}:
 *   put:
 *     summary: Submit or update full personal information including profile picture and CV
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: formData
 *         name: profile_picture
 *         type: file
 *         required: false
 *         description: Profile picture file
 *       - in: formData
 *         name: cv
 *         type: file
 *         required: false
 *         description: CV file
 *       - in: formData
 *         name: first_name
 *         type: string
 *       - in: formData
 *         name: last_name
 *         type: string
 *       - in: formData
 *         name: gender
 *         type: string
 *       - in: formData
 *         name: birth_date
 *         type: string
 *         format: date
 *       - in: formData
 *         name: phone_number
 *         type: string
 *       - in: formData
 *         name: github_handle
 *         type: string
 *       - in: formData
 *         name: telegram_handle
 *         type: string
 *       - in: formData
 *         name: department
 *         type: string
 *       - in: formData
 *         name: specialization
 *         type: string
 *       - in: formData
 *         name: graduation_year
 *         type: integer
 *       - in: formData
 *         name: university_id
 *         type: string
 *       - in: formData
 *         name: bio
 *         type: string
 *       - in: formData
 *         name: instagram_handle
 *         type: string
 *       - in: formData
 *         name: linkedin_handle
 *         type: string
 *       - in: formData
 *         name: leetcode_handle
 *         type: string
 *       - in: formData
 *         name: codeforce_handle
 *         type: string
 *       - in: formData
 *         name: resources
 *         type: string
 *         description: JSON stringified array of resources
 *     responses:
 *       200:
 *         description: Personal info updated
 *       404:
 *         description: User not found
 */
router.put(
  '/update-full-info/:id',
  verifyToken,
  uploadFullInfo,
  validateMultipartBody(personalInfoSchema),
  updateFullPersonalInfo
);

/**
 * @swagger
 * /user/{id}/last-seen:
 *   get:
 *     summary: Get the last seen time of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Last seen time of the user
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id/last-seen', verifyToken, getLastSeen);

export default router;