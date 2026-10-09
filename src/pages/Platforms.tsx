import { motion } from 'framer-motion'
import { BadgeCheck, Cable, Rocket, Settings2, Zap } from 'lucide-react'
import { LogoMark } from '../components/brand/Logo'
import { CTA, PageHero } from '../components/sections/Shared'
import { ButtonLink } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/bits'
import { Reveal, Stagger, StaggerItem, spotlightHandlers } from '../components/ui/motion'
import { PLATFORMS } from '../data/content'

const STEPS = [
  { icon: Cable, title: 'Connect', text: 'Secure, role-based access to your EHR and clearinghouse is set up in a day.' },
  { icon: Settings2, title: 'Configure', text: 'We map your fee schedules, payers, providers and workflows.' },
  { icon: Rocket, title: 'Go live', text: 'We run in parallel, then take over without missing a single claim.' },
]

export default function Platforms() {
  return (
    <>
      <PageHero
        eyebrow="EHR & billing platforms"
        title="Works inside the systems"
        accent="you already use."
        text="We have extensive hands-on experience with leading EHR and practice-management systems used by providers across the United States, so your billing operations keep running smoothly."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Platforms' }]}
      />

      {/* Orbit */}
      <section className="relative pb-24">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <Orbit />
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Platform-agnostic"
              title="Your EHR stays."
              accent="Your revenue grows."
              text="Our team works comfortably across diverse platforms. We’re highly adaptable and quick to learn new systems, so we can support your practice whichever EHR or billing platform you use."
            />
            <Stagger className="mt-9 grid gap-3 sm:grid-cols-2" gap={0.06}>
              {[
                'No migration or data export needed',
                'Secure, auditable user access',
                'Native workflows, no workarounds',
                'New systems learned in days',
              ].map((t) => (
                <StaggerItem key={t}>
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 text-[14.5px] font-semibold text-fg shadow-soft">
                    <BadgeCheck className="size-5 shrink-0 text-brand" /> {t}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-bg-soft py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Supported platforms" title="Experience that" accent="speaks every system" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
            {PLATFORMS.map((p) => (
              <StaggerItem key={p.name}>
                <div
                  {...spotlightHandlers()}
                  className="spotlight ring-gradient group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div
                    className="glow absolute -top-20 -right-20 size-48 opacity-0 transition-opacity duration-500 group-hover:opacity-30"
                    style={{ ["--glow" as string]: p.color }}
                  />
                  <span
                    className="relative grid size-14 place-items-center rounded-2xl text-lg font-extrabold text-white shadow-card transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                    style={{ background: `linear-gradient(135deg, ${p.color}, color-mix(in oklab, ${p.color} 55%, #14132e))` }}
                  >
                    {p.initials}
                  </span>
                  <h3 className="relative mt-6 text-lg font-bold text-fg">{p.name}</h3>
                  <p className="relative text-[14px] text-muted">{p.category}</p>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current" /> Fully supported
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-3xl border border-dashed border-line-strong bg-surface p-6 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Zap className="size-5" />
                </span>
                <div>
                  <p className="font-bold text-fg">Don’t see your platform?</p>
                  <p className="text-[14.5px] text-muted">We learn new systems quickly. Tell us what you use.</p>
                </div>
              </div>
              <ButtonLink to="/contact" variant="secondary" arrow>
                Ask us
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Onboarding" title="Live in" accent="three simple steps" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-[28px] border border-line bg-surface p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                  <span className="absolute -top-6 -right-2 text-[8rem] leading-none font-extrabold text-fg/[0.04] transition-colors duration-500 group-hover:text-brand/10">
                    {i + 1}
                  </span>
                  <span className="relative grid size-13 place-items-center rounded-2xl bg-brand text-white shadow-glow dark:text-[#04131a]">
                    <s.icon className="size-6" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold text-fg">{s.title}</h3>
                  <p className="relative mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}

/** Platforms orbiting the SfE mark. */
function Orbit() {
  const inner = PLATFORMS.slice(0, 4)
  const outer = PLATFORMS.slice(4)
  const ring = (items: readonly (typeof PLATFORMS)[number][], duration: number, reverse = false) => (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {items.map((p, i) => {
        const a = (i / items.length) * Math.PI * 2 + (reverse ? 0.6 : 0)
        return (
          <div
            key={p.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
          >
            <motion.div
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
              className="flex items-center gap-2 rounded-2xl border border-line bg-surface p-1.5 shadow-card md:py-2 md:pr-3.5 md:pl-2"
            >
              <span
                className="grid size-8 place-items-center rounded-lg text-[11px] font-extrabold text-white"
                style={{ background: p.color }}
              >
                {p.initials}
              </span>
              <span className="hidden text-[13px] font-bold whitespace-nowrap text-fg md:inline">{p.name}</span>
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="absolute inset-[6%] rounded-full border border-dashed border-line-strong" />
      <div className="absolute inset-[26%] rounded-full border border-line" />
      <div className="glow absolute inset-[22%] opacity-40 [--glow:var(--sage)]" />
      <div className="absolute inset-[6%]">{ring(outer, 60, true)}</div>
      <div className="absolute inset-[26%]">{ring(inner, 45)}</div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid size-28 place-items-center rounded-full border border-line bg-surface shadow-lift sm:size-36">
          <LogoMark height={42} mode="intro" />
        </div>
      </div>
    </div>
  )
}
