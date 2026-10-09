import { motion } from 'framer-motion'
import { ChevronRight, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../../lib/site'
import { LogoMark } from '../brand/Logo'
import { ButtonLink } from '../ui/Button'
import { Aurora, Eyebrow } from '../ui/bits'
import { EASE_OUT, Magnetic, Reveal } from '../ui/motion'

export function CTA() {
  return (
    <section className="relative py-24 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[28px] bg-[#12112b] px-5 py-14 text-center text-white shadow-lift sm:rounded-[36px] sm:px-12 md:py-24">
            <div className="absolute inset-0 bg-brand-gradient opacity-90" />
            <div className="bg-grid absolute inset-0 [--grid-line:rgb(255_255_255/0.07)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <motion.div
              className="absolute -top-16 -left-20 opacity-[0.1] max-sm:hidden"
              animate={{ rotate: [0, 6, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LogoMark height={220} />
            </motion.div>
            <motion.div
              className="absolute -right-24 -bottom-20 opacity-[0.1]"
              animate={{ rotate: [0, -6, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LogoMark height={260} />
            </motion.div>

            <div className="relative mx-auto flex max-w-3xl flex-col items-center">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12.5px] font-semibold text-white/90">
                Free 90-day revenue audit · No commitment
              </span>
              <h2 className="mt-6 text-[clamp(1.9rem,7vw,3.75rem)] leading-[1.06] font-extrabold tracking-[-0.035em]">
                Ready to unlock your practice’s <span className="font-accent font-normal">full revenue?</span>
              </h2>
              <p className="mt-5 max-w-xl text-[16px] text-white/75 sm:text-lg">
                Join 350+ practices that trust Strategies for Excellence to keep their revenue cycle healthy, compliant and
                growing.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <ButtonLink to="/contact" variant="light" size="lg" arrow>
                    Book your free audit
                  </ButtonLink>
                </Magnetic>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex h-13 items-center gap-2 rounded-full border border-white/25 px-6 text-[15px] font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone className="size-4" /> {SITE.phone}
                </a>
              </div>
              <a href={SITE.emailHref} className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
                <Mail className="size-4" /> {SITE.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function PageHero({
  eyebrow,
  title,
  accent,
  text,
  crumbs,
  children,
}: {
  eyebrow: string
  title: string
  accent?: string
  text?: string
  crumbs: { label: string; to?: string }[]
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40 md:pt-48 md:pb-24">
      <Aurora />
      <div className="bg-grid mask-radial absolute inset-0 opacity-70" aria-hidden />
      <div className="container-x relative flex flex-col items-center text-center">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-[13px] font-medium text-subtle"
        >
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              {c.to ? (
                <Link to={c.to} className="transition hover:text-fg">
                  {c.label}
                </Link>
              ) : (
                <span className="text-fg">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <ChevronRight className="size-3.5" />}
            </span>
          ))}
        </motion.nav>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.1rem,8vw,4.5rem)] leading-[1.06] font-extrabold tracking-[-0.04em] text-fg">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: 0.2, ease: EASE_OUT }}
            >
              {title}{' '}
              {accent && <span className="font-accent text-gradient pr-2 text-[1.1em] font-normal">{accent}</span>}
            </motion.span>
          </span>
        </h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-muted sm:text-lg"
          >
            {text}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
