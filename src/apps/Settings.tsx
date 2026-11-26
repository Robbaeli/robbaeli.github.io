import { useLang } from '../i18n'
import { usePhone } from '../phone'

export default function Settings() {
  const { t, lang, setLang } = useLang()
  const { replayIntro } = usePhone()
  return (
    <div className="sheet">
      <h1 className="sheet-title">{t('settings')}</h1>
      <h2 className="group-title">{t('language')}</h2>
      <div className="group list">
        {(['sv', 'en'] as const).map((l) => (
          <button key={l} type="button" className="row link" onClick={() => setLang(l)} aria-pressed={lang === l}>
            <span className="grow">{l === 'sv' ? 'Svenska' : 'English'}</span>
            {lang === l && <span className="check" aria-hidden>✓</span>}
          </button>
        ))}
      </div>
      <div className="group list">
        <button type="button" className="row link accent" onClick={replayIntro}>
          {t('replay')}
        </button>
      </div>
    </div>
  )
}
