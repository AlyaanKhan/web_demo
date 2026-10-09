import type { LucideIcon } from 'lucide-react'
import {
  Award,
  ChartLine,
  Gauge,
  HeartPulse,
  Lock,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  Users,
  Workflow,
} from 'lucide-react'

// All content below is demo data except the platform list (from the business model doc).

export const PLATFORMS = [
  { name: 'TherapyNotes', category: 'Behavioral EHR', initials: 'TN', color: '#2f6fd1' },
  { name: 'AdvancedMD', category: 'Practice management', initials: 'AM', color: '#d9541e' },
  { name: 'Practice Fusion', category: 'Cloud EHR', initials: 'PF', color: '#1aa37a' },
  { name: 'Valant', category: 'Behavioral EHR', initials: 'VA', color: '#6a4bc4' },
  { name: 'Tebra', category: 'Practice growth', initials: 'TB', color: '#0f7c7a' },
  { name: 'TherapyAppointment', category: 'Scheduling & billing', initials: 'TA', color: '#e0a21b' },
  { name: 'SimplePractice', category: 'Practice management', initials: 'SP', color: '#2a294d' },
  { name: 'Myriad Systems', category: 'Billing platform', initials: 'MS', color: '#c43b6b' },
] as const

export const HERO_STATS = [
  { value: 98, suffix: '%', label: 'Collection efficiency' },
  { value: 30, suffix: '%', label: 'Faster reimbursements' },
  { value: 45, suffix: '%', label: 'Fewer denials' },
  { value: 120, prefix: '$', suffix: 'M+', label: 'Claims managed yearly' },
] as const

export const PILLARS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, title: 'Precision workflows', text: 'Specialised financial workflows tailored to your speciality, payer mix and EHR.' },
  { icon: Search, title: 'Meticulous auditing', text: 'Every claim, code and payment is double-checked. Nothing slips through.' },
  { icon: ChartLine, title: 'Transparent reporting', text: 'Live dashboards and monthly reviews show exactly where every dollar stands.' },
  { icon: Lock, title: 'HIPAA-aligned security', text: 'Encrypted access, BAAs and role-based controls protect patient data.' },
]

export const PROCESS: { icon: LucideIcon; title: string; text: string; duration: string }[] = [
  { icon: Search, title: 'Free revenue audit', text: 'We analyse 90 days of claims to uncover denials, leakage and missed charges.', duration: 'Week 1' },
  { icon: Workflow, title: 'Seamless onboarding', text: 'We connect to your EHR and clearinghouse, with no disruption to your schedule.', duration: 'Week 2' },
  { icon: Rocket, title: 'Optimise & submit', text: 'Clean claims go out daily, while denials are worked and A/R is cleared.', duration: 'Week 3+' },
  { icon: Gauge, title: 'Report & grow', text: 'Monthly reviews with KPIs, benchmarks and a clear plan for what comes next.', duration: 'Ongoing' },
]

export const COMPARISON = [
  { label: 'Certified billing & coding specialists', inHouse: 'partial', sfe: true },
  { label: 'Claims submitted within 24 hours', inHouse: false, sfe: true },
  { label: 'Dedicated denial management team', inHouse: false, sfe: true },
  { label: 'Real-time revenue dashboards', inHouse: false, sfe: true },
  { label: 'Coverage during staff PTO & turnover', inHouse: false, sfe: true },
  { label: 'Fixed, predictable cost', inHouse: false, sfe: true },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'Within 90 days our denial rate dropped from 14% to under 4%. Strategies for Excellence found revenue we didn’t even know we were leaving on the table.',
    name: 'Dr. Rachel Morgan',
    role: 'Medical Director, Cedar Ridge Family Medicine',
    avatar: '/images/avatar-f1.jpg',
    metric: '+$184K recovered',
  },
  {
    quote:
      'Our virtual office manager feels like part of the team. Scheduling, phones and follow-ups simply run, and our front desk finally has room to breathe.',
    name: 'James Carter',
    role: 'Practice Owner, Brightline Behavioral Health',
    avatar: '/images/avatar-m1.jpg',
    metric: '22 hrs saved / week',
  },
  {
    quote:
      'Dental billing is notoriously complex. Their team handles narratives, attachments and secondaries flawlessly. Our collections are up nearly a third.',
    name: 'Dr. Aisha Patel, DDS',
    role: 'Founder, Lumen Dental Studio',
    avatar: '/images/avatar-f3.jpg',
    metric: '+31% collections',
  },
  {
    quote:
      'The transparency is what sold me. I can see every claim, every dollar and every trend in one place, and the monthly reviews are genuinely useful.',
    name: 'Michael Hughes',
    role: 'CFO, Northwind Orthopedics',
    avatar: '/images/avatar-m3.jpg',
    metric: '18 days → 9 days A/R',
  },
  {
    quote:
      'They switched us over from our old biller without a single missed claim. Professional, responsive and genuinely invested in our success.',
    name: 'Emily Sanders, LPC',
    role: 'Clinical Director, Harbor Counseling Group',
    avatar: '/images/avatar-f2.jpg',
    metric: 'Zero-gap transition',
  },
] as const

export const TEAM = [
  { name: 'Victoria Hayes', role: 'Founder & CEO', image: '/images/portrait-exec-f.jpg', bio: '18 years leading revenue cycle teams for multi-site practices.' },
  { name: 'Daniel Brooks', role: 'Chief Operating Officer', image: '/images/portrait-exec-m.jpg', bio: 'Built billing operations processing $500M+ in annual claims.' },
  { name: 'Dr. Laura Chen', role: 'Clinical Coding Lead, CPC', image: '/images/portrait-doctor-f.jpg', bio: 'Former physician-practice manager turned coding educator.' },
  { name: 'Maria Alvarez', role: 'Director of Client Success', image: '/images/portrait-pro-f.jpg', bio: 'Keeps every client relationship proactive, personal and on track.' },
] as const

export const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Award, title: 'Excellence, always', text: 'It’s in our name. We hold every claim to the highest standard.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'Compliant, ethical and transparent, with no shortcuts and no surprises.' },
  { icon: HeartPulse, title: 'Care for providers', text: 'When your back office is healthy, you can focus on your patients.' },
  { icon: Users, title: 'True partnership', text: 'We act as an extension of your team, not just another vendor.' },
]

export const TIMELINE = [
  { year: '2014', title: 'Founded', text: 'Started as a two-person billing studio serving independent clinics.' },
  { year: '2016', title: 'Coding division', text: 'Launched certified coding and pre-bill audit services.' },
  { year: '2018', title: 'Dental billing', text: 'Expanded into PPO, HMO and fee-for-service dental billing.' },
  { year: '2020', title: 'Virtual office', text: 'Introduced Virtual Office Managers as practices moved to remote work.' },
  { year: '2023', title: '300+ practices', text: 'Crossed 300 active practices across 28 states.' },
  { year: '2026', title: 'Excellence, scaled', text: 'Rebranded as Strategies for Excellence, with a new analytics platform.' },
] as const

export const FAQS = [
  {
    q: 'How quickly can you get started?',
    a: 'Most practices are fully onboarded within 10 to 14 days. We begin with a free revenue audit, connect to your EHR and clearinghouse, and run alongside your current process until the transition is complete.',
  },
  {
    q: 'How is pricing structured?',
    a: 'We typically charge a percentage of collections, so we only succeed when you do. Flat-fee options are available for services like Verification of Benefits and Virtual Office Management.',
  },
  {
    q: 'Which EHR and billing systems do you work with?',
    a: 'We work in TherapyNotes, AdvancedMD, Practice Fusion, Valant, Tebra, TherapyAppointment, SimplePractice, Myriad Systems and many more. We learn new systems quickly, too.',
  },
  {
    q: 'Is my patient data secure?',
    a: 'Yes. We sign a Business Associate Agreement, use encrypted access with MFA, enforce role-based permissions and train every team member on HIPAA every year.',
  },
  {
    q: 'Do I keep visibility over my revenue?',
    a: 'Always. You get real-time dashboards, a monthly performance review and a dedicated account manager you can reach directly.',
  },
  {
    q: 'Can you handle both medical and dental billing?',
    a: 'Yes. We have dedicated specialists for medical and for dental billing, including CDT coding, narratives, attachments and coordination of benefits.',
  },
] as const

