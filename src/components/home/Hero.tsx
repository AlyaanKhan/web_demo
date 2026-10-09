import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BadgeCheck, CircleCheck, Play, ShieldCheck, Star, TrendingUp } from 'lucide-react'
import { useRef } from 'react'
import { ButtonLink } from '../ui/Button'
import { Aurora, Eyebrow } from '../ui/bits'
import { CountUp, EASE_OUT } from '../ui/motion'

const AVATARS = ['/images/avatar-f1.jpg', '/images/avatar-m2.jpg', '/images/avatar-f4.jpg', '/images/avatar-m1.jpg']

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-36 md:pt-44 lg:pb-28">
      <Aurora />
      <div className="bg-grid mask-radial absolute inset-0 -z-0 opacity-70" aria-hidden />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
        <div className="flex flex-col items-start">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Eyebrow icon={<BadgeCheck className="size-3.5" />}>Revenue Cycle Management · RCM Solutions</Eyebrow>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.2rem,9.5vw,3.75rem)] leading-[1.04] font-extrabold tracking-[-0.04em] text-fg lg:text-[clamp(3.1rem,4.6vw,4.4rem)]">
            {['Superior revenue', 'results for'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: EASE_OUT }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
              >
                <span className="font-accent text-gradient pr-2 text-[1.14em] font-normal">premier</span>
                healthcare.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Specialized financial workflows and meticulous auditing that turn every claim into collected revenue, so your
            team can focus on patients instead of paperwork.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <ButtonLink to="/contact" size="lg" arrow>
              Get a free revenue audit
            </ButtonLink>
            <ButtonLink to="/services" size="lg" variant="secondary">
              <span className="grid size-6 place-items-center rounded-full bg-brand-soft text-brand">
                <Play className="size-3 fill-current" />
              </span>
              Explore services
            </ButtonLink>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
          >
            <div className="flex -space-x-3">
              {AVATARS.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt=""
                  className="size-11 rounded-full border-[3px] border-bg object-cover shadow-soft"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.08 }}
                />
              ))}
              <span className="grid size-11 place-items-center rounded-full border-[3px] border-bg bg-ink text-[11px] font-bold text-white dark:bg-brand dark:text-[#04131a]">
                350+
              </span>
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
                <span className="ml-1.5 text-sm font-bold text-fg">4.9/5</span>
              </div>
              <p className="mt-0.5 text-[13.5px] text-muted">Trusted by 350+ practices nationwide</p>
            </div>
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

const CHART = 'M0,150 C40,140 60,118 100,122 C140,126 160,96 200,92 C240,88 260,104 300,84 C340,64 360,70 400,52 C440,34 470,40 520,18'

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5])
  const fx = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const fy = useTransform(sy, [-0.5, 0.5], [-14, 14])
  const fxInv = useTransform(fx, (v) => -v)
  const fyInv = useTransform(fy, (v) => -v)

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[580px] [perspective:1400px]"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: EASE_OUT }}
    >
      {/* Glow ring */}
      <div className="glow absolute -inset-16 -z-10 opacity-35 [--glow:var(--sage)] dark:opacity-30 dark:[--glow:var(--violet)]" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-[24px] border border-line bg-surface p-4 shadow-lift sm:rounded-[28px] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              Revenue collected · Live
            </p>
            <p className="mt-2 text-[clamp(1.6rem,8vw,2.5rem)] leading-none font-extrabold tracking-[-0.03em] text-fg">
              <CountUp value={1284560} prefix="$" duration={2.4} />
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="size-3.5" /> +18.2% vs last month
            </span>
          </div>
          <div className="hidden rounded-full border border-line bg-surface-2 p-1 text-[11.5px] font-semibold text-muted sm:flex">
            {['7D', '30D', '90D'].map((t) => (
              <span key={t} className={t === '30D' ? 'rounded-full bg-surface px-2.5 py-1 text-fg shadow-soft' : 'px-2.5 py-1'}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="relative mt-6 h-36 sm:h-44">
          <svg viewBox="0 0 520 170" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            <defs>
              <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--brand)" stopOpacity=".28" />
                <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hero-line" x1="0" x2="1">
                <stop offset="0" stopColor="var(--violet)" />
                <stop offset=".6" stopColor="var(--brand)" />
                <stop offset="1" stopColor="var(--sage)" />
              </linearGradient>
            </defs>
            {[30, 70, 110, 150].map((y) => (
              <line key={y} x1="0" x2="520" y1={y} y2={y} stroke="var(--border)" strokeDasharray="4 6" />
            ))}
            <motion.path
              d={`${CHART} L520,170 L0,170 Z`}
              fill="url(#hero-area)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
            />
            <motion.path
              d={CHART}
              fill="none"
              stroke="url(#hero-line)"
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          {/* End-point marker */}
          <motion.div
            className="absolute top-[6%] right-0 translate-x-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.6, type: 'spring' }}
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand" />
            <span className="relative block size-3.5 rounded-full border-[3px] border-surface bg-brand" />
          </motion.div>
          <motion.div
            className="absolute top-[-6%] right-6 rounded-lg bg-fg px-2.5 py-1 text-[11px] font-bold text-bg shadow-card"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.75 }}
          >
            $48.2K today
          </motion.div>
        </div>

        <div className="mt-2 flex justify-between px-1 text-[11px] font-medium text-subtle">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-2.5">
          {[
            { label: 'Clean claims', value: 98.6, suffix: '%' },
            { label: 'Days in A/R', value: 24, suffix: '' },
            { label: 'Denial rate', value: 3.1, suffix: '%' },
          ].map((k) => (
            <div key={k.label} className="min-w-0 rounded-2xl border border-line bg-surface-2/60 p-2.5 sm:p-3.5">
              <p className="truncate text-[10.5px] font-semibold text-muted sm:text-[11.5px]">{k.label}</p>
              <p className="mt-1 text-base font-extrabold tracking-tight text-fg sm:text-xl">
                <CountUp value={k.value} suffix={k.suffix} duration={2} />
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating: claim approved */}
      <motion.div style={{ x: fx, y: fy }} className="absolute top-[46%] -left-2 sm:-left-14">
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.9, type: 'spring', stiffness: 160, damping: 16 }}
          className="glass flex animate-float items-center gap-3 rounded-2xl border border-line p-3 pr-4 shadow-lift"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
            <CircleCheck className="size-5" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-fg">Claim approved</p>
            <p className="text-[11.5px] text-muted">#SFE-48213 · $1,240.00</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating: collection ring */}
      <motion.div style={{ x: fxInv, y: fyInv }} className="absolute -right-2 -bottom-12 sm:-right-10 sm:-bottom-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.1, type: 'spring', stiffness: 160, damping: 16 }}
          className="glass flex animate-float-slow items-center gap-3.5 rounded-2xl border border-line p-3.5 pr-5 shadow-lift"
        >
          <div className="relative size-14">
            <svg viewBox="0 0 56 56" className="size-14 -rotate-90">
              <circle cx="28" cy="28" r="23" fill="none" stroke="var(--border)" strokeWidth="6" />
              <motion.circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="url(#hero-line)"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.98 }}
                transition={{ delay: 2.3, duration: 1.6, ease: EASE_OUT }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[13px] font-extrabold text-fg">98%</span>
          </div>
          <div>
            <p className="text-[13px] font-bold text-fg">Collection efficiency</p>
            <p className="text-[11.5px] text-muted">Top 5% nationally</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating: HIPAA chip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
        className="glass absolute -top-5 right-8 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] font-bold text-fg shadow-card"
      >
        <ShieldCheck className="size-3.5 text-brand" /> HIPAA-aligned
      </motion.div>
    </motion.div>
  )
}
