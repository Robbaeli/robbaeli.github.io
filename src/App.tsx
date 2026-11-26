import { useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useAnimate } from 'motion/react'
import PowerOn from './components/PowerOn'
import HomeScreen from './components/HomeScreen'
import AppWindow from './components/AppWindow'
import { PhoneContext } from './phone'
import { apps } from './data/apps'

const SEEN_KEY = 'robba-booted'

function seenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [poweredOn, setPoweredOn] = useState(seenIntro)
  const [openId, setOpenId] = useState<string | null>(null)
  // true när hemskärmen just har startats via introt (då "landar" den med en zoom)
  const [landing, setLanding] = useState(false)

  const finishIntro = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
    setLanding(true)
    setPoweredOn(true)
  }

  const [homeScope, animateHome] = useAnimate<HTMLDivElement>()
  const shuttingDown = useRef(false)

  // Stäng av: skärmen kollapsar till en lysande linje (som en gammal TV) och slocknar,
  // sedan är man tillbaka vid den avstängda telefonen.
  const powerOff = async () => {
    if (shuttingDown.current) return
    shuttingDown.current = true
    setOpenId(null)
    if (homeScope.current) {
      await animateHome(homeScope.current, { scaleY: 0.006, scaleX: 1.02 }, { duration: 0.28, ease: [0.7, 0, 0.9, 0.5] })
      await animateHome(homeScope.current, { scaleX: 0, opacity: 0 }, { duration: 0.22, ease: 'easeIn' })
    }
    await new Promise((r) => setTimeout(r, 250))
    shuttingDown.current = false
    setLanding(false)
    setPoweredOn(false)
  }

  const openApp = apps.find((a) => a.id === openId) ?? null

  return (
    <MotionConfig reducedMotion="user">
      <PhoneContext.Provider value={{ replayIntro: powerOff, powerOff, closeApp: () => setOpenId(null) }}>
        {poweredOn && (
          <>
            <motion.div
              ref={homeScope}
              className="home-enter"
              initial={landing ? { scale: 1.15, filter: 'blur(12px)' } : false}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <HomeScreen onOpen={setOpenId} openId={openId} />
            </motion.div>
            <AnimatePresence>{openApp && <AppWindow key={openApp.id} app={openApp} onClose={() => setOpenId(null)} />}</AnimatePresence>
          </>
        )}
        {/* Introt ligger ovanpå och tonas bort när hemskärmen tagit över */}
        <AnimatePresence>{!poweredOn && <PowerOn key="intro" onDone={finishIntro} />}</AnimatePresence>
      </PhoneContext.Provider>
    </MotionConfig>
  )
}
