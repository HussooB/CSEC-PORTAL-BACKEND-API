import { Router } from 'express';
import { getAllHeads, assignHead, deleteHead } from '../controllers/head.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';

const router = Router();

/**
 * @swagger
 * /head:
 *   get:
 *     summary: Get all division heads
 *     tags: [Heads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of division heads
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, restrictTo('president', 'vice_president'), getAllHeads);

/**
 * @swagger
 * /head:
 *   post:
 *     summary: Assign a new head
 *     tags: [Heads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to assign as head
 *               divisionId:
 *                 type: string
 *                 description: ID of the division
 *               role:
 *                 type: string
 *                 enum: [division_head, coordinator]
 *                 description: Role to assign
 *     responses:
 *       200:
 *         description: Head assigned successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, restrictTo('president'), assignHead);

/**
 * @swagger
 * /head/{userId}:
 *   delete:
 *     summary: Delete a head and revert their role to member
 *     tags: [Heads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete as head
 *     responses:
 *       200:
 *         description: Head deleted and role reverted to member
 *       404:
 *         description: Head or user not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:userId', verifyToken, restrictTo('president'), deleteHead);

export default router;