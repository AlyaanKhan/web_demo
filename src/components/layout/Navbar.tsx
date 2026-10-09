import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Mail, Menu, Phone, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import { cn } from '../../lib/cn'
import { NAV, SITE } from '../../lib/site'
import { Logo } from '../brand/Logo'
import { ThemeToggle } from '../theme/theme'
import { ButtonLink } from '../ui/Button'

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [mega, setMega] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const { pathname } = useLocation()
  const closeTimer = useRef<number | undefined>(undefined)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 420 && y > prev && !mega && !mobile)
  })

  useEffect(() => {
    setMobile(false)
    setMega(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMega(true)
  }
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 120)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Utility bar */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
          className="hidden overflow-hidden bg-brand-gradient text-white md:block"
        >
          <div className="container-x flex h-9 items-center justify-between text-[12.5px] font-medium">
            <p className="flex items-center gap-2 text-white/90">
              <Sparkles className="size-3.5" />
              Now onboarding new practices. Get a free 90-day revenue audit.
            </p>
            <div className="flex items-center gap-5 text-white/90">
              <a href={SITE.phoneHref} className="flex items-center gap-1.5 transition hover:text-white">
                <Phone className="size-3.5" /> {SITE.phone}
              </a>
              <a href={SITE.emailHref} className="flex items-center gap-1.5 transition hover:text-white">
                <Mail className="size-3.5" /> {SITE.email}
              </a>
            </div>
          </div>
        </motion.div>

        <div className="container-x pt-3">
          <nav
            className={cn(
              'flex h-16 items-center justify-between gap-3 rounded-2xl border pr-2 pl-3 transition-all duration-500 sm:pr-2.5 sm:pl-4',
              scrolled || mega ? 'glass-blur border-line shadow-card' : 'border-transparent bg-transparent',
            )}
            aria-label="Main"
          >
            <Link to="/" aria-label="Strategies for Excellence, home" className="min-w-0 rounded-xl">
              <Logo collapse />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
              {NAV.map((item) => {
                const isServices = item.to === '/services'
                return (
                  <li
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => {
                      setHovered(item.to)
                      if (isServices) openMega()
                    }}
                    onMouseLeave={isServices ? closeMega : undefined}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'relative z-10 flex items-center gap-1 rounded-full px-3 py-2 text-[14px] font-semibold transition-colors xl:px-4',
                          isActive ? 'text-fg' : 'text-muted hover:text-fg',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isServices && <ChevronDown className={cn('size-3.5 transition-transform', mega && 'rotate-180')} />}
                          {isActive && (
                            <motion.span
                              layoutId="nav-active"
                              className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                    {hovered === item.to && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-surface-2"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-2">
              {/* On phones the theme switch lives inside the menu sheet */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <ButtonLink to="/contact" size="sm" arrow className="hidden h-10 px-5 md:inline-flex">
                Free Audit
              </ButtonLink>
              <button
                type="button"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
                onClick={() => setMobile((v) => !v)}
                aria-label={mobile ? 'Close menu' : 'Open menu'}
                aria-expanded={mobile}
              >
                {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>

          {/* Services mega menu */}
          <AnimatePresence>
            {mega && (
              <motion.div
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="glass-blur absolute inset-x-0 mx-auto mt-2 hidden w-[min(980px,calc(100%-2.5rem))] origin-top rounded-3xl border border-line p-3 shadow-lift lg:block"
              >
                <div className="grid grid-cols-[1fr_280px] gap-3">
                  <div className="grid grid-cols-2 gap-1">
                    {SERVICES.map((s, i) => (
                      <motion.div
                        key={s.slug}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * i }}
                      >
                        <Link
                          to={`/services/${s.slug}`}
                          className="group flex gap-3.5 rounded-2xl p-3.5 transition-colors hover:bg-surface-2"
                        >
                          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-brand shadow-soft transition-all duration-300 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand group-hover:text-white dark:group-hover:text-[#04131a]">
                            <s.icon className="size-5" strokeWidth={1.8} />
                          </span>
                          <span>
                            <span className="flex items-center gap-1 text-[14.5px] font-bold text-fg">
                              {s.title}
                              <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                            <span className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-muted">{s.short}</span>
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="noise group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-brand-gradient p-5 text-white"
                  >
                    <img
                      src="/images/analytics-2.jpg"
                      alt=""
                      className="absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="relative text-[11px] font-bold tracking-[0.2em] text-white/70">FREE FOR NEW CLIENTS</span>
                    <span className="relative mt-2 text-xl leading-tight font-bold">
                      Get your 90-day <span className="font-accent text-2xl">revenue audit</span>
                    </span>
                    <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                      Book now <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.nav
              className="container-x flex h-full flex-col overflow-y-auto pt-24 pb-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {NAV.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                  className="border-b border-line"
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn('flex items-center justify-between py-4 text-[clamp(1.5rem,7vw,1.9rem)] font-bold', isActive ? 'text-brand' : 'text-fg')
                    }
                  >
                    {item.label}
                    <ArrowUpRight className="size-6 text-subtle" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-auto flex flex-col gap-3 pt-8">
                <div className="mb-2 flex items-center justify-between rounded-2xl border border-line bg-surface-2 px-4 py-3">
                  <span className="text-[15px] font-semibold text-fg">Appearance</span>
                  <ThemeToggle />
                </div>
                <a href={SITE.phoneHref} className="flex items-center gap-3 text-muted">
                  <Phone className="size-4 text-brand" /> {SITE.phone}
                </a>
                <a href={SITE.emailHref} className="flex items-center gap-3 text-muted">
                  <Mail className="size-4 text-brand" /> {SITE.email}
                </a>
                <ButtonLink to="/contact" size="lg" arrow className="mt-4 w-full">
                  Get a Free Revenue Audit
                </ButtonLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
