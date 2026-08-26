/**
 * Disclaimer — requirement doc Section 13. Ties directly to Section 3's
 * instruction to avoid unrealistic income/employment/yield/business-success
 * claims — this page states that plainly rather than leaving it implicit.
 * DRAFT: standard template language — not legal advice, have a lawyer
 * review before publishing live.
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

export default function Disclaimer() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Manrope', sans-serif", background: '#F5F7F3' }}>
      <SEO
        title="Disclaimer — IGO Academy"
        description="Important disclaimers regarding training outcomes, career/placement support, and entrepreneurship guidance at IGO Academy."
        path="/disclaimer"
      />
      <PublicNav />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: '#0C2014', marginBottom: '.5rem' }}>
          Disclaimer
        </h1>
        <p style={{ color: '#6b7280', fontSize: '.85rem', marginBottom: '2.5rem' }}>
          Last updated: {LAST_UPDATED}
        </p>

        <Section title="Training and certification, not a guarantee of outcome">
          <p>
            IGO Academy provides agriculture skill-development training, practical/hands-on training, and certification.
            Certificates (where recognised by TNSDC and/or MSME) reflect successful completion of a course's modules and
            assessment — they are not a guarantee of employment, income, business success, or crop yield.
          </p>
        </Section>

        <Section title="Career, placement & entrepreneurship support">
          <p>
            Where a course offers internship exposure, career/placement guidance, or business/project-planning support for
            entrepreneurship, this is assistance and guidance only. We do not guarantee job offers, placement, income
            levels, or the commercial success of any farm or business a student sets up. Outcomes depend on factors
            outside our control, including individual effort, market conditions, weather, and local regulations.
          </p>
        </Section>

        <Section title="Agricultural outcomes vary">
          <p>
            Crop yield, livestock outcomes, and farm profitability depend on soil, climate, water availability, input
            quality, local market prices, and execution — factors that vary by location and are outside IGO Academy's
            control. Course content is educational and illustrative; it is not a guarantee of a specific yield or return.
          </p>
        </Section>

        <Section title="Third-party links and brands">
          <p>
            The website may reference or link to other IGO Group brands or third-party services (for example, the Razorpay
            payment gateway). We are not responsible for the content, policies, or practices of independently operated
            third-party sites.
          </p>
        </Section>

        <Section title="Not professional financial or legal advice">
          <p>
            Nothing on this website constitutes financial, investment, tax, or legal advice. Business-planning and
            entrepreneurship-support content is general guidance; consult a qualified professional before making financial
            or legal decisions for your enterprise.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about this disclaimer — email{' '}
            <a href="mailto:head@igoacademy.in" style={{ color: '#3F8A24', fontWeight: 700 }}>head@igoacademy.in</a>,
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
