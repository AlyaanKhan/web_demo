import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Clock, Mail, MapPin, Phone, RotateCcw, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { LogoDots } from '../components/brand/Logo'
import { PageHero } from '../components/sections/Shared'
import { Button } from '../components/ui/Button'
import { Accordion, SectionHeading } from '../components/ui/bits'
import { Reveal, Stagger, StaggerItem } from '../components/ui/motion'
import { FAQS } from '../data/content'
import { SERVICES } from '../data/services'
import { cn } from '../lib/cn'
import { SITE } from '../lib/site'

const VOLUMES = ['< 500', '500 – 2k', '2k – 5k', '5k+']

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'practice', string>>

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about"
        accent="your revenue."
        text="Tell us a little about your practice. A revenue specialist will reply within one business day with a free audit plan."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-8 lg:grid-cols-[380px_1fr]">
          <Stagger className="flex flex-col gap-4" gap={0.08}>
            <InfoCard icon={<Phone className="size-5" />} label="Call us" href={SITE.phoneHref} value={SITE.phone} />
            <InfoCard icon={<Mail className="size-5" />} label="Email us" href={SITE.emailHref} value={SITE.email} />
            <InfoCard icon={<MapPin className="size-5" />} label="Visit us" value={SITE.address} />
            <InfoCard icon={<Clock className="size-5" />} label="Office hours" value={SITE.hours} />
            <StaggerItem>
              <div className="noise relative overflow-hidden rounded-3xl bg-brand-gradient p-6 text-white shadow-lift">
                <ShieldCheck className="size-7" />
                <p className="mt-4 text-lg font-bold">Your data is safe with us</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/75">
                  Every engagement is covered by a BAA. We never share your information.
                </p>
              </div>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-soft py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading align="left" eyebrow="FAQ" title="Before you" accent="reach out" />
          <Reveal delay={0.1}>
            <Accordion items={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function InfoCard({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const body = (
    <div className="group flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white dark:group-hover:text-[#04131a]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-semibold tracking-wide text-subtle uppercase">{label}</p>
        <p className="mt-0.5 font-bold break-words text-fg">{value}</p>
      </div>
    </div>
  )
  return <StaggerItem>{href ? <a href={href}>{body}</a> : body}</StaggerItem>
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [volume, setVolume] = useState(VOLUMES[1])
  const [services, setServices] = useState<string[]>([SERVICES[0].slug])
  const [reference, setReference] = useState('')

  const toggleService = (slug: string) =>
    setServices((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const next: Errors = {}
    if (!String(f.get('name')).trim()) next.name = 'Please enter your name'
    if (!String(f.get('practice')).trim()) next.practice = 'Please enter your practice name'
    if (!/^\S+@\S+\.\S+$/.test(String(f.get('email')))) next.email = 'Please enter a valid email'
    const phone = String(f.get('phone')).replace(/\D/g, '')
    if (phone && phone.length < 10) next.phone = 'Please enter a valid phone number'
    setErrors(next)
    if (Object.keys(next).length) return
    setStatus('sending')
    setReference(`SFE-${Math.floor(10000 + Math.random() * 89999)}`)
    // Demo only: simulate a network request.
    window.setTimeout(() => setStatus('sent'), 1600)
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface p-5 shadow-card sm:rounded-[32px] sm:p-10">
      <div className="glow absolute -top-40 -right-40 size-96 opacity-20 [--glow:var(--sage)]" />
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-[560px] flex-col items-center justify-center text-center"
          >
            <svg viewBox="0 0 100 100" className="size-28">
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
              <motion.path
                d="M32 52 L45 64 L69 38"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.6, ease: 'easeOut' }}
              />
            </svg>
            <h3 className="mt-8 text-3xl font-bold text-fg">Thank you!</h3>
            <p className="mt-3 max-w-md text-muted">
              Your request is in. A revenue specialist will reach out within one business day to schedule your free audit.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13.5px] font-semibold text-brand">
              <CalendarCheck className="size-4" /> Reference #{reference}
            </div>
            <Button variant="ghost" className="mt-6" onClick={() => setStatus('idle')}>
              <RotateCcw className="size-4" /> Send another request
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="relative">
            <h2 className="text-[clamp(1.4rem,5vw,1.875rem)] font-bold text-fg">Request your free revenue audit</h2>
            <p className="mt-2 text-[15px] text-muted">It takes under a minute. No commitment required.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Full name" placeholder="Jordan Smith" error={errors.name} />
              <Field name="practice" label="Practice name" placeholder="Cedar Ridge Family Medicine" error={errors.practice} />
              <Field name="email" type="email" label="Work email" placeholder="jordan@practice.com" error={errors.email} />
              <Field name="phone" type="tel" label="Phone (optional)" placeholder="(555) 123-4567" error={errors.phone} />
            </div>

            <fieldset className="mt-7">
              <legend className="text-[13.5px] font-semibold text-fg">Services you’re interested in</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {SERVICES.map((s) => {
                  const on = services.includes(s.slug)
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => toggleService(s.slug)}
                      aria-pressed={on}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 active:scale-95',
                        on
                          ? 'border-brand bg-brand text-white shadow-glow dark:text-[#04131a]'
                          : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg',
                      )}
                    >
                      <s.icon className="size-4" />
                      {s.title}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="text-[13.5px] font-semibold text-fg">Monthly claim volume</legend>
              <div className="mt-3 grid grid-cols-2 gap-1 rounded-2xl border border-line bg-surface-2 p-1 sm:grid-cols-4">
                {VOLUMES.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVolume(v)}
                    className={cn('relative rounded-xl py-2.5 text-[13.5px] font-semibold transition-colors', volume === v ? 'text-fg' : 'text-muted hover:text-fg')}
                  >
                    {volume === v && (
                      <motion.span layoutId="vol" className="absolute inset-0 rounded-xl bg-surface shadow-soft" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    )}
                    <span className="relative">{v}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-7 block">
              <span className="text-[13.5px] font-semibold text-fg">How can we help?</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your current billing setup, challenges or goals…"
                className="mt-2 w-full resize-none rounded-2xl border border-line bg-surface px-4 py-3.5 text-[15px] text-fg transition outline-none placeholder:text-subtle focus:border-brand focus:ring-4 focus:ring-brand/10"
              />
            </label>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="flex items-center gap-2 text-[13px] text-subtle">
                <ShieldCheck className="size-4 text-brand" /> HIPAA-aligned & confidential
              </p>
              <Button type="submit" size="lg" arrow={status === 'idle'} disabled={status === 'sending'} className="w-full sm:w-auto">
                {status === 'sending' ? (
                  <>
                    <LogoDots className="[&>span]:!bg-white dark:[&>span]:!bg-[#04131a]" /> Sending…
                  </>
                ) : (
                  'Request free audit'
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  name,
  label,
  placeholder,
  type = 'text',
  error,
}: {
  name: string
  label: string
  placeholder: string
  type?: string
  error?: string
}) {
  return (
    <label className="block">
      <span className="text-[13.5px] font-semibold text-fg">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          'mt-2 h-12 w-full rounded-2xl border bg-surface px-4 text-[15px] text-fg transition outline-none placeholder:text-subtle focus:ring-4',
          error ? 'border-red-400 focus:ring-red-400/15' : 'border-line focus:border-brand focus:ring-brand/10',
        )}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-[12.5px] font-medium text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
