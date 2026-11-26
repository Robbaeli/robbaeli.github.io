import { useRef, useState } from 'react'
import { motion, useAnimate, useMotionValue, useReducedMotion } from 'motion/react'
import { useLang } from '../i18n'
import LangToggle from './LangToggle'
import WarpField from './WarpField'

type Phase = 'off' | 'booting' | 'zooming'

const SCREEN_W = 276
const SCREEN_H = 598

export default function PowerOn({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>('off')
  const [scope, animate] = useAnimate()
  const reduce = useReducedMotion()
  const started = useRef(false)
  const warpSpeed = useMotionValue(1)

  const powerOn = async () => {
    if (started.current) return
    started.current = true
    if (reduce) return onDone()

    setPhase('booting')
    // 1. Telefonen startar och drar sakta tittaren närmare (~2,4 s)
    animate('.side-button', { x: [0, -3, 0] }, { duration: 0.25 })
    animate('.phone', { scale: 1.04, rotateX: 4, rotateY: -10 }, { duration: 2.4, ease: [0.4, 0, 0.6, 1] })
    await new Promise((r) => setTimeout(r, 2400))

    // 2. Skärmen tänds – och ett svart hål öppnar sig mitt i den (~2,4 s)
    setPhase('zooming')
    const cover = Math.max(window.innerWidth / SCREEN_W, window.innerHeight / SCREEN_H) * 1.35
    animate('.hint, .skip, .lang-toggle', { opacity: 0 }, { duration: 0.4 })

    // Stjärnorna tänds och accelererar till ljusstrimmor
    animate('.warp', { opacity: 1 }, { duration: 0.6 })
    animate(warpSpeed, 40, { duration: 2.4, ease: [0.55, 0, 0.9, 0.45] })
    animate('.power-bg', { opacity: 0 }, { duration: 1.6 })

    // Hålet öppnar sig, pulserar och växer till slut över allt
    animate(
      '.vortex',
      { scale: [0, 1, 1.08, 10] },
      { duration: 2.4, delay: 0.2, times: [0, 0.3, 0.55, 1], ease: ['easeOut', 'easeInOut', 'easeIn'] },
    )
    // Telefonen vänder sig mot oss och tittaren faller in med en vridning
    animate('.phone', { rotateX: 0, rotateY: 0, y: 0 }, { duration: 0.8, ease: 'easeOut' })
    await animate('.phone', { scale: cover, rotate: [0, -12] }, { duration: 2.4, ease: [0.65, 0, 0.9, 0.35] })

    // 3. Ljusblixt på andra sidan
    await animate('.warp-flash', { opacity: [0, 0.55] }, { duration: 0.22, ease: 'easeIn' })
    onDone()
  }

  return (
    <motion.div className="power" ref={scope} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
      <div className="power-bg" aria-hidden />
      <WarpField speed={warpSpeed} />
      <div className="warp-flash" aria-hidden />
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
          <div className="screen">
            <div className="island" />
            {phase !== 'off' && (
              <motion.div
                className="boot"
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span className="boot-mark">Röbba</span>
                <span className="boot-bar">
                  <motion.i initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, ease: 'easeInOut' }} />
                </span>
              </motion.div>
            )}
            <div className={`screen-home wallpaper ${phase === 'zooming' ? 'on' : ''}`} aria-hidden />
            <div className="vortex" aria-hidden />
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
    </motion.div>
  )
}
