import { useLang, type StringKey } from '../i18n'

const projects: { name: string; key: StringKey; tag: string; url: string; color: string }[] = [
  { name: 'Shui', key: 'shui', tag: 'AWS', url: 'https://github.com/Robbaeli/Ma25shui', color: '#1F8A84' },
  { name: 'Cupify', key: 'cupify', tag: 'AWS', url: 'https://github.com/Robbaeli/Cupify', color: '#7B3FE4' },
  { name: 'SwipEat', key: 'swipeat', tag: 'Expo', url: 'https://github.com/Robbaeli/SwipEat', color: '#FF7A2F' },
  { name: 'Echoes', key: 'echoes', tag: 'iOS', url: 'https://github.com/Robbaeli/Echoes', color: '#2D6CDF' },
]

export default function Projects() {
  const { t } = useLang()
  return (
    <div className="sheet">
      <h1 className="sheet-title">{t('projects')}</h1>
      <p className="muted pad">{t('projectsIntro')}</p>
      <div className="group list">
        {projects.map((p) => (
          <a className="row link" key={p.name} href={p.url} target="_blank" rel="noopener">
            <span className="dot" style={{ background: p.color }} />
            <span className="grow">
              <strong>{p.name}</strong>
              <span className="muted small block">{t(p.key)}</span>
            </span>
            <span className="muted small">{p.tag}</span>
            <span className="chev" aria-hidden>
              ›
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
