import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PlatformMarquee, ServiceCard } from '../components/home/Sections'
import { CTA } from '../components/sections/Shared'
import { ButtonLink } from '../components/ui/Button'
import { Aurora, Eyebrow, SectionHeading } from '../components/ui/bits'
import { CountUp, EASE_OUT, Reveal, Stagger, StaggerItem, spotlightHandlers } from '../components/ui/motion'
import { SERVICES, getService } from '../data/services'
import { SITE } from '../lib/site'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  if (!s) return <NotFound />

  const idx = SERVICES.indexOf(s)
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length]
  const next = SERVICES[(idx + 1) % SERVICES.length]
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 md:pt-48">
        <Aurora />
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" aria-hidden />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-subtle"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="hover:text-fg">
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <Link to="/services" className="hover:text-fg">
                Services
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-fg">{s.title}</span>
            </motion.nav>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
              className="mt-8 grid size-16 place-items-center rounded-2xl bg-brand text-white shadow-glow dark:text-[#04131a]"
            >
              <s.icon className="size-8" strokeWidth={1.7} />
            </motion.div>
            <h1 className="mt-6 overflow-hidden pb-1 text-[clamp(2.1rem,8vw,3.75rem)] leading-[1.06] font-extrabold tracking-[-0.04em] text-fg">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
              >
                {s.title}
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-lg"
            >
              {s.summary}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <ButtonLink to="/contact" size="lg" arrow>
                Get started
              </ButtonLink>
              <ButtonLink href={SITE.phoneHref} size="lg" variant="secondary">
                <Phone className="size-4" /> {SITE.phone}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            className="relative"
          >
            <div className="glow absolute -inset-16 opacity-35 [--glow:var(--sage)]" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[32px] border border-line shadow-lift">
              <img src={s.image} alt={s.title} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#12112b]/60 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, type: 'spring' }}
              className="glass absolute -bottom-6 -left-2 animate-float rounded-3xl border border-line p-4 shadow-lift sm:-left-8 sm:p-5"
            >
              <p className="text-[clamp(1.75rem,7vw,2.25rem)] font-extrabold tracking-tight text-fg">
                <CountUp value={s.metric.value} suffix={s.metric.suffix} />
              </p>
              <p className="mt-1 max-w-[180px] text-[13px] text-muted">{s.metric.label}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features + sticky sidebar */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeading align="left" eyebrow="What’s included" title="Everything handled," accent="nothing missed." />
            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2" gap={0.1}>
              {s.features.map((f, i) => (
                <StaggerItem key={f.title}>
                  <div
                    {...spotlightHandlers()}
                    className="spotlight ring-gradient group h-full rounded-3xl border border-line bg-surface p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="text-[13px] font-bold text-brand tabular-nums">0{i + 1}</span>
                    <h3 className="mt-4 text-lg font-bold text-fg">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-24">
              <SectionHeading align="left" eyebrow="Our workflow" title="How we deliver" accent={s.title.toLowerCase()} />
              <ol className="relative mt-12 ml-4 border-l-2 border-dashed border-line">
                {s.steps.map((st, i) => (
                  <Reveal as="li" key={st.title} delay={i * 0.08} className="relative pb-10 pl-10 last:pb-0">
                    <span className="absolute top-0 -left-[17px] grid size-8 place-items-center rounded-full bg-brand text-[13px] font-bold text-white ring-8 ring-bg dark:text-[#04131a]">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-fg">{st.title}</h3>
                    <p className="mt-1.5 text-[15px] text-muted">{st.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="overflow-hidden rounded-[28px] border border-line bg-surface shadow-card">
                <div className="noise relative bg-brand-gradient p-7 text-white">
                  <p className="text-[12px] font-bold tracking-[0.2em] text-white/70">DELIVERABLES</p>
                  <p className="mt-2 text-2xl font-bold">{s.title}</p>
                </div>
                <ul className="flex flex-col gap-4 p-7">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[15px] font-medium text-fg">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line p-7 pt-6">
                  <ButtonLink to="/contact" arrow className="w-full">
                    Request a proposal
                  </ButtonLink>
                  <p className="mt-4 text-center text-[13px] text-muted">
                    Or call{' '}
                    <a href={SITE.phoneHref} className="font-semibold text-brand hover:underline">
                      {SITE.phone}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  to={`/services/${prev.slug}`}
                  className="group rounded-2xl border border-line bg-surface p-4 transition hover:border-brand/40 hover:shadow-soft"
                >
                  <span className="flex items-center gap-1 text-[12px] font-semibold text-subtle">
                    <ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" /> Previous
                  </span>
                  <span className="mt-1 block text-[14px] font-bold text-fg">{prev.title}</span>
                </Link>
                <Link
                  to={`/services/${next.slug}`}
                  className="group rounded-2xl border border-line bg-surface p-4 text-right transition hover:border-brand/40 hover:shadow-soft"
                >
                  <span className="flex items-center justify-end gap-1 text-[12px] font-semibold text-subtle">
                    Next <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1 block text-[14px] font-bold text-fg">{next.title}</span>
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <PlatformMarquee />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>Explore more</Eyebrow>
            <h2 className="text-[clamp(1.85rem,6.5vw,3rem)] leading-[1.08] font-bold text-fg">Other services</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Reveal key={o.slug}>
                <ServiceCard s={o} index={SERVICES.indexOf(o)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
