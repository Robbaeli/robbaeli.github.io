import { useState } from 'react'
import { useLang } from '../i18n'

const EMAIL = 'robbaflow@gmail.com'

export default function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="sheet">
      <h1 className="sheet-title">{t('contact')}</h1>
      <p className="pad">{t('contactIntro')}</p>
      <div className="group list">
        <a className="row link" href={`mailto:${EMAIL}`}>
          <span className="grow">{t('email')}</span>
          <span className="muted small">{EMAIL}</span>
          <span className="chev" aria-hidden>›</span>
        </a>
        <button className="row link" type="button" onClick={copy}>
          <span className="grow">{t('copy')}</span>
          <span className="muted small">{copied ? t('copied') : ''}</span>
        </button>
        <a className="row link" href="https://www.linkedin.com/in/robin-eliasson" target="_blank" rel="noopener">
          <span className="grow">LinkedIn</span>
          <span className="chev" aria-hidden>›</span>
        </a>
        <a className="row link" href="https://github.com/Robbaeli" target="_blank" rel="noopener">
          <span className="grow">GitHub</span>
          <span className="chev" aria-hidden>›</span>
        </a>
      </div>
    </div>
  )
}
