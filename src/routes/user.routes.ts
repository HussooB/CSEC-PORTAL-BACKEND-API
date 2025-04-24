import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { userRegistrationSchema } from '../utils/validationSchemas/user.schema';
import {
  createUserAsPresident,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserProfilePicture,
  deleteUserProfilePicture,
  uploadUserCV,
  deleteUserCV
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
import { uploadProfilePicture, uploadCV } from '../middleware/cloudinary';

const router = Router();

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
router.get('/:id', verifyToken, getUserById);

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
 * /user/upload-profile-picture/{id}:
 *   put:
 *     summary: Upload user profile picture
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
 *         name: file
 *         type: file
 *         required: true
 *         description: Profile picture file (jpg, png)
 *     responses:
 *       200:
 *         description: Profile picture uploaded
 *       400:
 *         description: No file uploaded
 *       404:
 *         description: User not found
 */
router.put(
  '/upload-profile-picture/:id',
  verifyToken,
  uploadProfilePicture.single('file'),
  uploadUserProfilePicture
);

/**
 * @swagger
 * /user/upload-profile-picture/{id}:
 *   delete:
 *     summary: Delete user profile picture
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
 *         description: Profile picture deleted
 *       404:
 *         description: User not found
 */
router.delete(
  '/upload-profile-picture/:id',
  verifyToken,
  deleteUserProfilePicture
);

/**
 * @swagger
 * /user/upload-cv/{id}:
 *   put:
 *     summary: Upload user CV
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
 *         name: file
 *         type: file
 *         required: true
 *         description: CV file (pdf, doc, docx)
 *     responses:
 *       200:
 *         description: CV uploaded
 *       400:
 *         description: No file uploaded
 *       404:
 *         description: User not found
 */
router.put(
  '/upload-cv/:id',
  verifyToken,
  uploadCV.single('file'),
  uploadUserCV
);

/**
 * @swagger
 * /user/upload-cv/{id}:
 *   delete:
 *     summary: Delete user CV
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
 *         description: CV deleted
 *       404:
 *         description: User not found
 */
router.delete(
  '/upload-cv/:id',
  verifyToken,
  deleteUserCV
);

export default router;
