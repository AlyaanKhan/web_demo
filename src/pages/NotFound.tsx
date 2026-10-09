import { motion } from 'framer-motion'
import { LogoMark } from '../components/brand/Logo'
import { ButtonLink } from '../components/ui/Button'
import { Aurora } from '../components/ui/bits'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[90vh] place-items-center overflow-hidden pt-32 pb-20">
      <Aurora />
      <div className="container-x relative flex flex-col items-center text-center">
        <LogoMark height={90} mode="wave" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gradient mt-10 text-[clamp(6rem,30vw,11rem)] leading-none font-extrabold tracking-[-0.06em]"
        >
          404
        </motion.h1>
        <h2 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">This claim got denied.</h2>
        <p className="mt-3 max-w-md text-muted">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Contact support
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
