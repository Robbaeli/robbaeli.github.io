import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
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

  const finishIntro = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
    setPoweredOn(true)
  }

  const replayIntro = () => {
    setOpenId(null)
    setPoweredOn(false)
  }

  const openApp = apps.find((a) => a.id === openId) ?? null

  return (
    <MotionConfig reducedMotion="user">
      <PhoneContext.Provider value={{ replayIntro, closeApp: () => setOpenId(null) }}>
        {poweredOn ? (
          <>
            <HomeScreen onOpen={setOpenId} openId={openId} />
            <AnimatePresence>{openApp && <AppWindow key={openApp.id} app={openApp} onClose={() => setOpenId(null)} />}</AnimatePresence>
          </>
        ) : (
          <PowerOn onDone={finishIntro} />
        )}
      </PhoneContext.Provider>
    </MotionConfig>
  )
}
