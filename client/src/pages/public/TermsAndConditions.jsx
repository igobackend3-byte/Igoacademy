/**
 * Terms & Conditions — requirement doc Section 13 (Security and Compliance).
 * DRAFT: standard template language reflecting how this platform actually
 * works (enrollment, certification, payments via Razorpay). This is not
 * legal advice — have a lawyer review before publishing live.
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

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Manrope', sans-serif", background: '#F5F7F3' }}>
      <SEO
        title="Terms & Conditions — IGO Academy"
        description="The terms that govern your use of IGO Academy's website, courses, and certification."
        path="/terms-and-conditions"
      />
      <PublicNav />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: '#0C2014', marginBottom: '.5rem' }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ color: '#6b7280', fontSize: '.85rem', marginBottom: '2.5rem' }}>
          Last updated: {LAST_UPDATED}
        </p>

        <Section title="Acceptance of terms">
          <p>
            By accessing or using the IGO Academy website (igoacademy.in), mobile app, or any course, you agree to these
            Terms &amp; Conditions. IGO Academy is an Unit of IGO GROUP. If you do not agree, please do not use the platform.
          </p>
        </Section>

        <Section title="Who can use IGO Academy">
          <p>
            Our courses are intended for farmers, agriculture students and graduates, entrepreneurs, rural youth, FPO members,
            SHG members, working professionals and existing farm owners, generally aged 16 and above. Some courses may list
            additional eligibility criteria on their course page.
          </p>
        </Section>

        <Section title="Account registration">
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>You must provide accurate, current information when registering and keep your login credentials confidential.</li>
            <li>You are responsible for all activity that occurs under your account.</li>
            <li>We may suspend or terminate accounts that violate these terms or are used fraudulently.</li>
          </ul>
        </Section>

        <Section title="Courses, enrollment & access">
          <p>
            Course content, curriculum, batch schedules, trainers and fees shown on the platform are subject to change; we'll
            try to give reasonable notice for material changes. Free courses grant access immediately on enrollment. Paid
            courses grant access on successful payment. Course access may be time-limited as stated on the course page —
            an expired enrollment ends access to that course's video/module content, though issued certificates remain valid.
          </p>
        </Section>

        <Section title="Payments">
          <p>
            Payments for paid courses are processed through Razorpay, our third-party payment gateway. We do not store your
            card, UPI or bank account details. All fees are shown in Indian Rupees (₹) and are inclusive of applicable taxes
            unless stated otherwise. See our{' '}
            <a href="/refund-policy" style={{ color: '#3F8A24', fontWeight: 700 }}>Refund &amp; Cancellation Policy</a> for
            details on refunds.
          </p>
        </Section>

        <Section title="Certification">
          <p>
            Certificates are issued on successful completion of a course's modules and assessment requirements (typically a
            70%+ passing score, as specified per course). Certificates are recognised by TNSDC (Tamil Nadu Skill Development
            Corporation) and MSME (Ministry of MSME, Government of India) where stated on the specific course/certificate.
            Each certificate carries a unique QR code, independently verifiable at igoacademy.in/verify/&lt;certificateId&gt;.
          </p>
        </Section>

        <Section title="Internship, placement & entrepreneurship support">
          <p>
            Where a course includes internship exposure, career/placement guidance, or business/entrepreneurship support,
            this is guidance and facilitation — not a guarantee of internship placement, employment, income, or business
            outcome. Results depend on factors outside our control, including individual effort and market conditions.
          </p>
        </Section>

        <Section title="Acceptable use">
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>Don't share your account, resell access, or redistribute course videos/materials without permission.</li>
            <li>Don't attempt to disrupt, reverse-engineer, or gain unauthorised access to the platform.</li>
            <li>Don't submit false information in enquiry forms, registration, or assessments.</li>
          </ul>
        </Section>

        <Section title="Intellectual property">
          <p>
            Course content, videos, curriculum materials, the IGO Academy name, and logo are the property of IGO Academy /
            IGO GROUP or their licensors. You may use them for your personal learning only, not for commercial redistribution.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            IGO Academy provides training and certification on an "as available" basis. To the extent permitted by law, we are
            not liable for indirect or consequential losses arising from your use of the platform, including reliance on
            career, placement, or business outcomes discussed in course or marketing content.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these terms from time to time; the "Last updated" date above will reflect the latest revision.
            Continued use of the platform after a change constitutes acceptance of the revised terms.
          </p>
        </Section>

        <Section title="Governing law">
          <p>These terms are governed by the laws of India, with courts in Chennai, Tamil Nadu having jurisdiction.</p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about these terms — email{' '}
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
