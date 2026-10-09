import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

/** Fade/slide content in as it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </M>
  )
}

/** Parent that staggers any children using the `fadeUp` variant. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

/** Heading that reveals word by word. */
export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(' ').filter(Boolean).map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: EASE_OUT }}
          >
            {w}
            {' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Number that counts up when scrolled into view. */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals,
  duration = 2,
  className,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const d = decimals ?? (Number.isInteger(value) ? 0 : 1)
  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
  const [display, setDisplay] = useState(fmt(0))

  useEffect(() => {
    if (!inView) return
    if (reduce) return setDisplay(fmt(value))
    const c = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(fmt(v)),
    })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, d, duration, reduce])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/** Wrapper that gently pulls toward the cursor. */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Sets --mx / --my on the element so `.spotlight` can follow the cursor. */
export function spotlightHandlers() {
  return {
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    },
  }
}
