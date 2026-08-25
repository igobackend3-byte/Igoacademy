/**
 * Refund & Cancellation Policy — requirement doc Section 13, applicable per
 * the doc's own Section 1 scope note ("if online payment is enabled") —
 * payment.routes.js confirms Razorpay online payment IS already implemented.
 * DRAFT: standard template language — not legal advice, have a lawyer
 * review before publishing live, especially the refund window/amount.
 */
import { useNavigate } from 'react-router-dom';
import PublicNav from '@/components/layout/PublicNav';
import SEO from '@/components/common/SEO';
import { IGO_META } from '@/constants/brand';

const LAST_UPDATED = 'August 25, 2026';

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: '2.25rem' }}>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#0C2014', marginBottom: '.75rem' }}>
        {title}
      </h2>
      <div style={{ color: '#4C5B50', fontSize: '.95rem', lineHeight: 1.75 }}>
        {children}
      </div>
    </section>
  );
}

export default function RefundPolicy() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Manrope', sans-serif", background: '#F5F7F3' }}>
      <SEO
        title="Refund & Cancellation Policy — IGO Academy"
        description="IGO Academy's refund and cancellation policy for paid course enrollments."
        path="/refund-policy"
      />
      <PublicNav />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: '#0C2014', marginBottom: '.5rem' }}>
          Refund &amp; Cancellation Policy
        </h1>
        <p style={{ color: '#6b7280', fontSize: '.85rem', marginBottom: '2.5rem' }}>
          Last updated: {LAST_UPDATED}
        </p>

        <div style={{ background: '#FEF3C7', border: '1px solid rgba(217,119,6,.3)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '2rem', fontSize: '.85rem', color: '#92400e' }}>
          This policy applies to paid courses purchased online through the website/app. Free courses have no fee, so no
          refund applies. Enquiries made through the enquiry form are not a purchase — no payment is taken until you
          actively check out for a paid course.
        </div>

        <Section title="Eligibility for a refund">
          <p>
            If you enroll in a paid course and have not yet accessed any module content (video, PDF, live class, or
            assessment), you may request a full refund within 7 days of payment. Once module content has been accessed,
            or after 7 days from payment — whichever comes first — the enrollment is treated as consumed and is not
            eligible for a refund, except where required by law or at our discretion.
          </p>
        </Section>

        <Section title="How to request a refund">
          <p>
            Email <a href="mailto:igotnskills@gmail.com" style={{ color: '#3F8A24', fontWeight: 700 }}>igotnskills@gmail.com</a>{' '}
            with your registered email, the course name, and your Razorpay payment reference. We aim to respond within
            3 business days.
          </p>
        </Section>

        <Section title="Refund processing">
          <p>
            Approved refunds are issued to the original payment method via Razorpay and typically reflect within 5–10
            business days, depending on your bank or payment provider — this timeline is set by the banking network, not
            by us.
          </p>
        </Section>

        <Section title="Cancellations by IGO Academy">
          <p>
            If we cancel or are unable to deliver a course you've paid for (for example, a batch that doesn't reach
            minimum enrollment, or a course withdrawn from the catalog), you'll receive a full refund or, if you prefer,
            a transfer of your enrollment to an equivalent course.
          </p>
        </Section>

        <Section title="Non-refundable items">
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>Courses where module content has already been accessed, per the eligibility window above.</li>
            <li>Certificates already issued.</li>
            <li>Any convenience/payment-gateway fee charged separately by Razorpay, if applicable.</li>
          </ul>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about this policy — email{' '}
            <a href="mailto:igotnskills@gmail.com" style={{ color: '#3F8A24', fontWeight: 700 }}>igotnskills@gmail.com</a>,
            or write to {IGO_META.fullName}, Chennai, Tamil Nadu, India.
          </p>
        </Section>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: '1rem', background: 'transparent', border: '1.5px solid #4FA02E',
            color: '#3F8A24', padding: '.7rem 1.5rem', borderRadius: 50, fontWeight: 700,
            fontSize: '.9rem', cursor: 'pointer',
          }}
        >
          &larr; Back
        </button>
      </div>

      <footer style={{ background: '#0C2014', color: 'rgba(255,255,255,0.65)', textAlign: 'center', padding: '1.5rem 1rem', fontSize: '.82rem' }}>
        &copy; 2026 IGO Academy — An Unit of IGO GROUP. TNSDC + MSME Recognised | Chennai, Tamil Nadu
      </footer>
    </div>
  );
}
