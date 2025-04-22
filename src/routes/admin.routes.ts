import { Router } from 'express';
import {
  listHeads,
  assignHead,
  createRole,
  setRules
} from '../controllers/admin.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';

const router = Router();

/**
 * @swagger
 * /admin/heads:
 *   get:
 *     summary: List all division heads
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of division heads
 *       401:
 *         description: Unauthorized
 */
router.get('/heads', verifyToken, restrictTo('president'), listHeads);

/**
 * @swagger
 * /admin/heads:
 *   post:
 *     summary: Assign a division head
 *     tags: [Admin]
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
 *                 description: User ID
 *               divisionId:
 *                 type: string
 *                 description: Division ID
 *     responses:
 *       201:
 *         description: Division head assigned successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/heads', verifyToken, restrictTo('president'), assignHead);

/**
 * @swagger
 * /admin/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Role name
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of permissions
 *     responses:
 *       201:
 *         description: Role created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/roles', verifyToken, restrictTo('president'), createRole);

/**
 * @swagger
 * /admin/rules:
 *   post:
 *     summary: Set rules for the system
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxAbsences:
 *                 type: integer
 *                 description: Maximum allowed absences
 *               warningAfter:
 *                 type: integer
 *                 description: Number of absences after which a warning is issued
 *               suspendAfter:
 *                 type: integer
 *                 description: Number of absences after which suspension occurs
 *     responses:
 *       201:
 *         description: Rules set successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/rules', verifyToken, restrictTo('president'), setRules);

export default router;