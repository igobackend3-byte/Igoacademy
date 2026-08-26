/**
 * SiteFooter — shared 4-column footer used across all public pages
 * (website refinement spec, Section 13 — Footer Structure).
 *
 * Columns: Brand · Quick Links · Contact · Follow Us, closed by a single
 * line establishing the IGO GROUP relationship.
 *
 * Social links below are placeholders (href="#") — swap in the real
 * Instagram / YouTube / LinkedIn / Facebook URLs once IGO Academy shares
 * them; until then they're inert rather than pointing anywhere wrong.
 */
import { useNavigate } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { IGO_META, IGO_CONTACT } from '@/constants/brand';

const QUICK_LINKS = [
  ['Programs', '/courses'],
  ['Workshops', '/workshops'],
  ['About Us', '/about'],
  ['Student Success', '/#student-success'],
  ['Contact', '/contact'],
];

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Youtube,   label: 'YouTube',   href: '#' },
  { Icon: Linkedin,  label: 'LinkedIn',  href: '#' },
  { Icon: Facebook,  label: 'Facebook',  href: '#' },
];

export default function SiteFooter() {
  const navigate = useNavigate();

  function goQuickLink(to) {
    if (to.startsWith('/#')) {
      const id = to.slice(2);
      if (window.location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      }
    } else {
      navigate(to);
    }
  }

  return (
    <footer style={{ background: '#0C2014', padding: '3.5rem 2rem 1.5rem' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

        {/* Brand */}
        <div>
          <img src="/igo-logo.png" alt="IGO Academy" style={{ height: 36, filter: 'brightness(0) invert(1)', marginBottom: '.75rem', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: '1rem', color: 'white', marginBottom: '.5rem' }}>
            IGO Academy
          </div>
          <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
            Practical. Professional. Future-Ready Agriculture Education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.2em', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
            Quick Links
          </div>
          {QUICK_LINKS.map(([label, to]) => (
            <div
              key={label}
              onClick={() => goQuickLink(to)}
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.83rem', cursor: 'pointer', marginBottom: '.6rem' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#DAA520'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.2em', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
            Contact
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '.6rem' }}>
            <Phone size={14} color="#DAA520" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', lineHeight: 1.5 }}>{IGO_CONTACT.phone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '.6rem' }}>
            <Mail size={14} color="#DAA520" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', lineHeight: 1.5 }}>{IGO_META.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <MapPin size={14} color="#DAA520" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', lineHeight: 1.5 }}>{IGO_META.address}</span>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <div style={{ fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.2em', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
            Follow Us
          </div>
          <div style={{ display: 'flex', gap: '.6rem' }}>
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                onClick={e => { if (href === '#') e.preventDefault(); }}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none', flexShrink: 0,
                }}
              >
                <Icon size={15} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '1.5rem', textAlign: 'center' }}>
        <div style={{ color: '#DAA520', fontSize: '.8rem', fontWeight: 700, marginBottom: '.4rem' }}>
          IGO Academy — A Unit of IGO GROUP
        </div>
        <div style={{ color: 'rgba(255,255,255,.28)', fontSize: '.72rem' }}>
          &copy; 2026 IGO Academy. TNSDC + MSME Recognised | Chennai, Tamil Nadu
        </div>
      </div>
    </footer>
  );
}
