# Unity Meditation

Open-source Christian meditation app — React Native + Expo Router.

---

## Folder Structure

```
unity-meditation/
├── app/
│   ├── _layout.tsx        ← Root layout: fonts, splash, nav shell
│   └── index.tsx          ← Welcome screen (route: "/")
├── src/
│   ├── components/
│   │   ├── HoneycombLogo.tsx
│   │   ├── AuthButton.tsx
│   │   └── GoogleIcon.tsx
│   ├── data/
│   │   └── content.ts     ← ALL user-facing text lives here
│   └── theme/
│       └── index.ts       ← Colors, spacing, radius, font tokens
├── assets/
│   └── fonts/             ← Place any local font files here
├── app.json
├── babel.config.js
├── package.json
└── tsconfig.json
```

**Rule:** `app/` = routing only. All logic, components, and data = `src/`.

---

## First-Time Setup in VS Code

### Step 1 — Create project (skip if already done)

```bash
npx create-expo-app unity-meditation --template blank-typescript
cd unity-meditation
```

### Step 2 — Replace the generated files

Copy all files from this package into your project folder,
overwriting anything that conflicts.

### Step 3 — Install dependencies

Run these **in order**:

```bash
# Core packages
npm install

# Expo-managed packages (use expo install, not npm, for version matching)
npx expo install expo-router
npx expo install expo-font expo-splash-screen
npx expo install @expo-google-fonts/cormorant-garamond
npx expo install react-native-svg
npx expo install react-native-screens react-native-safe-area-context
npx expo install expo-status-bar
```

### Step 4 — Start the app

```bash
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone.
Press `i` for iOS simulator or `a` for Android emulator.

---

## Adding a New Screen

1. Create `app/my-screen.tsx` with a default export component
2. Navigate to it anywhere with:
   ```ts
   import { router } from 'expo-router';
   router.push('/my-screen');
   ```
Expo Router registers it automatically — no extra config needed.

---

## Key Files for Contributors

| File | What to edit |
|---|---|
| `src/data/content.ts` | All copy / text changes |
| `src/theme/index.ts` | Colors, spacing, fonts |
| `app/_layout.tsx` | Global providers, font loading |
| `src/components/` | Shared UI — keep generic and reusable |

---

## License

MIT
