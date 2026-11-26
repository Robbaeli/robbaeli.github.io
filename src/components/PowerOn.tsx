import { useRef, useState } from 'react'
import { motion, useAnimate, useReducedMotion } from 'motion/react'
import { useLang } from '../i18n'
import LangToggle from './LangToggle'

type Phase = 'off' | 'booting' | 'zooming'

const SCREEN_W = 276
const SCREEN_H = 598

export default function PowerOn({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>('off')
  const [scope, animate] = useAnimate()
  const reduce = useReducedMotion()
  const started = useRef(false)

  const powerOn = async () => {
    if (started.current) return
    started.current = true
    if (reduce) return onDone()

    setPhase('booting')
    // 1. Knappen trycks in, telefonen vaknar
    await animate('.side-button', { x: [0, -3, 0] }, { duration: 0.25 })
    await new Promise((r) => setTimeout(r, 1500))

    // 2. Flyg in i skärmen
    setPhase('zooming')
    const scale = Math.max(window.innerWidth / SCREEN_W, window.innerHeight / SCREEN_H) * 1.12
    animate('.hint, .skip, .lang-toggle', { opacity: 0 }, { duration: 0.3 })
    await animate(
      '.phone',
      { scale, rotateX: [6, 0], rotateY: [-14, 0] },
      { duration: 1.25, ease: [0.76, 0, 0.18, 1] },
    )
    onDone()
  }

  return (
    <div className="power" ref={scope}>
      <LangToggle />

      <div className="phone-stage">
        <motion.div
          className="phone"
          initial={{ opacity: 0, y: 30, rotateX: 6, rotateY: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformPerspective: 1400 }}
        >
          <span className="vol v1" aria-hidden />
          <span className="vol v2" aria-hidden />
          <button
            type="button"
            className="side-button"
            onClick={powerOn}
            aria-label={t('powerOn')}
            disabled={phase !== 'off'}
          />
          <div className="screen" onClick={powerOn}>
            <div className="island" />
            <div className={`screen-wall ${phase === 'zooming' ? 'on' : ''}`} />
            {phase === 'booting' && (
              <motion.div
                className="boot"
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span className="boot-mark">Röbba</span>
                <span className="boot-bar">
                  <motion.i initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
                </span>
              </motion.div>
            )}
            <div className="glare" aria-hidden />
          </div>
        </motion.div>

        {phase === 'off' && (
          <motion.div
            className="hint"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            aria-hidden
          >
            <span className="hint-line" />
            <span className="hint-text">
              <strong>{t('powerOn')}</strong>
              <small>{t('powerHint')}</small>
            </span>
          </motion.div>
        )}
      </div>

      <button type="button" className="skip" onClick={onDone}>
        {t('skip')}
      </button>
    </div>
  )
}
