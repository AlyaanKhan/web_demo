import type { LucideIcon } from 'lucide-react'
import { CircleDollarSign, FileSearch, HandCoins, Headset, ShieldCheck, ToothbrushSparkles } from 'lucide-react'

export type Service = {
  slug: string
  title: string
  short: string
  summary: string
  icon: LucideIcon
  image: string
  accent: string
  metric: { value: number; suffix: string; prefix?: string; label: string }
  features: { title: string; text: string }[]
  deliverables: string[]
  steps: { title: string; text: string }[]
}

// Core solutions come from the business model doc; supporting copy and metrics are demo data.
export const SERVICES: Service[] = [
  {
    slug: 'medical-billing',
    title: 'Medical Billing',
    short: 'End-to-end billing that reduces denials and keeps cash flow predictable for every payer.',
    summary:
      'From charge entry to final payment posting, we run your whole billing cycle with care. Every claim is scrubbed, submitted and followed through until it is paid.',
    icon: CircleDollarSign,
    image: '/images/medical-1.jpg',
    accent: '#0f7c7a',
    metric: { value: 98, suffix: '%', label: 'First-pass clean claim rate' },
    features: [
      { title: 'Claim scrubbing', text: 'Over 1,200 payer-specific edits run on every claim before it leaves your system.' },
      { title: 'Denial management', text: 'Root-cause analysis and appeals that turn rejections into revenue.' },
      { title: 'Payment posting', text: 'ERA and EOB posting within 24 hours, reconciled line by line.' },
      { title: 'A/R follow-up', text: 'Aged claims are worked proactively, prioritised by dollar value and timely-filing risk.' },
    ],
    deliverables: ['Charge entry & claim submission', 'Electronic remittance posting', 'Denial & appeal workflows', 'Monthly revenue reporting'],
    steps: [
      { title: 'Capture', text: 'Charges are entered and validated against your schedules.' },
      { title: 'Scrub & submit', text: 'Claims are checked and sent the same day.' },
      { title: 'Track & resolve', text: 'Rejections are corrected within 48 hours.' },
      { title: 'Post & report', text: 'Payments are reconciled and insights delivered to you.' },
    ],
  },
  {
    slug: 'dental-billing',
    title: 'Dental Billing',
    short: 'Specialised support for PPO, HMO and fee-for-service plans so you get paid correctly and on time.',
    summary:
      'Dental billing has its own codes, narratives and attachments. We handle the CDT coding, frequency limits and pre-authorizations so your chairs stay full and your collections stay strong.',
    icon: ToothbrushSparkles,
    image: '/images/dental-1.jpg',
    accent: '#4a4670',
    metric: { value: 32, suffix: '%', label: 'Average lift in dental collections' },
    features: [
      { title: 'PPO, HMO & FFS', text: 'Plan-aware billing that respects every fee schedule and contract.' },
      { title: 'Pre-authorizations', text: 'Narratives, X-ray attachments and perio charts submitted correctly the first time.' },
      { title: 'Coordination of benefits', text: 'Primary and secondary claims sequenced to maximise reimbursement.' },
      { title: 'Patient statements', text: 'Clear, friendly statements that get paid faster.' },
    ],
    deliverables: ['CDT coding review', 'Attachment & narrative prep', 'Secondary claim filing', 'Patient balance management'],
    steps: [
      { title: 'Verify', text: 'Eligibility and frequency limits are checked before the visit.' },
      { title: 'Document', text: 'Narratives and attachments are prepared.' },
      { title: 'Submit', text: 'Claims are filed to primary and secondary payers.' },
      { title: 'Collect', text: 'Insurance and patient balances are followed through.' },
    ],
  },
  {
    slug: 'virtual-office-manager',
    title: 'Virtual Office Manager',
    short: 'Dedicated remote back-office support for scheduling, billing follow-up and admin tasks.',
    summary:
      'Get an experienced office manager without adding to your payroll. Your dedicated VOM handles scheduling, phones, patient follow-up and admin, so your team can focus on patient care.',
    icon: Headset,
    image: '/images/team-women.jpg',
    accent: '#2a294d',
    metric: { value: 20, suffix: '+ hrs', label: 'Admin time saved per week' },
    features: [
      { title: 'Scheduling & reminders', text: 'Calendar management, confirmations and no-show reduction.' },
      { title: 'Patient communication', text: 'Calls, voicemails and portal messages answered quickly and courteously.' },
      { title: 'Credentialing support', text: 'Payer enrolments and re-credentialing tracked on your behalf.' },
      { title: 'Daily huddle reports', text: 'A morning snapshot of what needs attention today.' },
    ],
    deliverables: ['Dedicated named manager', 'Shared task board', 'Weekly performance call', 'Standard operating procedures'],
    steps: [
      { title: 'Match', text: 'We pair you with a manager who fits your speciality.' },
      { title: 'Shadow', text: 'They learn your workflows and preferences.' },
      { title: 'Own', text: 'Daily operations are handled end to end.' },
      { title: 'Improve', text: 'Bottlenecks are flagged and fixed.' },
    ],
  },
  {
    slug: 'medical-coding',
    title: 'Medical Coding',
    short: 'Accurate, compliant ICD-10 and CPT coding that protects revenue and reduces audit risk.',
    summary:
      'Our AAPC-certified coders turn documentation into accurate, defensible claims. Each chart is reviewed for specificity, modifiers and medical necessity before it reaches the payer.',
    icon: FileSearch,
    image: '/images/doctor-tablet.jpg',
    accent: '#0a5f5d',
    metric: { value: 99.2, suffix: '%', label: 'Coding accuracy on audit' },
    features: [
      { title: 'Certified coders', text: 'CPC and CCS credentialed specialists for your speciality.' },
      { title: 'Pre-bill audits', text: 'A second-level review on high-value and high-risk encounters.' },
      { title: 'Provider education', text: 'Documentation tips that capture the full complexity of care.' },
      { title: 'Compliance first', text: 'Built around OIG guidance and payer policies.' },
    ],
    deliverables: ['ICD-10-CM / CPT / HCPCS coding', 'Modifier optimisation', 'Quarterly coding audits', 'Documentation feedback'],
    steps: [
      { title: 'Review', text: 'Charts are read for clinical detail.' },
      { title: 'Code', text: 'The most specific, compliant codes are assigned.' },
      { title: 'Audit', text: 'Samples are double-checked by a senior coder.' },
      { title: 'Educate', text: 'Findings are shared with your providers.' },
    ],
  },
  {
    slug: 'verification-of-benefits',
    title: 'Verification of Benefits',
    short: 'Thorough eligibility checks before every visit, so there are no surprises or write-offs.',
    summary:
      'We confirm coverage, copays, deductibles and authorization requirements before patients arrive. That means fewer denials, accurate estimates and happier patients.',
    icon: ShieldCheck,
    image: '/images/doctor-2.jpg',
    accent: '#5fa596',
    metric: { value: 48, suffix: ' hrs', label: 'Verified ahead of every visit' },
    features: [
      { title: 'Eligibility checks', text: 'Active coverage, plan type and network status are confirmed.' },
      { title: 'Benefit breakdown', text: 'Copays, coinsurance and remaining deductible are documented clearly.' },
      { title: 'Prior authorization', text: 'Auth requirements are flagged and requests submitted.' },
      { title: 'Patient estimates', text: 'Good-faith estimates help patients plan ahead.' },
    ],
    deliverables: ['Pre-visit eligibility reports', 'Authorization tracking', 'Estimate generation', 'Coverage change alerts'],
    steps: [
      { title: 'Pull schedule', text: 'Upcoming appointments are synced daily.' },
      { title: 'Verify', text: 'We check each patient with the payer.' },
      { title: 'Document', text: 'Benefits are recorded in your EHR.' },
      { title: 'Alert', text: 'Issues are flagged before the visit.' },
    ],
  },
  {
    slug: 'collection-agency-services',
    title: 'Collection Agency Services',
    short: 'Ethical, compliant recovery of aged receivables that protects your practice’s reputation.',
    summary:
      'Old balances shouldn’t be written off by default. Our patient-first recovery team uses respectful, FDCPA-compliant outreach to recover revenue without damaging relationships.',
    icon: HandCoins,
    image: '/images/finance.jpg',
    accent: '#46426e',
    metric: { value: 41, suffix: '%', label: 'Recovery rate on 120+ day A/R' },
    features: [
      { title: 'Compliant outreach', text: 'Fully FDCPA and HIPAA-aware communication.' },
      { title: 'Flexible payment plans', text: 'Options that make it easier for patients to pay.' },
      { title: 'Reputation-safe', text: 'Courteous scripts written to protect patient goodwill.' },
      { title: 'Transparent reporting', text: 'See every account, contact attempt and dollar recovered.' },
    ],
    deliverables: ['Aged A/R analysis', 'Multi-channel outreach', 'Payment plan setup', 'Recovery dashboards'],
    steps: [
      { title: 'Analyse', text: 'Accounts are segmented by age and likelihood of recovery.' },
      { title: 'Reach out', text: 'Patients are contacted respectfully, with empathy.' },
      { title: 'Arrange', text: 'Plans and settlements are set up.' },
      { title: 'Recover', text: 'Funds are posted and reported.' },
    ],
  },
]

export const getService = (slug?: string) => SERVICES.find((s) => s.slug === slug)
