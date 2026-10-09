import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal, SplitWords } from './motion'

export function Eyebrow({ children, className, icon }: { children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-2 text-[12.5px] font-semibold text-muted shadow-soft',
        className,
      )}
    >
      <span className="grid size-5 place-items-center rounded-full bg-brand-soft text-brand">
        {icon ?? <span className="size-1.5 rounded-full bg-brand" />}
      </span>
      {children}
    </span>
  )
}

/**
 * Section heading. `title` is plain text revealed word by word; `accent` is set in the
 * italic serif with the brand gradient for an editorial touch.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  after,
  text,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: string
  accent?: string
  after?: string
  text?: ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-5', align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-2xl', className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <h2 className="text-[clamp(1.85rem,6.5vw,3rem)] leading-[1.08] font-bold text-fg">
        <SplitWords text={title} />
        {accent &&
          accent.split(' ').map((w, i) => (
            <motion.span
              key={i}
              className="font-accent text-gradient inline-block pr-[0.22em] text-[1.12em]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
        {after && (
          <>
            {' '}
            <SplitWords text={after} delay={0.35} />
          </>
        )}
      </h2>
      {text && (
        <Reveal delay={0.15}>
          <p className="text-[16px] leading-relaxed text-muted sm:text-[17px]">{text}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Marquee({
  children,
  duration = 40,
  reverse,
  className,
}: {
  children: ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={cn('group mask-fade-x flex overflow-hidden', className)}>
      <div
        className="flex w-max shrink-0 animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={{ ['--marquee-duration' as string]: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {children}
        <div aria-hidden className="flex gap-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Accordion({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div
            key={it.q}
            className={cn(
              'overflow-hidden rounded-2xl border bg-surface transition-all duration-300',
              isOpen ? 'border-brand/30 shadow-card' : 'border-line hover:border-line-strong',
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
              <span className="text-[15px] font-semibold text-fg sm:text-[16px]">{it.q}</span>
              <span
                className={cn(
                  'grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300',
                  isOpen ? 'rotate-45 border-brand bg-brand text-white dark:text-[#04131a]' : 'border-line text-muted',
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-6 text-[15px] leading-relaxed text-muted sm:px-6">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/** Soft ambient blobs used behind hero sections. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="glow absolute -top-48 left-[2%] size-[min(720px,120vw)] opacity-40 [--glow:#8db5aa] will-change-transform motion-safe:animate-float-slow dark:opacity-20" />
      <div className="glow absolute -top-10 right-[-6%] size-[min(640px,110vw)] opacity-25 [--glow:#4a4670] will-change-transform motion-safe:animate-float dark:opacity-45" />
      <div className="glow absolute top-[40%] left-[35%] size-[min(520px,90vw)] opacity-20 [--glow:#0f7c7a] max-md:hidden dark:opacity-35" />
    </div>
  )
}

/** Hand-drawn social glyphs (lucide v1 no longer ships brand icons). */
export function SocialIcon({ name, className }: { name: 'linkedin' | 'facebook' | 'instagram' | 'x'; className?: string }) {
  const p = { className: cn('size-4', className), viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'linkedin':
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...p}>
          <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h2.5l.5-4h-3V7.5a.5.5 0 0 1 .5-.5H16V3z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5v.01" />
        </svg>
      )
    case 'x':
      return (
        <svg {...p}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      )
  }
}
