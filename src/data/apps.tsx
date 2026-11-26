import type { ReactNode } from 'react'
import type { StringKey } from '../i18n'
import About from '../apps/About'
import Projects from '../apps/Projects'
import Contact from '../apps/Contact'
import Settings from '../apps/Settings'

/**
 * Alla appar på hemskärmen.
 * Lägg till en ny app genom att lägga till ett objekt här.
 *
 * kind: 'web'    -> din Expo web-export i public/apps/<id>/ visas i telefonen
 * kind: 'native' -> en React-komponent i src/apps/
 */
export type PhoneApp = {
  id: string
  name: string
  nameKey?: StringKey // översatt namn (för Om mig, Projekt osv.)
  icon: ReactNode
  descKey?: StringKey
  playUrl?: string
  sourceUrl?: string
  dock?: boolean
  href?: string // öppnar en länk i stället för ett fönster
} & ({ kind: 'web'; src: string } | { kind: 'native'; Component: () => ReactNode } | { kind: 'link' })

const img = (src: string) => <img src={src} alt="" draggable={false} />

const glyph = (bg: string, svg: ReactNode) => (
  <div className="glyph" style={{ background: bg }}>
    {svg}
  </div>
)

export const apps: PhoneApp[] = [
  {
    id: 'forsta',
    name: 'Förstå',
    kind: 'web',
    src: 'apps/forsta/',
    icon: img('icons/forsta.png'),
    descKey: 'forstaDesc',
    playUrl: 'https://play.google.com/store/apps/details?id=com.robba.farsta',
  },
  {
    id: 'subslayer',
    name: 'SubSlayer',
    kind: 'web',
    src: 'apps/subslayer/',
    icon: img('icons/subslayer.png'),
    descKey: 'subslayerDesc',
    playUrl: 'https://play.google.com/store/apps/details?id=com.robba.SuBSlayer',
  },
  {
    id: 'duck-watch',
    name: 'Duck Watch',
    kind: 'web',
    src: 'apps/duck-watch/',
    icon: img('icons/duckwatch.svg'),
    descKey: 'duckDesc',
  },
  {
    id: 'about',
    name: 'Om mig',
    nameKey: 'about',
    kind: 'native',
    Component: About,
    icon: glyph(
      'linear-gradient(160deg,#FFC531,#FF7A2F)',
      <span className="glyph-letter">R</span>,
    ),
  },
  {
    id: 'projects',
    name: 'Projekt',
    nameKey: 'projects',
    kind: 'native',
    Component: Projects,
    icon: (
      <div className="glyph folder">
        <i style={{ background: '#1F8A84' }} />
        <i style={{ background: '#7B3FE4' }} />
        <i style={{ background: '#FF7A2F' }} />
        <i style={{ background: '#2D6CDF' }} />
      </div>
    ),
  },
  {
    id: 'contact',
    name: 'Kontakt',
    nameKey: 'contact',
    kind: 'native',
    Component: Contact,
    icon: glyph(
      'linear-gradient(160deg,#5B8CFF,#2D57D6)',
      <svg viewBox="0 0 24 24" width="56%" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m3.8 7 8.2 6 8.2-6" />
      </svg>,
    ),
  },
  {
    id: 'settings',
    name: 'Inställningar',
    nameKey: 'settings',
    kind: 'native',
    Component: Settings,
    icon: glyph(
      'linear-gradient(160deg,#9A9AA2,#5E5E66)',
      <svg viewBox="0 0 24 24" width="58%" fill="none" stroke="#fff" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5" strokeLinecap="round" />
      </svg>,
    ),
  },
  // Dock
  {
    id: 'mail',
    name: 'Mejl',
    kind: 'link',
    dock: true,
    href: 'mailto:robbaflow@gmail.com',
    icon: glyph(
      'linear-gradient(160deg,#FFFFFF,#E9E9EE)',
      <svg viewBox="0 0 24 24" width="56%" fill="none" stroke="#2D57D6" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m3.8 7 8.2 6 8.2-6" />
      </svg>,
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    kind: 'link',
    dock: true,
    href: 'https://www.linkedin.com/in/robin-eliasson',
    icon: glyph('#0A66C2', <span className="glyph-letter small">in</span>),
  },
  {
    id: 'github',
    name: 'GitHub',
    kind: 'link',
    dock: true,
    href: 'https://github.com/Robbaeli',
    icon: glyph(
      '#1A1A1E',
      <svg viewBox="0 0 24 24" width="58%" fill="#fff">
        <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.2-1.2-3.2-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1 2.9.8.1-.6.3-1 .6-1.3-2.1-.2-4.3-1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.3 4.5-4.4 4.7.3.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />
      </svg>,
    ),
  },
]
