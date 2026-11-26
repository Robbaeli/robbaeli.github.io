import { useLang } from '../i18n'

const tools = [
  ['React Native', 'Expo, TypeScript, Expo Router'],
  ['Backend', 'Node.js, AWS Lambda, DynamoDB, Firebase'],
  ['Native', 'Kotlin, Jetpack Compose, Swift, SwiftUI'],
  ['AI & betalningar', 'Claude API, ML Kit, RevenueCat'],
]

export default function About() {
  const { t } = useLang()
  return (
    <div className="sheet">
      <div className="sheet-hero">
        <div className="avatar">R</div>
        <h1>Robin Eliasson</h1>
        <p className="muted">{t('role')}</p>
      </div>
      <div className="group">
        <p>{t('aboutIntro')}</p>
        <p>{t('aboutMore')}</p>
      </div>
      <h2 className="group-title">{t('tools')}</h2>
      <div className="group list">
        {tools.map(([k, v]) => (
          <div className="row" key={k}>
            <span>{k}</span>
            <span className="muted right">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
