import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Process, ServiceCard } from '../components/home/Sections'
import { CTA, PageHero } from '../components/sections/Shared'
import { ButtonLink } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/bits'
import { Reveal } from '../components/ui/motion'
import { SERVICES } from '../data/services'
import { cn } from '../lib/cn'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Revenue solutions,"
        accent="end to end."
        text="Six specialised services, one accountable partner. Choose a single service or let us run your entire revenue cycle."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      >
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13.5px] font-semibold text-muted shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-fg"
            >
              <s.icon className="size-4 text-brand" />
              {s.title}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="pb-12">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard s={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Alternating deep-dives */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="A closer look" title="Built around how" accent="your practice" after="really works" />
          <div className="mt-14 flex flex-col gap-20 sm:mt-20 md:gap-32">
            {SERVICES.map((s, i) => (
              <div key={s.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn(i % 2 === 1 && 'lg:order-2')}>
                  <div className="group relative">
                    <div className="glow absolute -inset-12 opacity-30 [--glow:var(--sage)] transition-opacity duration-700 group-hover:opacity-50" />
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line shadow-lift">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12112b]/50 to-transparent" />
                      <div className="glass absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/20 p-3 pr-5 shadow-card">
                        <span className="grid size-10 place-items-center rounded-xl bg-brand text-white dark:text-[#04131a]">
                          <s.icon className="size-5" />
                        </span>
                        <div>
                          <p className="text-lg leading-none font-extrabold text-fg">
                            {s.metric.value}
                            {s.metric.suffix}
                          </p>
                          <p className="mt-1 text-[12px] text-muted">{s.metric.label}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="text-[13px] font-bold tracking-[0.2em] text-brand">0{i + 1} / 0{SERVICES.length}</span>
                  <h3 className="mt-3 text-[clamp(1.6rem,6vw,2.25rem)] font-bold text-fg">{s.title}</h3>
                  <p className="mt-4 text-[16.5px] leading-relaxed text-muted">{s.summary}</p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-[15px] font-medium text-fg">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink to={`/services/${s.slug}`} variant="secondary" arrow className="mt-9">
                    Explore {s.title}
                  </ButtonLink>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-bg-soft">
        <Process />
      </div>
      <CTA />
    </>
  )
}
