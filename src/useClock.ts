import { useEffect, useState } from 'react'
import { useLang } from './i18n'

/** Klockan i Linköping, oavsett var besökaren befinner sig. */
export function useClock() {
  const { lang } = useLang()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(id)
  }, [])
  const tz = 'Europe/Stockholm'
  const time = new Intl.DateTimeFormat('sv-SE', { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(now)
  const date = new Intl.DateTimeFormat(lang === 'sv' ? 'sv-SE' : 'en-GB', {
    timeZone: tz,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now)
  return { time, date }
}
