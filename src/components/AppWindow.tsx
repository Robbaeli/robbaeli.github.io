import { useEffect } from 'react'
import { motion } from 'motion/react'
import type { PhoneApp } from '../data/apps'
import { useLang } from '../i18n'

const spring = { type: 'spring', stiffness: 260, damping: 30 } as const

export default function AppWindow({ app, onClose }: { app: PhoneApp; onClose: () => void }) {
  const { t } = useLang()
  const name = app.nameKey ? t(app.nameKey) : app.name

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="window-layer" role="dialog" aria-modal="true" aria-label={name}>
      <motion.div
        className="backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <div className="window-row">
        <motion.div className="window" layoutId={`app-${app.id}`} transition={spring}>
          <motion.div
            className="window-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.18 } }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
          >
            {app.kind === 'web' && <iframe src={app.src} title={name} loading="eager" />}
            {app.kind === 'native' && <app.Component />}
          </motion.div>
          <button type="button" className="home-bar" onClick={onClose} aria-label={t('home')}>
            <span />
          </button>
        </motion.div>

        {app.kind === 'web' && (
          <motion.aside
            className="caption"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.25 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <h2>{name}</h2>
            {app.descKey && <p>{t(app.descKey)}</p>}
            <p className="muted">{t('tryIt')}</p>
            <div className="caption-links">
              {app.playUrl && (
                <a href={app.playUrl} target="_blank" rel="noopener">
                  {t('openPlay')}
                </a>
              )}
              {app.sourceUrl && (
                <a href={app.sourceUrl} target="_blank" rel="noopener">
                  {t('source')}
                </a>
              )}
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  )
}
