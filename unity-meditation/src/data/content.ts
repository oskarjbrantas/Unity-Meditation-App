/**
 * src/data/content.ts
 * --------------------
 * Single source of truth for all user-facing text in Unity Meditation.
 *
 * Rules:
 *  - No text hardcoded in screen or component files — import from here
 *  - Structure matches screens so it's easy to find what you need
 *  - Designed for future i18n: swap this file per locale
 *
 * Structure:
 *  - welcome          → Welcome Screen (app/index.tsx)
 *  - home             → Home Screen (app/home.tsx)
 *  - toolbox          → Toolbox Screen (app/toolbox.tsx)
 *  - meditationScreen → Meditation Screen (app/meditation.tsx)
 */

// ── Welcome Screen ───────────────────────────────────────────────

export const welcome = {
  appName:      'Unity Meditation',
  // tagline removed from UI — kept here if needed later
  // tagline:   'Still your mind. Draw near to God.',
  googleButton: 'Continue with Google',
  emailButton:  'Continue with email',
  termsText:    'By continuing you accept our terms and conditions',
};

// ── Home Screen ──────────────────────────────────────────────────

export const home = {
  title:             'Join others',
  connectButton:     'Connect Live',
  disconnectButton:  'Disconnect',
  prayerButton:      'Send prayer request',
  topBarAccessibility: 'Open prayer chat',
  chatTitle:       'Prayer Requests',
  chatPlaceholder: 'Write a prayer request...',
  chatSend:        'Send',
  chatEmpty:       'No prayer requests yet. Be the first.',
  nav: {
    home:      'Home',
    toolbox:   'Toolbox',
    community: 'Community',
    account:   'Account',
  },
};

// ── Toolbox Screen ───────────────────────────────────────────────

export const toolbox = {
  tools: [
    { id: 'meditation',  name: 'Meditation'    },
    { id: 'scripture',   name: 'Scripture'     },
    { id: 'journal',     name: 'Journal'       },
    { id: 'sleep-diary', name: 'Sleep Diary'   },
    { id: 'kingdom',     name: 'Kingdom Come'  },
    { id: 'hrv',         name: 'HRV-Breathing' },
  ],
};

// ── Meditation Screen ────────────────────────────────────────────

export const meditationScreen = {
  title: 'Meditation',
  sessions: [
    {
      id:          'altered-prayer',
      title:       'Altered Prayer',
      description: 'Description text',
      tracks:      2,
    },
    {
      id:          'healing-prayer',
      title:       'Healing Prayer',
      description: 'Description text',
      tracks:      3,
    },
    {
      id:          'defusing-thoughts',
      title:       'Defusing Thoughts',
      description: 'Description text',
      tracks:      2,
    },
    {
      id:          'attention-training',
      title:       'Attention Training',
      description: 'Description text',
      tracks:      3,
    },
    {
      id:          'muscle-relaxation',
      title:       'Muscle Relaxation',
      description: 'Description text',
      tracks:      2,
    },
    {
      id:          'unity-meditation',
      title:       'Unity Meditation',
      description: 'Description text',
      tracks:      4,
    },
  ],
};
