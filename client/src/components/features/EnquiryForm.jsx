/**
 * EnquiryForm — centralized lead-capture form (requirement doc Section 7).
 * Fields: Name, Mobile, Email, Location, Course Interested In, Candidate Type,
 * Preferred Learning Mode, Message. Posts to POST /api/enquiries (public).
 * Pass `fields` (array of the keys above) to render only a subset — e.g. the
 * Contact page's shorter form. Omit it and every field renders, unchanged.
 *
 * reCAPTCHA v3 (Section 13 "CAPTCHA / anti-spam") is wired but stays
 * completely inactive — no script loaded, no token sent — until a real
 * VITE_RECAPTCHA_SITE_KEY is set in the client's env. Same pattern as
 * IGO_CONTACT.phone/whatsapp: build the plumbing, never fabricate the key.
 * The matching server-side check lives in enquiry.controller.js.
 */
import { useState, useEffect } from 'react';
import api from '@/services/api';

const CANDIDATE_TYPES = ['Farmer', 'Agriculture Student', 'Agriculture Graduate', 'Entrepreneur', 'Rural Youth', 'FPO Member', 'SHG Member', 'Working Professional', 'Student', 'Existing Farm Owner', 'Other'];
const LEARNING_MODES = ['Online', 'Offline', 'Hybrid', 'Institutional / Corporate'];
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

// All fields the form can render. Callers that don't pass `fields` get every
// one of these (unchanged default behavior); passing a subset (e.g. the
// Contact page's shorter form) hides the rest without touching this list.
const ALL_FIELDS = ['name', 'mobile', 'email', 'location', 'course_interest_text', 'candidate_type', 'preferred_mode', 'message'];

/** Loads Google's reCAPTCHA v3 script once and resolves when window.grecaptcha is ready. */
let recaptchaLoadPromise = null;
function loadRecaptcha() {
  if (!RECAPTCHA_SITE_KEY) return Promise.resolve(false);
  if (window.grecaptcha) return Promise.resolve(true);
  if (recaptchaLoadPromise) return recaptchaLoadPromise;
  recaptchaLoadPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
  return recaptchaLoadPromise;
}

const inputStyle = {
  width: '100%', padding: '.75rem 1rem', borderRadius: 12,
  border: '1.5px solid rgba(0,0,0,.1)', fontSize: '.9rem',
  fontFamily: "'Manrope', sans-serif", color: '#0C2014',
  background: 'white', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: '.78rem', fontWeight: 700, color: '#4C5B50', marginBottom: '.4rem' };

export default function EnquiryForm({ courseId, courseTitle, source = 'homepage', compact = false, fields = ALL_FIELDS, messagePlaceholder = "Tell us what you'd like to know…" }) {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', location: '',
    course_interest_text: courseTitle || '', candidate_type: '', preferred_mode: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const show = (key) => fields.includes(key);

  // Pre-load the reCAPTCHA script as soon as the form mounts (no-op if no site key set)
  useEffect(() => { loadRecaptcha(); }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      let recaptcha_token;
      if (RECAPTCHA_SITE_KEY) {
        const ready = await loadRecaptcha();
        if (ready && window.grecaptcha) {
          recaptcha_token = await new Promise((resolve) => {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'enquiry_submit' }).then(resolve).catch(() => resolve(undefined));
            });
          });
        }
      }
      await api.post('/enquiries', {
        ...form,
        course_id: courseId || undefined,
        source,
        landing_page: window.location.pathname,
        recaptcha_token,
      });
      setStatus('success');
      setForm({ name: '', mobile: '', email: '', location: '', course_interest_text: '', candidate_type: '', preferred_mode: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.message || 'Something went wrong — please try again or contact us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.75rem' }}>✅</div>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: '#0C2014', marginBottom: '.5rem' }}>Thank you!</h3>
        <p style={{ color: '#4C5B50', fontSize: '.9rem' }}>Your enquiry has been received. Our team will get back to you shortly.</p>
        <button className="btn-outline btn-sm" style={{ width: 'auto', marginTop: '1.25rem' }} onClick={() => setStatus('idle')}>
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
      {show('name') && (
        <div>
          <label style={labelStyle}>Name *</label>
          <input style={inputStyle} required maxLength={150} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
        </div>
      )}
      {show('mobile') && (
        <div>
          <label style={labelStyle}>Mobile Number *</label>
          <input style={inputStyle} required maxLength={20} value={form.mobile} onChange={e => update('mobile', e.target.value)} placeholder="+91 XXXXXXXXXX" />
        </div>
      )}
      {show('email') && (
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" maxLength={150} value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
        </div>
      )}
      {show('location') && (
        <div>
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} maxLength={150} value={form.location} onChange={e => update('location', e.target.value)} placeholder="City / District" />
        </div>
      )}
      {show('course_interest_text') && (
        <div>
          <label style={labelStyle}>Course Interested In</label>
          <input style={inputStyle} maxLength={200} value={form.course_interest_text} onChange={e => update('course_interest_text', e.target.value)} placeholder="e.g. Polyhouse & Hydroponics" />
        </div>
      )}
      {show('candidate_type') && (
        <div>
          <label style={labelStyle}>Candidate Type</label>
          <select style={inputStyle} value={form.candidate_type} onChange={e => update('candidate_type', e.target.value)}>
            <option value="">Select…</option>
            {CANDIDATE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}
      {show('preferred_mode') && (
        <div style={{ gridColumn: compact ? 'auto' : '1 / -1' }}>
          <label style={labelStyle}>Preferred Learning Mode</label>
          <select style={inputStyle} value={form.preferred_mode} onChange={e => update('preferred_mode', e.target.value)}>
            <option value="">Select…</option>
            {LEARNING_MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}
      {show('message') && (
        <div style={{ gridColumn: compact ? 'auto' : '1 / -1' }}>
          <label style={labelStyle}>Message</label>
          <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} maxLength={2000} value={form.message} onChange={e => update('message', e.target.value)} placeholder={messagePlaceholder} />
        </div>
      )}

      {status === 'error' && (
        <div style={{ gridColumn: compact ? 'auto' : '1 / -1', color: '#DC2626', fontSize: '.82rem', fontWeight: 600 }}>{error}</div>
      )}

      <div style={{ gridColumn: compact ? 'auto' : '1 / -1' }}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary"
          style={{ width: '100%', padding: '.9rem', fontWeight: 800, fontSize: '.9rem', borderRadius: 12 }}
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Enquiry'}
        </button>
      </div>
    </form>
  );
}
