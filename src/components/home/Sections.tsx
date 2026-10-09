import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Minus, Quote, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPARISON, FAQS, PILLARS, PLATFORMS, PROCESS, TESTIMONIALS } from '../../data/content'
import { SERVICES, type Service } from '../../data/services'
import { cn } from '../../lib/cn'
import { SITE } from '../../lib/site'
import { LogoMark } from '../brand/Logo'
import { ButtonLink } from '../ui/Button'
import { Accordion, Eyebrow, Marquee, SectionHeading } from '../ui/bits'
import { CountUp, EASE_OUT, Reveal, Stagger, StaggerItem, spotlightHandlers } from '../ui/motion'

/* ------------------------------ Platforms ------------------------------ */

export function PlatformChip({ p }: { p: (typeof PLATFORMS)[number] }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <span
        className="grid size-9 place-items-center rounded-xl text-[12px] font-extrabold text-white"
        style={{ background: `linear-gradient(135deg, ${p.color}, color-mix(in oklab, ${p.color} 55%, #14132e))` }}
      >
        {p.initials}
      </span>
      <span className="leading-tight">
        <span className="block text-[14.5px] font-bold text-fg">{p.name}</span>
        <span className="block text-[11.5px] text-subtle">{p.category}</span>
      </span>
    </div>
  )
}

export function PlatformMarquee() {
  return (
    <section className="relative py-12">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-[13px] font-semibold tracking-[0.18em] text-subtle uppercase">
            Fluent in the EHR & billing platforms you already use
          </p>
        </Reveal>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <Marquee duration={45}>
          {PLATFORMS.map((p) => (
            <PlatformChip key={p.name} p={p} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}

/* ---------------------------- Premium choice ---------------------------- */

export function PremiumChoice() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Strategies for Excellence"
            title="The premium choice for"
            accent="revenue cycle"
            after="management"
            text="We connect the dots between intricate healthcare billing and total fiscal success. Our rigorous methodology means every file is processed with care, and tailored advice plus advanced operational design boost your clinic's profit margin."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" gap={0.1}>
            {PILLARS.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group flex h-full gap-4 rounded-2xl p-1 transition">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <p.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="font-bold text-fg">{p.title}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Bento stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Reveal className="col-span-2">
            <div className="noise relative overflow-hidden rounded-[24px] bg-[#12112b] p-6 text-white shadow-lift sm:rounded-[28px] sm:p-10">
              <div className="glow absolute -top-40 -right-40 size-[28rem] opacity-60 [--glow:#14928d]" />
              <div className="relative flex items-center justify-between gap-6">
                <div>
                  <p className="text-[13px] font-semibold tracking-[0.16em] text-white/60 uppercase">Collection efficiency</p>
                  <p className="mt-3 text-[clamp(3.5rem,16vw,6rem)] leading-none font-extrabold tracking-[-0.05em]">
                    <CountUp value={98} suffix="%" />
                  </p>
                  <p className="mt-4 max-w-xs text-[14.5px] text-white/70">
                    Of every collectible dollar, recovered for our clients, against an industry average of 89%.
                  </p>
                </div>
                <RingGauge value={0.98} />
              </div>
            </div>
          </Reveal>
          {[
            { v: 45, s: '%', l: 'Fewer claim denials', d: 0.05 },
            { v: 30, s: '%', l: 'Faster reimbursement', d: 0.1 },
            { v: 24, s: 'h', l: 'Claim submission turnaround', d: 0.15 },
            { v: 350, s: '+', l: 'Practices supported', d: 0.2 },
          ].map((k) => (
            <Reveal key={k.l} delay={k.d}>
              <div className="ring-gradient group h-full rounded-3xl border border-line bg-surface p-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card sm:p-6">
                <p className="text-[clamp(1.6rem,7vw,2.25rem)] font-extrabold tracking-[-0.04em] text-fg">
                  <CountUp value={k.v} suffix={k.s} />
                </p>
                <p className="mt-2 text-[13px] font-medium text-muted sm:text-[14px]">{k.l}</p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    className="h-full rounded-full bg-brand-gradient"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(95, 40 + k.v / 4)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3 + k.d, ease: EASE_OUT }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function RingGauge({ value }: { value: number }) {
  return (
    <div className="relative hidden size-36 shrink-0 sm:block">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <defs>
          <linearGradient id="ring-g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#a7e1db" />
            <stop offset="1" stopColor="#3cc4b6" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="url(#ring-g)"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: EASE_OUT }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-[86px] place-items-center rounded-full bg-white shadow-[0_0_40px_rgb(60_196_182/0.35)]">
          <LogoMark height={30} className="[--logo-1:#1e1b3f] [--logo-2:#46426e] [--logo-3:#3c6f70] [--logo-4:#a3c2b9]" />
        </span>
      </div>
    </div>
  )
}

/* ------------------------------- Services ------------------------------- */

export function ServiceCard({ s, wide, index }: { s: Service; wide?: boolean; index: number }) {
  return (
    <Link
      to={`/services/${s.slug}`}
      {...spotlightHandlers()}
      className={cn(
        'spotlight ring-gradient group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:p-7',
        wide && 'md:flex-row md:gap-8',
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="relative grid size-14 place-items-center rounded-2xl border border-line bg-surface-2 text-brand transition-all duration-500 group-hover:border-transparent group-hover:bg-brand group-hover:text-white group-hover:shadow-glow dark:group-hover:text-[#04131a]">
            <s.icon className="size-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.7} />
          </span>
          <span className="text-[13px] font-bold text-subtle tabular-nums">0{index + 1}</span>
        </div>
        <h3 className="mt-7 text-xl font-bold text-fg">{s.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.short}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-fg">
              {s.metric.value}
              {s.metric.suffix}
            </p>
            <p className="text-[12.5px] text-subtle">{s.metric.label}</p>
          </div>
          <span className="grid size-11 place-items-center rounded-full border border-line text-fg transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white dark:group-hover:text-[#04131a]">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
      {wide && (
        <div className="relative mt-7 h-52 overflow-hidden rounded-2xl md:mt-0 md:h-auto md:w-[46%]">
          <img
            src={s.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12112b]/60 via-transparent to-transparent" />
          <span className="glass absolute bottom-3 left-3 rounded-full border border-white/20 px-3 py-1 text-[12px] font-bold text-fg">
            Most requested
          </span>
        </div>
      )}
    </Link>
  )
}

export function ServicesBento() {
  return (
    <section className="relative bg-bg-soft py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-end justify-between gap-8 md:flex-row">
          <SectionHeading
            align="left"
            eyebrow="Core solutions"
            title="Everything your revenue cycle needs,"
            accent="handled."
            text="Six specialised services that plug into your practice, from the first eligibility check to the last dollar collected."
          />
          <Reveal>
            <ButtonLink to="/services" variant="secondary" arrow>
              View all services
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08} className={cn(i === 0 && 'md:col-span-2')}>
              <ServiceCard s={s} index={i} wide={i === 0} />
            </Reveal>
          ))}
          <Reveal delay={0.16} className="lg:col-span-2">
            <div className="noise relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-brand-gradient p-6 text-white shadow-lift sm:p-10 xl:flex-row xl:items-center">
              <LogoMark height={180} className="absolute -right-10 -bottom-12 opacity-[0.1]" />
              <div className="relative">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-white/75">
                  <Sparkles className="size-4" /> Not sure where to start?
                </p>
                <p className="mt-3 max-w-md text-[clamp(1.4rem,5vw,1.875rem)] leading-snug font-bold">
                  Let us audit 90 days of claims, <span className="font-accent">on the house.</span>
                </p>
              </div>
              <ButtonLink to="/contact" variant="light" size="lg" arrow className="relative self-start xl:self-auto">
                Book my audit
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Process ------------------------------- */

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="From first audit to"
          accent="peak performance"
          after="in weeks"
          text="A proven, low-lift onboarding that runs alongside your current process. No downtime, no missed claims."
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 bg-line lg:block">
            <motion.div style={{ scaleX }} className="h-full origin-left bg-brand-gradient" />
          </div>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" gap={0.12}>
            {PROCESS.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="group relative flex flex-col items-center text-center">
                  <span className="relative z-10 grid size-14 place-items-center rounded-2xl border border-line bg-surface text-brand shadow-card transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-brand group-hover:text-white group-hover:shadow-glow dark:group-hover:text-[#04131a]">
                    <p.icon className="size-6" strokeWidth={1.8} />
                    <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-ink text-[11px] font-bold text-white dark:bg-surface-2 dark:text-fg">
                      {i + 1}
                    </span>
                  </span>
                  <span className="mt-6 rounded-full bg-brand-soft px-3 py-1 text-[11.5px] font-bold text-brand">{p.duration}</span>
                  <h3 className="mt-3 text-lg font-bold text-fg">{p.title}</h3>
                  <p className="mt-2 max-w-[260px] text-[14.5px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Comparison ------------------------------ */

export function Comparison() {
  const cell = (v: boolean | string) =>
    v === true ? (
      <span className="grid size-7 place-items-center rounded-full bg-[#3cc4b6] text-[#06201d]">
        <Check className="size-4" strokeWidth={3} />
      </span>
    ) : v === 'partial' ? (
      <span className="grid size-7 place-items-center rounded-full bg-white/10 text-white/60">
        <Minus className="size-4" strokeWidth={3} />
      </span>
    ) : (
      <span className="grid size-7 place-items-center rounded-full bg-white/5 text-white/35">
        <X className="size-4" strokeWidth={3} />
      </span>
    )

  return (
    <section className="noise relative overflow-hidden bg-[#0d0c22] py-24 text-white md:py-32">
      <div className="bg-grid absolute inset-0 opacity-[0.6] [--grid-line:rgb(255_255_255/0.04)]" />
      <div className="glow absolute -top-40 left-1/2 h-[640px] w-[min(1100px,160vw)] -translate-x-1/2 opacity-40 [--glow:#0f7c7a]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Reveal>
            <Eyebrow className="border-white/10 bg-white/5 text-white/80">The difference</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-[clamp(1.85rem,6.5vw,3rem)] leading-[1.08] font-bold">
              In-house billing vs. <span className="font-accent bg-gradient-to-r from-[#c9c5ff] via-[#3cc4b6] to-[#a7e1db] bg-clip-text text-[1.12em] text-transparent">a partner built for it</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/65 sm:text-[17px]">
              Hiring, training and retaining billing staff is expensive and fragile. With us you get a full revenue team,
              specialised tools and accountability for a predictable cost.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-8">
              {[
                { v: 40, s: '%', l: 'Lower cost than in-house' },
                { v: 0, s: '', l: 'Missed claims during PTO' },
              ].map((k) => (
                <div key={k.l}>
                  <p className="text-4xl font-extrabold tracking-tight">
                    <CountUp value={k.v} suffix={k.s} />
                  </p>
                  <p className="mt-1 text-sm text-white/55">{k.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] sm:rounded-[28px]">
            <div className="grid grid-cols-[1fr_64px_56px] items-center border-b border-white/10 px-4 py-4 text-[10.5px] font-bold sm:grid-cols-[1fr_120px_120px] sm:px-6 sm:py-5 sm:text-[12.5px]">
              <span className="text-white/50">CAPABILITY</span>
              <span className="text-center text-white/50">IN-HOUSE</span>
              <span className="flex justify-center">
                <span className="rounded-full bg-[#3cc4b6]/15 px-2.5 py-1 text-[#6edccf]">SfE</span>
              </span>
            </div>
            {COMPARISON.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: EASE_OUT }}
                className="grid grid-cols-[1fr_64px_56px] items-center border-b border-white/5 px-4 py-3.5 transition-colors last:border-0 hover:bg-white/[0.03] sm:grid-cols-[1fr_120px_120px] sm:px-6 sm:py-4"
              >
                <span className="pr-2 text-[13.5px] font-medium text-white/85 sm:pr-3 sm:text-[14.5px]">{row.label}</span>
                <span className="flex justify-center">{cell(row.inHouse)}</span>
                <span className="flex justify-center">{cell(row.sfe)}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------- Testimonials ----------------------------- */

const SLIDE_MS = 7000

export function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const t = TESTIMONIALS[i]

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => setI((v) => (v + 1) % TESTIMONIALS.length), SLIDE_MS)
    return () => window.clearTimeout(id)
  }, [i, paused])

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Client stories" title="Practices that" accent="trust us" after="with their revenue" />

        <Reveal className="mt-14">
          <div
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-line bg-surface p-6 shadow-card sm:rounded-[32px] sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="absolute top-6 right-6 size-14 text-brand opacity-[0.12]" strokeWidth={1.5} />
            <div className="grid items-center gap-8 md:grid-cols-[220px_1fr] md:gap-10">
              <div className="relative mx-auto size-36 sm:size-44 md:size-52">
                <div className="absolute inset-0 animate-spin-slow rounded-full bg-brand-gradient opacity-80 [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))]" />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={t.avatar}
                    src={t.avatar}
                    alt={t.name}
                    className="absolute inset-2.5 size-[calc(100%-20px)] rounded-full object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <motion.span
                  key={t.metric}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-fg px-3.5 py-1.5 text-[12px] font-bold whitespace-nowrap text-bg shadow-card"
                >
                  {t.metric}
                </motion.span>
              </div>

              <div className="min-h-[320px] sm:min-h-[250px] md:min-h-[230px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  >
                    <div className="flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <svg key={k} viewBox="0 0 24 24" className="size-[18px] fill-current">
                          <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.6 5.8 21.2l1.6-7L2 9.5l7.1-.6z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="mt-5 text-[17px] leading-relaxed font-medium text-fg sm:text-2xl sm:leading-relaxed">
                      “{t.quote}”
                    </blockquote>
                    <p className="mt-6 font-bold text-fg">{t.name}</p>
                    <p className="text-[14px] text-muted">{t.role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress tabs */}
            <div className="mt-8 grid grid-cols-5 gap-1.5 sm:mt-10 sm:gap-2">
              {TESTIMONIALS.map((x, k) => (
                <button
                  key={x.name}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Show testimonial from ${x.name}`}
                  className="group py-2"
                >
                  <span className="block h-1 overflow-hidden rounded-full bg-surface-2 transition group-hover:bg-line-strong">
                    {k === i && (
                      <motion.span
                        key={`${i}-${paused}`}
                        className="block h-full rounded-full bg-brand-gradient"
                        initial={{ width: paused ? '100%' : '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                    {k < i && <span className="block h-full w-full rounded-full bg-brand/40" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------- FAQ --------------------------------- */

export function FaqSection() {
  return (
    <section className="relative bg-bg-soft py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions,"
            accent="answered."
            text="Everything practices usually ask before partnering with us. Can’t find what you need? Our team is a call away."
          />
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft">
              <img src="/images/portrait-pro-f.jpg" alt="" className="size-14 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="font-bold text-fg">Talk to a specialist</p>
                <a href={SITE.phoneHref} className="text-[14.5px] font-semibold text-brand hover:underline">
                  {SITE.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  )
}
