import { motion } from 'motion/react'
import { apps, type PhoneApp } from '../data/apps'
import { useLang } from '../i18n'
import { useClock } from '../useClock'
import StatusBar from './StatusBar'

type Props = { onOpen: (id: string) => void; openId: string | null }

export default function HomeScreen({ onOpen, openId }: Props) {
  const { t } = useLang()
  const { time, date } = useClock()
  const grid = apps.filter((a) => !a.dock)
  const dock = apps.filter((a) => a.dock)

  const launch = (app: PhoneApp) => {
    if (app.kind === 'link') {
      window.open(app.href, app.href?.startsWith('mailto:') ? '_self' : '_blank', 'noopener')
      return
    }
    onOpen(app.id)
  }

  return (
    <div className={`home wallpaper ${openId ? 'dimmed' : ''}`}>
      <StatusBar />
      <main className="home-col">
        <motion.section
          className="widget"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="widget-date">{date}</p>
          <p className="widget-time">{time}</p>
          <h1 className="widget-name">Robin Eliasson</h1>
          <p className="widget-role">{t('role')}</p>
        </motion.section>

        <nav className="grid" aria-label="Appar">
          {grid.map((app, i) => (
            <AppIcon key={app.id} app={app} index={i} hidden={openId === app.id} onClick={() => launch(app)} />
          ))}
        </nav>
      </main>

      <nav className="dock" aria-label="Dock">
        {dock.map((app, i) => (
          <AppIcon key={app.id} app={app} index={grid.length + i} label={false} onClick={() => launch(app)} />
        ))}
      </nav>
    </div>
  )
}

function AppIcon({
  app,
  index,
  onClick,
  hidden = false,
  label = true,
}: {
  app: PhoneApp
  index: number
  onClick: () => void
  hidden?: boolean
  label?: boolean
}) {
  const { t } = useLang()
  const name = app.nameKey ? t(app.nameKey) : app.name
  return (
    <motion.button
      type="button"
      className="app-icon"
      onClick={onClick}
      aria-label={name}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 + index * 0.045, type: 'spring', stiffness: 380, damping: 22 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span className="tile" layoutId={`app-${app.id}`} style={{ opacity: hidden ? 0 : 1 }}>
        {app.icon}
      </motion.span>
      {label && <span className="app-label">{name}</span>}
    </motion.button>
  )
}
