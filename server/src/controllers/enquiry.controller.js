/**
 * Enquiry controller — public lead-capture form + admin lead management.
 * Requirement doc Sections 7 & 8, 18 Aug 2026.
 * @module controllers/enquiry
 */
const axios = require('axios');
const EnquiryModel = require('../models/enquiry.model');
const { createError } = require('../middleware/errorHandler');

/**
 * Requirement doc Section 13 — "CAPTCHA / anti-spam". This form already sits
 * behind the enquiryLimiter rate limit in index.js; reCAPTCHA v3 is layered
 * on top when configured. It intentionally fails OPEN (submission proceeds)
 * when RECAPTCHA_SECRET_KEY isn't set, matching how IGO_CONTACT.phone/whatsapp
 * are handled elsewhere — no real key is fabricated, and the site keeps
 * working on rate-limiting alone until one is supplied. Once
 * RECAPTCHA_SECRET_KEY *is* set, a missing/invalid token is rejected.
 */
async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // not configured yet — don't block real leads
  if (!token) return false;
  try {
    const { data } = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: { secret, response: token },
      timeout: 5000,
    });
    // v3 returns a 0–1 human-likelihood score; 0.5 is Google's own suggested cutoff
    return !!data.success && (data.score === undefined || data.score >= 0.5);
  } catch (e) {
    console.warn('[Enquiry] reCAPTCHA verification request failed:', e.message);
    return true; // don't let a Google outage block genuine leads
  }
}

/** POST /api/enquiries — public, no auth. Submits the website enquiry form. */
async function create(req, res, next) {
  try {
    const { recaptcha_token, ...body } = req.body;
    const humanOk = await verifyRecaptcha(recaptcha_token);
    if (!humanOk) throw createError('INVALID_INPUT', 'Spam check failed — please try again.');

    const row = await EnquiryModel.create({
      ...body,
      source:       body.source || 'website',
      landing_page: body.landing_page || req.get('referer') || null,
    });
    res.status(201).json({ success: true, data: row, error: null, message: 'Enquiry submitted — our team will reach out shortly.' });
  } catch (err) { next(err); }
}

/** GET /api/enquiries — admin only. Lead-management list with filters. */
async function list(req, res, next) {
  try {
    const { status, q, limit, offset } = req.query;
    const opts = {
      status: status || undefined,
      q:      q || undefined,
      limit:  limit ? Number(limit) : 100,
      offset: offset ? Number(offset) : 0,
    };
    const [rows, total] = await Promise.all([
      EnquiryModel.list(opts),
      EnquiryModel.count(opts),
    ]);
    res.json({ success: true, data: { rows, total }, error: null, message: 'OK' });
  } catch (err) { next(err); }
}

/** PUT /api/enquiries/:id/status — admin only. Updates lead status/notes. */
async function updateStatus(req, res, next) {
  try {
    const existing = await EnquiryModel.findById(req.params.id);
    if (!existing) throw createError('NOT_FOUND', 'Enquiry not found');

    const row = await EnquiryModel.updateStatus(req.params.id, {
      status:      req.body.status,
      admin_notes: req.body.admin_notes,
      handled_by:  req.user?.id,
    });
    res.json({ success: true, data: row, error: null, message: 'Enquiry updated' });
  } catch (err) {
    if (err.code === 'VALIDATION') {
      return res.status(400).json({ success: false, data: null, error: 'VALIDATION', message: err.message });
    }
    next(err);
  }
}

module.exports = { create, list, updateStatus };
