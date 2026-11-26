import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'sv' | 'en'

const strings = {
  sv: {
    powerOn: 'Power on',
    powerHint: 'Tryck på sidoknappen',
    skip: 'Hoppa över intro',
    powerOff: 'Stäng av',
    role: 'Mobilutvecklare i Linköping',
    home: 'Till hemskärmen',
    openPlay: 'Google Play',
    source: 'Källkod',
    tryIt: 'Testa appen direkt här i telefonen.',
    // apps
    forstaDesc: 'Fotografera ett brev från en myndighet och få det förklarat på ditt eget språk.',
    subslayerDesc: 'Samla alla prenumerationer på ett ställe och se vad de kostar varje månad.',
    duckDesc: 'App mot doomscrolling. Ankan kommer närmare ju mer du scrollar och låser till slut telefonen. Scrolla i flödet och testa.',
    about: 'Om mig',
    projects: 'Projekt',
    contact: 'Kontakt',
    settings: 'Inställningar',
    // about
    aboutIntro:
      'Jag heter Robin Eliasson, men alla säger Röbba. Jag bygger appar i React Native och ser till att de faktiskt kommer ut i butikerna.',
    aboutMore:
      'Jag pluggar mobilutveckling på Folkuniversitetet i Linköping och har en bakgrund inom IT-support. Jag har även byggt i Kotlin och Swift, men React Native är där jag är hemma.',
    tools: 'Verktyg',
    // projects
    projectsIntro: 'Skol- och teamprojekt. Tryck för att se koden på GitHub.',
    shui: 'REST-API för en digital anslagstavla på AWS.',
    cupify: 'Serverlöst turnerings-API. Gruppprojekt.',
    swipeat: 'Matapp byggd med Expo.',
    echoes: 'Teamprojekt om platser och minnen.',
    // contact
    contactIntro: 'Söker du en mobilutvecklare eller vill du prata om en app? Hör av dig.',
    email: 'Mejla',
    copy: 'Kopiera mejladress',
    copied: 'Kopierad',
    // settings
    language: 'Språk',
    replay: 'Visa introt igen',
  },
  en: {
    powerOn: 'Power on',
    powerHint: 'Press the side button',
    skip: 'Skip intro',
    powerOff: 'Power off',
    role: 'Mobile developer in Linköping, Sweden',
    home: 'Go to home screen',
    openPlay: 'Google Play',
    source: 'Source code',
    tryIt: 'Try the app right here in the phone.',
    forstaDesc: 'Take a photo of a letter from a government agency and get it explained in your own language.',
    subslayerDesc: 'Keep all your subscriptions in one place and see what they cost each month.',
    duckDesc: 'An app against doomscrolling. The duck gets closer the more you scroll and finally locks the phone. Scroll the feed to try it.',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    settings: 'Settings',
    aboutIntro:
      "I'm Robin Eliasson, but everyone calls me Röbba. I build apps in React Native and make sure they actually ship.",
    aboutMore:
      "I study mobile development at Folkuniversitetet in Linköping and have a background in IT support. I've built in Kotlin and Swift too, but React Native is home.",
    tools: 'Tools',
    projectsIntro: 'School and team projects. Tap to see the code on GitHub.',
    shui: 'REST API for a digital message board on AWS.',
    cupify: 'Serverless tournament API. Group project.',
    swipeat: 'Food app built with Expo.',
    echoes: 'Team project about places and memories.',
    contactIntro: 'Looking for a mobile developer, or want to talk about an app? Get in touch.',
    email: 'Email',
    copy: 'Copy email address',
    copied: 'Copied',
    language: 'Language',
    replay: 'Replay the intro',
  },
} as const

export type StringKey = keyof typeof strings.sv

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: StringKey) => string }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('robba-lang')
    if (saved === 'sv' || saved === 'en') return saved
  } catch {
    /* storage can be blocked */
  }
  return navigator.language.toLowerCase().startsWith('sv') ? 'sv' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const setLang = (l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l
    try {
      localStorage.setItem('robba-lang', l)
    } catch {
      /* ignore */
    }
  }
  const t = (k: StringKey) => strings[lang][k]
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
