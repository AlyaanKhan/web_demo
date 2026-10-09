import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Clock, Lock, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import { SITE } from '../../lib/site'
import { Logo } from '../brand/Logo'
import { SocialIcon } from '../ui/bits'

const COMPANY = [
  { label: 'About us', to: '/about' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'Contact', to: '/contact' },
  { label: 'Free revenue audit', to: '/contact' },
]

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-soft">
      <div className="absolute inset-x-0 top-0 h-px bg-brand-gradient opacity-60" />
      <div className="container-x relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <Link to="/" className="w-fit rounded-xl" aria-label="Home">
              <Logo />
            </Link>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              Superior revenue results. We build specialised financial workflows and audit them meticulously for premier
              healthcare organizations.
            </p>
            <div className="flex gap-2">
              {(['linkedin', 'facebook', 'instagram', 'x'] as const).map((s) => (
                <a
                  key={s}
                  href={SITE.socials[s]}
                  aria-label={s}
                  className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white dark:hover:text-[#04131a]"
                >
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-[12px] font-semibold text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
                <ShieldCheck className="size-3.5 text-brand" /> HIPAA-aligned
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
                <Lock className="size-3.5 text-brand" /> BAA on every account
              </span>
            </div>
          </div>

          <FooterCol title="Services">
            {SERVICES.map((s) => (
              <FooterLink key={s.slug} to={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            {COMPANY.map((c) => (
              <FooterLink key={c.label} to={c.to}>
                {c.label}
              </FooterLink>
            ))}
          </FooterCol>

          <div className="flex flex-col gap-5">
            <h3 className="text-[13px] font-bold tracking-[0.16em] text-fg uppercase">Get in touch</h3>
            <ul className="flex flex-col gap-3.5 text-[14.5px] text-muted">
              <li>
                <a href={SITE.phoneHref} className="group flex items-center gap-3 transition hover:text-fg">
                  <Phone className="size-4 text-brand" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="group flex items-center gap-3 transition hover:text-fg">
                  <Mail className="size-4 text-brand" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" /> {SITE.address}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 text-brand" /> {SITE.hours}
              </li>
            </ul>
            <form onSubmit={onSubmit} className="mt-2">
              <label htmlFor="news" className="text-[13px] font-semibold text-fg">
                Monthly RCM insights
              </label>
              <div className="mt-2 flex items-center gap-1 rounded-full border border-line bg-surface p-1 pl-4 shadow-soft transition focus-within:border-brand/50">
                <input
                  id="news"
                  type="email"
                  required
                  placeholder="you@practice.com"
                  disabled={subscribed}
                  className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid size-9 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-strong dark:text-[#04131a]"
                >
                  <Send className="size-4" />
                </button>
              </div>
              {subscribed && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-[13px] text-brand">
                  You’re subscribed. Welcome aboard!
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="pointer-events-none relative mt-20 flex items-end justify-center select-none" aria-hidden>
          <span className="bg-gradient-to-b from-fg/[0.09] to-transparent bg-clip-text text-[clamp(4rem,15vw,13rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-transparent">
            Excellence
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[13px] text-subtle sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition hover:text-fg">
              Privacy
            </a>
            <a href="#" className="transition hover:text-fg">
              Terms
            </a>
            <a href="#" className="transition hover:text-fg">
              HIPAA Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[13px] font-bold tracking-[0.16em] text-fg uppercase">{title}</h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="group inline-flex items-center gap-1 text-[14.5px] text-muted transition hover:text-fg">
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
        </span>
        <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </Link>
    </li>
  )
}

/** Gradient reading-progress line pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })
  return <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand-gradient" style={{ scaleX }} />
}

/** Back-to-top button with a circular progress ring. */
export function BackToTop() {
  const { scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setShow(v > 0.12))
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6, pointerEvents: show ? 'auto' : 'none' }}
      whileHover={{ y: -3 }}
      className="glass fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full border border-line text-fg shadow-card"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
        <motion.circle cx="24" cy="24" r="22" fill="none" stroke="var(--brand)" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
      </svg>
      <ArrowUp className="size-4" />
    </motion.button>
  )
}
