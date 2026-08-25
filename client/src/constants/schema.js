/**
 * JSON-LD schema builders — only real, verifiable facts about the platform.
 * No fabricated review counts, ratings, or social profile links.
 */

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'IGO Academy',
  url: 'https://igoacademy.in',
  logo: 'https://igoacademy.in/igo-logo.png',
  description: "India's agriculture skill-development, practical training, career and entrepreneurship platform — TNSDC and MSME recognised certification for students, farmers and entrepreneurs.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'IGO Group',
  },
};

export const HOME_FAQS = [
  {
    question: 'Who can join IGO Academy courses?',
    answer: 'Our courses are open to farmers, agriculture students and graduates, entrepreneurs, rural youth, FPO members, SHGs, working professionals and existing farm owners — most courses have no strict academic prerequisite beyond what is listed on the individual course page.',
  },
  {
    question: 'Is the training practical or only online theory?',
    answer: 'Both. Every course pairs online / classroom learning with hands-on practical training — polyhouse, hydroponics, vertical farming, mushroom, microgreens, nursery, open cultivation, irrigation and farm operations — depending on the course.',
  },
  {
    question: 'Is IGO Academy certification government-recognised?',
    answer: 'Yes. IGO Academy courses are recognised by TNSDC (Tamil Nadu Skill Development Corporation) and certified by MSME (Ministry of MSME, Government of India).',
  },
  {
    question: 'How do I get my certificate after finishing a course?',
    answer: 'Complete all course modules and pass the final assessment with 70% or higher — your QR-verified digital certificate unlocks instantly for download.',
  },
  {
    question: "Can I verify someone's IGO Academy certificate?",
    answer: 'Yes. Every certificate has a unique QR code and can be independently verified at igoacademy.in/verify/{certificateId}.',
  },
  {
    question: 'What does a course cost, and how do I pay?',
    answer: 'Fees vary by course and are shown on each course page. Use the Enquire Now button or contact us directly for current fees, upcoming batch dates and payment options.',
  },
  {
    question: 'Does IGO Academy help with internship or placement after the course?',
    answer: 'Yes. Eligible courses include internship exposure and career/placement support guidance — see the course page and our Career & Placement section for details. This is guidance and support, not a guaranteed job offer.',
  },
  {
    question: 'Can IGO Academy help me start my own farm business?',
    answer: 'Yes. Alongside training and certification, we offer business and project-planning guidance for students who want to set up their own agri-enterprise — see our Entrepreneurship section.',
  },
  {
    question: 'How do I register for a course?',
    answer: 'Click Enquire Now or Explore Courses, pick a course, and either register online or reach out via WhatsApp/phone/enquiry form and our team will guide you through enrolment.',
  },
  {
    question: 'Is IGO Academy connected to other IGO Group businesses?',
    answer: 'Yes. IGO Academy is the education arm of the IGO Group, a network of 7 divisions and 26 brands working across Indian agriculture.',
  },
];

export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/** Single Course JSON-LD for the public course-detail page (Section 5 / Section 11). */
export function buildCourseSchema(course) {
  if (!course) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.short_description || course.description || undefined,
    provider: { '@type': 'Organization', name: 'IGO Academy', sameAs: 'https://igoacademy.in' },
  };
}

export function buildCourseListSchema(courses = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.title,
        description: c.short_description || c.description || undefined,
        provider: { '@type': 'Organization', name: 'IGO Academy', sameAs: 'https://igoacademy.in' },
      },
    })),
  };
}
