/**
 * Enquiry model — website lead-capture (enquiry form) DB operations.
 * @module models/enquiry
 */
const { db } = require('../config/db');

const VALID_STATUSES = ['New', 'Contacted', 'Interested', 'Follow-up', 'Enrolled', 'Not Interested', 'Closed'];

/** Create a new enquiry (public form submission). */
async function create(data) {
  const [row] = await db('enquiries').insert({
    name:                 data.name,
    mobile:               data.mobile,
    email:                data.email || null,
    location:             data.location || null,
    course_id:            data.course_id || null,
    course_interest_text: data.course_interest_text || null,
    candidate_type:       data.candidate_type || null,
    preferred_mode:       data.preferred_mode || null,
    message:              data.message || null,
    source:               data.source || null,
    landing_page:         data.landing_page || null,
    campaign:             data.campaign || null,
    status:               'New',
  }).returning('*');
  return row;
}

/** List enquiries for the admin lead-management view, newest first. */
async function list({ status, q, limit = 100, offset = 0 } = {}) {
  const query = db('enquiries as e')
    .leftJoin('courses as c', 'e.course_id', 'c.id')
    .select(
      'e.*',
      'c.title as course_title',
    )
    .orderBy('e.created_at', 'desc')
    .limit(limit)
    .offset(offset);

  if (status) query.where('e.status', status);
  if (q) {
    query.where((builder) => {
      builder.whereILike('e.name', `%${q}%`)
        .orWhereILike('e.mobile', `%${q}%`)
        .orWhereILike('e.email', `%${q}%`);
    });
  }
  return query;
}

async function count({ status, q } = {}) {
  const query = db('enquiries').count('* as count').first();
  if (status) query.where('status', status);
  if (q) {
    query.where((builder) => {
      builder.whereILike('name', `%${q}%`)
        .orWhereILike('mobile', `%${q}%`)
        .orWhereILike('email', `%${q}%`);
    });
  }
  const row = await query;
  return Number(row?.count || 0);
}

async function findById(id) {
  return db('enquiries').where({ id }).first();
}

async function updateStatus(id, { status, admin_notes, handled_by }) {
  if (status && !VALID_STATUSES.includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    err.code = 'VALIDATION';
    throw err;
  }
  const patch = { updated_at: db.fn.now() };
  if (status !== undefined) patch.status = status;
  if (admin_notes !== undefined) patch.admin_notes = admin_notes;
  if (handled_by !== undefined) patch.handled_by = handled_by;

  const [row] = await db('enquiries').where({ id }).update(patch).returning('*');
  return row;
}

module.exports = { create, list, count, findById, updateStatus, VALID_STATUSES };
