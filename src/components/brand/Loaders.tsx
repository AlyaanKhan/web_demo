import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LogoMark } from './Logo'

const EASE = [0.76, 0, 0.24, 1] as const
const WORD = 'Strategies for Excellence'

/** First-load splash: the mark assembles, the wordmark types in, then the screen wipes away. */
export function SplashLoader({ onReveal, onDone }: { onReveal?: () => void; onDone?: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const minDelay = new Promise((r) => setTimeout(r, 2300))
    const fonts = document.fonts?.ready ?? Promise.resolve()
    let alive = true
    Promise.all([minDelay, fonts]).then(() => {
      if (!alive) return
      setVisible(false)
      onReveal?.()
      document.documentElement.style.overflow = ''
    })
    return () => {
      alive = false
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: EASE }}
          role="status"
          aria-label="Loading Strategies for Excellence"
        >
          {/* Ambient brand glow */}
          <motion.div
            className="glow absolute size-[min(760px,140vw)] [--glow:var(--sage)]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ y: -40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <LogoMark height={104} mode="intro" title="Strategies for Excellence" />

            <div className="mt-7 flex overflow-hidden text-xl font-extrabold tracking-[-0.02em] text-fg sm:text-2xl" aria-hidden>
              {WORD.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.95 + i * 0.022, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block whitespace-pre"
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="mt-2 flex items-center gap-3 text-[10.5px] font-bold tracking-[0.42em] text-brand"
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em' }}
              transition={{ delay: 1.45, duration: 0.8, ease: 'easeOut' }}
            >
              <span className="h-px w-8 bg-current opacity-40" />
              RCM SOLUTIONS
              <span className="h-px w-8 bg-current opacity-40" />
            </motion.div>

            {/* Progress line */}
            <div className="mt-10 h-[3px] w-48 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-brand-gradient"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.1, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export type CurtainPhase = 'idle' | 'cover' | 'reveal'

/** Route-change curtain: layered panels sweep up with the bouncing mark in the middle. */
export function RouteCurtain({ phase }: { phase: CurtainPhase }) {
  const panel = (delay: number) => ({
    idle: { y: '100%', transition: { duration: 0 } },
    cover: { y: '0%', transition: { duration: 0.5, ease: EASE, delay } },
    reveal: { y: '-100%', transition: { duration: 0.55, ease: EASE, delay: 0.06 - delay } },
  })

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden={phase === 'idle'}>
      <motion.div className="absolute inset-0 bg-brand-gradient" variants={panel(0)} initial="idle" animate={phase} />
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-bg"
        variants={panel(0.06)}
        initial="idle"
        animate={phase}
      >
        <motion.div
          initial={false}
          animate={phase === 'cover' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, delay: phase === 'cover' ? 0.2 : 0 }}
          className="flex flex-col items-center gap-4"
        >
          {phase !== 'idle' && <LogoMark height={64} mode="wave" />}
          <span className="text-[10px] font-bold tracking-[0.4em] text-subtle">LOADING</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
