import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-all duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_10px_30px_-10px_var(--brand)] hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_18px_40px_-12px_var(--brand)] dark:text-[#04131a]',
  secondary:
    'border border-line-strong bg-surface text-fg shadow-soft hover:-translate-y-0.5 hover:border-fg/25 hover:shadow-card',
  ghost: 'text-fg hover:bg-surface-2',
  light: 'bg-white text-[#14132e] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.4)] hover:-translate-y-0.5 hover:bg-white/90',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5.5 text-sm',
  lg: 'h-13 px-7 text-[15px]',
}

type Common = { variant?: Variant; size?: Size; arrow?: boolean; className?: string; children: ReactNode }

function Inner({ children, arrow, variant }: Pick<Common, 'children' | 'arrow' | 'variant'>) {
  return (
    <>
      {/* Shine sweep */}
      {(variant === 'primary' || variant === 'light') && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
      {arrow && (
        <span className="relative -mr-1 grid size-5 place-items-center overflow-hidden">
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-5" />
          <ArrowRight className="absolute size-4 -translate-x-5 transition-transform duration-300 group-hover/btn:translate-x-0" />
        </span>
      )}
    </>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow,
  className,
  children,
  ...rest
}: Common & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner arrow={arrow} variant={variant}>
        {children}
      </Inner>
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow,
  className,
  children,
  to,
  href,
}: Common & { to?: string; href?: string }) {
  const cls = cn(base, variants[variant], sizes[size], className)
  if (href)
    return (
      <a href={href} className={cls}>
        <Inner arrow={arrow} variant={variant}>
          {children}
        </Inner>
      </a>
    )
  return (
    <Link to={to ?? '/'} className={cls}>
      <Inner arrow={arrow} variant={variant}>
        {children}
      </Inner>
    </Link>
  )
}
