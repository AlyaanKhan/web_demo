import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { createContext, useCallback, useContext, useState, type MouseEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { cn } from '../../lib/cn'

type Theme = 'light' | 'dark'
type Ctx = { theme: Theme; toggle: (e?: MouseEvent) => void }

const ThemeContext = createContext<Ctx | null>(null)

const apply = (t: Theme) => {
  document.documentElement.classList.toggle('dark', t === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#08081a' : '#ffffff')
  try {
    localStorage.setItem('sfe-theme', t)
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Light is the default; index.html restores a saved dark preference before first paint.
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  const toggle = useCallback(
    (e?: MouseEvent) => {
      const next: Theme = theme === 'light' ? 'dark' : 'light'
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const swap = () =>
        flushSync(() => {
          setTheme(next)
          apply(next)
        })

      if (!document.startViewTransition || reduce) return swap()

      // Circular reveal from the toggle button.
      const x = e?.clientX ?? window.innerWidth - 40
      const y = e?.clientY ?? 40
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      const vt = document.startViewTransition(swap)
      vt.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(.7,0,.3,1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
    },
    [theme],
  )

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={cn(
        'relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-surface text-fg transition-all duration-300 hover:border-line-strong hover:shadow-soft active:scale-95',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
