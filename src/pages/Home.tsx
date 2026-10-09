import { Hero } from '../components/home/Hero'
import {
  Comparison,
  FaqSection,
  PlatformMarquee,
  PremiumChoice,
  Process,
  ServicesBento,
  Testimonials,
} from '../components/home/Sections'
import { CTA } from '../components/sections/Shared'

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformMarquee />
      <PremiumChoice />
      <ServicesBento />
      <Process />
      <Comparison />
      <Testimonials />
      <FaqSection />
      <CTA />
    </>
  )
}
