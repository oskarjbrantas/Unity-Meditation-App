/**
 * src/theme/index.ts
 * -------------------
 * Design tokens for Unity Meditation.
 * Every color, spacing value, radius, and font name lives here.
 *
 * Rule: never hardcode these values inside screen or component files.
 * Import from here instead.
 *
 * Tip: change a value here and it updates everywhere in the app.
 */

export const colors = {
  // ── Core ──
  background:       '#FAF9F6', // warm off-white — softer than pure white
  backgroundSubtle: '#F2F0EB', // cards, inputs, subtle surfaces

  // ── Text ──
  textPrimary: '#1A1A1A', // near-black with warmth
  textMuted:   '#8A8A8A', // subtitles, placeholders, helper text

  // ── Logo ──
  logoCircle: '#D8D5CE', // soft stone — the honeycomb circles

  // ── Buttons ──
  buttonBackground: '#EFEFEC',
  buttonBorder:     '#DDDBD5',
  buttonText:       '#1A1A1A',

  // ── Dividers ──
  divider: '#E0DDD7',

  // ── Home screen bars ──
  topBar:    '#F0EDE8', // light gray — top bar background
  bottomBar: '#F0EDE8', // light gray — bottom bar background

  // ── Bottom navigation ──
  navActive:   '#1A1A1A', // active tab icon + label color
  navInactive: '#B0ADA8', // inactive tab icon + label color

  // ── Active tab highlight ──────────────────────────────────────
  // To adjust how visible the active tab highlight is,
  // change navHighlightOpacity below:
  //   0.04 = barely visible
  //   0.08 = subtle (default)
  //   0.15 = clearly visible
  //   0.25 = strong
  navHighlight:        '#1A1A1A',
  navHighlightOpacity: 0.08,
  // ─────────────────────────────────────────────────────────────

  // ── Prayer chat ──
  chatBackground: '#FFFFFF',
  chatBorder:     '#E0DDD7',
  chatInputBg:    '#F2F0EB',
} as const;

export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  40,
  xxl: 64,
} as const;

export const radius = {
  sm:   8,
  md:   14,
  lg:   24,
  full: 999,
} as const;

// Font family names — must match keys registered in app/_layout.tsx
export const fonts = {
  display: 'Cormorant-SemiBold',
  body:    'System',
} as const;

// Supports both:
//   import theme from '../theme'
//   import { colors, spacing } from '../theme'
export default { colors, spacing, radius, fonts };
