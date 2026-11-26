import { createContext, useContext } from 'react'

type PhoneCtx = { replayIntro: () => void; powerOff: () => void; closeApp: () => void }

export const PhoneContext = createContext<PhoneCtx>({ replayIntro: () => {}, powerOff: () => {}, closeApp: () => {} })
export const usePhone = () => useContext(PhoneContext)
