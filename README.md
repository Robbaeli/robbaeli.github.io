# RöbbaOS

Min portfolio som en telefon. Tryck på sidoknappen, flyg in i skärmen och testa mina appar direkt i webbläsaren.

Byggd med React, Vite, TypeScript och Motion.

## Kom igång

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bygger till dist/
```

## Publicera på GitHub Pages

1. Pusha till `main` i repot `robbaeli.github.io`.
2. Gå till **Settings → Pages** och välj **Source: GitHub Actions**.
3. Workflowen i `.github/workflows/deploy.yml` bygger och publicerar automatiskt vid varje push.

Repot måste vara publikt för att Pages ska fungera på ett gratiskonto.

## Struktur

```
src/
  App.tsx                 Växlar mellan intro och hemskärm
  components/PowerOn.tsx  Svart telefon, sidoknapp, boot och inflygning
  components/HomeScreen.tsx  Klocka, appikoner och dock
  components/AppWindow.tsx   Fönstret som öppnas när man trycker på en app
  apps/                   "Inbyggda" appar: Om mig, Projekt, Kontakt, Inställningar
  data/apps.tsx           ALLA appar på hemskärmen. Lägg till nya här.
  i18n.tsx                Svenska och engelska texter
public/
  icons/                  Appikoner
  apps/<id>/              Web-export av varje Expo-app
```

## Lägga in en Expo-app så att den går att testa på sidan

Gör så här i varje app-projekt (exempel: Förstå):

1. Installera webbstödet:
   ```bash
   npx expo install react-native-web react-dom @expo/metro-runtime
   ```
2. I `app.json`:
   ```json
   {
     "expo": {
       "web": { "bundler": "metro", "output": "single" },
       "experiments": { "baseUrl": "/apps/forsta" }
     }
   }
   ```
   `baseUrl` måste matcha mappen där appen hamnar.
3. Testa i webbläsaren: `npx expo start --web`
4. Exportera: `npx expo export --platform web`
5. Kopiera **innehållet** i appens `dist/` till `public/apps/forsta/` här i portfolion (ersätt platshållaren).

### Saker som inte fungerar på webben

Native-moduler som kamera, ML Kit, RevenueCat och push-notiser finns inte i webbläsaren. Bygg ett demoläge:

```ts
import { Platform } from 'react-native'
export const IS_DEMO = Platform.OS === 'web'
```

- **Förstå:** visa ett färdigt exempelbrev och ett förberett svar i stället för kamera och AI.
- **SubSlayer:** fyll appen med påhittade prenumerationer.
- **Lägg aldrig API-nycklar i appen.** Allt i en web-export är publikt. Ska AI anropas live måste det gå via din backend.

Tänk också på att safe area-insets är 0 på webben. Lägg till cirka 50 px padding överst när `Platform.OS === 'web'`, så hamnar innehållet inte under telefonens rundade hörn.

## Lägga till en ny app på hemskärmen

1. Lägg ikonen i `public/icons/`.
2. Lägg till ett objekt i `src/data/apps.tsx`:
   ```tsx
   {
     id: 'trainos',
     name: 'TrainOS',
     kind: 'web',
     src: 'apps/trainos/',
     icon: img('icons/trainos.png'),
   }
   ```
3. Lägg exporten i `public/apps/trainos/`.
