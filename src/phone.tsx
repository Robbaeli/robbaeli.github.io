import { createContext, useContext } from 'react'

type PhoneCtx = { replayIntro: () => void; closeApp: () => void }

export const PhoneContext = createContext<PhoneCtx>({ replayIntro: () => {}, closeApp: () => {} })
export const usePhone = () => useContext(PhoneContext)
