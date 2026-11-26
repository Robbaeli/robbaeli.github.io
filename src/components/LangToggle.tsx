import { useLang } from '../i18n'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  const next = lang === 'sv' ? 'en' : 'sv'
  return (
    <button
      type="button"
      className="lang-toggle"
      lang={next}
      onClick={() => setLang(next)}
      aria-label={next === 'en' ? 'Switch to English' : 'Byt till svenska'}
    >
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
      </svg>
      {next === 'en' ? 'English' : 'Svenska'}
    </button>
  )
}
