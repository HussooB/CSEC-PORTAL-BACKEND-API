import { Router } from 'express';
import { 
  createContribution,
  getContributionsByProfile 
} from '../controllers/contribution.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /contributions:
 *   post:
 *     summary: Create a new contribution
 *     tags: [Contributions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the contribution
 *                 example: "New Feature"
 *               description:
 *                 type: string
 *                 description: Description of the contribution
 *                 example: "Implemented a new feature for the project"
 *               profile:
 *                 type: string
 *                 description: Profile ID associated with the contribution
 *                 example: "680a9a2b9e86262d7c618bce"
 *     responses:
 *       201:
 *         description: Contribution created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contribution'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, createContribution);

/**
 * @swagger
 * /contributions/{profileId}:
 *   get:
 *     summary: Get contributions by profile ID
 *     tags: [Contributions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID to fetch contributions for
 *         example: "680a9a2b9e86262d7c618bce"
 *     responses:
 *       200:
 *         description: List of contributions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contribution'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.get('/:profileId', verifyToken, getContributionsByProfile);

export default router;