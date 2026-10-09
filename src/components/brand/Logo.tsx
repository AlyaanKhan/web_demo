import { motion, type Variants } from 'framer-motion'
import { useId } from 'react'
import { cn } from '../../lib/cn'
import { LETTERS, MARK_CIRCLES, MARK_VIEWBOX, type LetterSet } from './logoPaths'

/** The original reference reads "SfS"; the company is Strategies for Excellence, so "SfE" is used site-wide. */
export const LOGO_LETTERS: LetterSet = 'SfE'

type Mode = 'static' | 'intro' | 'wave' | 'hover'

const EASE = [0.22, 1, 0.36, 1] as const

const bubble: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.13, type: 'spring', stiffness: 260, damping: 18 },
  }),
  wave: (i: number) => ({
    y: [0, -14, 0, 0],
    transition: { duration: 1.1, times: [0, 0.3, 0.6, 1], delay: i * 0.14, repeat: Infinity, ease: 'easeInOut' },
  }),
  rest: { y: 0 },
  hover: (i: number) => ({
    y: [0, -7, 0],
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeInOut' },
  }),
}

const letter: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.55 + i * 0.1, duration: 0.6, ease: EASE },
  }),
}

type MarkProps = {
  height?: number
  mode?: Mode
  letters?: LetterSet
  className?: string
  title?: string
}

/** The three-circle SfE monogram, drawn from vector glyph outlines. */
export function LogoMark({ height = 36, mode = 'static', letters = LOGO_LETTERS, className, title }: MarkProps) {
  const id = useId().replace(/:/g, '')
  const { w, h } = MARK_VIEWBOX
  const pad = 8
  const glyphs = LETTERS[letters]

  // 'hover' inherits rest/hover labels from a parent motion element (see <Logo/>).
  const groupProps =
    mode === 'intro' ? { initial: 'hidden', animate: 'show' } : mode === 'wave' ? { initial: 'rest', animate: 'wave' } : {}

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`}
      height={height}
      width={(height * (w + pad * 2)) / (h + pad * 2)}
      className={cn('shrink-0 overflow-visible', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2="0">
          <stop offset="0" style={{ stopColor: 'var(--logo-1, #1E1B3F)' }} />
          <stop offset=".38" style={{ stopColor: 'var(--logo-2, #46426E)' }} />
          <stop offset=".64" style={{ stopColor: 'var(--logo-3, #3C6F70)' }} />
          <stop offset="1" style={{ stopColor: 'var(--logo-4, #A3C2B9)' }} />
        </linearGradient>
        <filter id={`${id}-s`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-2.5" dy="0" stdDeviation="2" floodColor="#0b0a1f" floodOpacity=".3" />
        </filter>
        {mode === 'intro' && (
          <>
            <clipPath id={`${id}-c`}>
              {MARK_CIRCLES.map((c) => (
                <circle key={c.cx} cx={c.cx} cy={c.cy} r={c.r} />
              ))}
            </clipPath>
            <linearGradient id={`${id}-sh`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".45" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </>
        )}
      </defs>

      {MARK_CIRCLES.map((c, i) => (
        <motion.g
          key={c.cx}
          custom={i}
          variants={mode === 'static' ? undefined : bubble}
          {...groupProps}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <circle cx={c.cx} cy={c.cy} r={c.r} fill={`url(#${id}-g)`} filter={i ? `url(#${id}-s)` : undefined} />
          <motion.path
            d={glyphs[i]}
            fill="#fff"
            custom={i}
            variants={mode === 'intro' ? letter : undefined}
          />
        </motion.g>
      ))}

      {mode === 'intro' && (
        <g clipPath={`url(#${id}-c)`}>
          <motion.rect
            y={-10}
            height={h + 20}
            width={90}
            fill={`url(#${id}-sh)`}
            initial={{ x: -120 }}
            animate={{ x: w + 40 }}
            transition={{ delay: 1.05, duration: 1.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
            style={{ mixBlendMode: 'overlay' }}
          />
        </g>
      )}
    </svg>
  )
}

/** Horizontal lockup: mark + wordmark. Text is live so it adapts to the theme. */
export function Logo({ className, collapse = false }: { className?: string; collapse?: boolean }) {
  return (
    <motion.span initial="rest" whileHover="hover" animate="rest" className={cn('flex items-center gap-2.5', className)}>
      <LogoMark height={collapse ? 34 : 32} mode="hover" title="Strategies for Excellence" />
      {/* collapse: phones show the mark only, keeping the header uncluttered */}
      <span className={cn('min-w-0 flex-col leading-none', collapse ? 'hidden sm:flex' : 'flex')}>
        <span className="text-[15px] font-extrabold tracking-[-0.02em] whitespace-nowrap text-fg">Strategies for Excellence</span>
        <span className="mt-1 text-[9.5px] font-bold tracking-[0.3em] text-brand">RCM SOLUTIONS</span>
      </span>
    </motion.span>
  )
}

/** Three bouncing dots in the logo's colours, for buttons and inline loading states. */
export function LogoDots({ className }: { className?: string }) {
  const colors = ['var(--logo-1)', 'var(--logo-2-5, #415a70)', 'var(--logo-4)']
  return (
    <span className={cn('inline-flex items-center gap-1', className)} aria-hidden>
      {colors.map((c, i) => (
        <motion.span
          key={i}
          className="size-2 rounded-full"
          style={{ background: c }}
          animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </span>
  )
}
