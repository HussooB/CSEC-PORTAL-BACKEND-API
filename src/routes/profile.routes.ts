import express from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile details
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyToken, getProfile);

/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileUpdate'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', verifyToken, updateProfile);

export default router;