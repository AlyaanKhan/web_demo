// Company details. Name, phone and email are real; everything else on the site is demo data.
export const SITE = {
  name: 'Strategies for Excellence',
  short: 'SfE',
  tagline: 'RCM Solutions',
  phone: '(458) 321-0954',
  phoneHref: 'tel:+14583210954',
  email: 'info@sfe.com',
  emailHref: 'mailto:info@sfe.com',
  address: '1200 Market Street, Suite 400, Portland, OR 97201', // demo
  hours: 'Mon to Fri, 8:00 AM to 6:00 PM PT', // demo
  socials: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    x: '#',
  },
} as const

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const
