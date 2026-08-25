/**
 * Enquiry routes — website lead-capture form + admin lead management.
 * POST /api/enquiries            public — submit enquiry
 * GET  /api/enquiries            admin  — list / filter leads
 * PUT  /api/enquiries/:id/status admin  — update lead status
 */
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/enquiry.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');
const { validateRequest } = require('../middleware/validateRequest');

const createRules = [
  body('name').trim().notEmpty().isLength({ min: 2, max: 150 }).withMessage('Name is required'),
  body('mobile').trim().notEmpty().isLength({ min: 8, max: 20 }).withMessage('A valid mobile number is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Email looks invalid'),
  body('location').optional({ checkFalsy: true }).trim().isLength({ max: 150 }),
  body('course_id').optional({ checkFalsy: true }).isUUID().withMessage('Invalid course reference'),
  body('course_interest_text').optional({ checkFalsy: true }).trim().isLength({ max: 200 }),
  body('candidate_type').optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body('preferred_mode').optional({ checkFalsy: true }).trim().isLength({ max: 30 }),
  body('message').optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),
  body('recaptcha_token').optional({ checkFalsy: true }).isString().isLength({ max: 5000 }),
];

router.post('/', createRules, validateRequest, ctrl.create);

router.get('/', verifyToken, requireRole('admin'), ctrl.list);
router.put('/:id/status', verifyToken, requireRole('admin'),
  body('status').optional().isString(),
  body('admin_notes').optional().isString(),
  validateRequest, ctrl.updateStatus);

module.exports = router;
