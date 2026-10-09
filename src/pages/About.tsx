import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CTA, PageHero } from '../components/sections/Shared'
import { SectionHeading, SocialIcon } from '../components/ui/bits'
import { CountUp, Reveal, Stagger, StaggerItem, spotlightHandlers } from '../components/ui/motion'
import { TEAM, TIMELINE, VALUES } from '../data/content'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Excellence is not a slogan."
        accent="It’s our standard."
        text="Strategies for Excellence partners with healthcare organizations to build revenue cycles that are precise, transparent and resilient, so providers can focus on care."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />
      <Story />
      <Values />
      <Timeline />
      <Team />
      <CTA />
    </>
  )
}

function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 50])

  return (
    <section className="pb-24 md:pb-32">
      <div ref={ref} className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative h-[380px] sm:h-[520px] lg:h-[560px]">
          <motion.div style={{ y: y1 }} className="absolute top-0 left-0 h-[72%] w-[68%] overflow-hidden rounded-[28px] shadow-lift">
            <img src="/images/office-2.jpg" alt="Our office" className="size-full object-cover" />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute right-0 bottom-0 h-[58%] w-[56%] overflow-hidden rounded-[28px] border-[6px] border-bg shadow-lift"
          >
            <img src="/images/team-2.jpg" alt="Our team" className="size-full object-cover" />
          </motion.div>
          <Reveal delay={0.3} className="absolute bottom-[12%] left-[4%]">
            <div className="glass animate-float rounded-3xl border border-line p-4 shadow-lift sm:p-5">
              <p className="text-4xl font-extrabold tracking-tight text-fg">
                <CountUp value={12} suffix="+" />
              </p>
              <p className="text-[13px] text-muted">Years of RCM excellence</p>
            </div>
          </Reveal>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our story"
            title="Built by billing experts who were"
            accent="tired of ‘good enough’"
          />
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-col gap-4 text-[16.5px] leading-relaxed text-muted">
              <p>
                We started with a simple observation. Great providers were losing 10 to 15% of their revenue to denials,
                coding gaps and claims nobody followed up on. They didn’t need another vendor. They needed a partner obsessed
                with getting every detail right.
              </p>
              <p>
                Today our certified billers, coders and virtual office managers support hundreds of practices across medical,
                dental and behavioral health. Our rigorous methodology means every file is processed with care.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-line pt-8 sm:gap-4">
              {[
                { v: 350, s: '+', l: 'Active practices' },
                { v: 28, s: '', l: 'States served' },
                { v: 120, s: 'M+', p: '$', l: 'Annual claims' },
              ].map((k) => (
                <div key={k.l}>
                  <p className="text-[clamp(1.4rem,6vw,2.25rem)] font-extrabold tracking-tight text-fg">
                    <CountUp value={k.v} suffix={k.s} prefix={k.p} />
                  </p>
                  <p className="mt-1 text-[13.5px] text-muted">{k.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="bg-bg-soft py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Our values" title="What we" accent="stand for" />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <div
                {...spotlightHandlers()}
                className="spotlight ring-gradient group h-full rounded-[28px] border border-line bg-surface p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <span className="grid size-13 place-items-center rounded-2xl bg-brand-soft text-brand transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-brand group-hover:text-white dark:group-hover:text-[#04131a]">
                  <v.icon className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-fg">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Milestones" title="A decade of" accent="steady growth" />
        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-line md:left-1/2 md:-translate-x-1/2">
            <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-brand-gradient" />
          </div>
          <div className="flex flex-col gap-12">
            {TIMELINE.map((t, i) => {
              const right = i % 2 === 1
              return (
                <div key={t.year} className="relative grid md:grid-cols-2 md:gap-16">
                  <span className="absolute top-6 left-5 z-10 size-4 -translate-x-1/2 rounded-full border-4 border-bg bg-brand ring-4 ring-brand/20 md:left-1/2" />
                  <Reveal className={right ? 'pl-14 md:col-start-2 md:pl-0' : 'pl-14 md:pl-0 md:text-right'} y={20}>
                    <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft transition-all duration-500 hover:shadow-card">
                      <span className="text-gradient text-3xl font-extrabold tracking-tight">{t.year}</span>
                      <h3 className="mt-2 text-lg font-bold text-fg">{t.title}</h3>
                      <p className="mt-1.5 text-[15px] text-muted">{t.text}</p>
                    </div>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="bg-bg-soft py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Leadership" title="The people behind" accent="your revenue" />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {TEAM.map((m) => (
            <StaggerItem key={m.name}>
              <div className="group relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="size-full object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12112b]/85 via-[#12112b]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="absolute inset-x-5 bottom-16 translate-y-4 text-[14px] leading-relaxed text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {m.bio}
                  </p>
                  <div className="absolute bottom-4 left-5 flex translate-y-4 gap-2 opacity-0 transition-all delay-75 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {(['linkedin', 'x'] as const).map((s) => (
                      <a
                        key={s}
                        href="#"
                        aria-label={`${m.name} on ${s}`}
                        className="grid size-8 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white hover:text-[#12112b]"
                      >
                        <SocialIcon name={s} className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-fg">{m.name}</h3>
                  <p className="text-[14px] text-brand">{m.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
