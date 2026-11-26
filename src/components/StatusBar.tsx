import { useClock } from '../useClock'

export default function StatusBar({ dark = false }: { dark?: boolean }) {
  const { time } = useClock()
  return (
    <div className={`status ${dark ? 'dark' : ''}`}>
      <span className="status-time">{time}</span>
      <span className="status-icons" aria-hidden>
        <svg viewBox="0 0 18 12" width="18"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 26 12" width="26"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="17" height="8" rx="1.8" /><rect x="23.5" y="4" width="1.8" height="4" rx=".9" opacity=".5" /></svg>
      </span>
    </div>
  )
}
