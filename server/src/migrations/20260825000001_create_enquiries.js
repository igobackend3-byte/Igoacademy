/**
 * Migration: create `enquiries` — website lead-capture form submissions.
 * Requirement doc Section 7 (Lead Generation and WhatsApp) + Section 8
 * (Lead Management), 18 Aug 2026.
 */
exports.up = function (knex) {
  return knex.schema.createTable('enquiries', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 150).notNullable();
    table.string('mobile', 20).notNullable();
    table.string('email', 150).nullable();
    table.string('location', 150).nullable();
    table.uuid('course_id').nullable().references('id').inTable('courses').onDelete('SET NULL');
    table.string('course_interest_text', 200).nullable(); // fallback when course_id isn't known/selected
    table.string('candidate_type', 50).nullable();         // e.g. Farmer, Student, Entrepreneur, ...
    table.string('preferred_mode', 30).nullable();         // Online | Offline | Hybrid | Institutional
    table.text('message').nullable();

    table.string('source', 100).nullable();       // e.g. 'homepage', 'course_page', 'contact'
    table.string('landing_page', 300).nullable();
    table.string('campaign', 150).nullable();      // UTM campaign, if present

    table.string('status', 30).notNullable().defaultTo('New');
    // New -> Contacted -> Interested -> Follow-up -> Enrolled -> Not Interested -> Closed
    table.uuid('handled_by').nullable().references('id').inTable('users').onDelete('SET NULL');
    table.text('admin_notes').nullable();

    table.timestamps(true, true);

    table.index(['status']);
    table.index(['created_at']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('enquiries');
};
