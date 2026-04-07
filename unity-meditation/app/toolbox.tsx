/**
 * app/toolbox.tsx
 * ----------------
 * Toolbox Screen — route: "/toolbox"
 *
 * Layout:
 *   ┌─────────────────────────┐
 *   │  TOP BAR  (+ cross)     │
 *   ├─────────────────────────┤
 *   │  ┌─────────┬─────────┐  │
 *   │  │Meditation│Scripture│  │
 *   │  ├─────────┼─────────┤  │
 *   │  │ Journal │  Sleep  │  │
 *   │  │         │  Diary  │  │
 *   │  ├─────────┼─────────┤  │
 *   │  │ Kingdom │  HRV-   │  │
 *   │  │  Come   │Breathing│  │
 *   │  └─────────┴─────────┘  │
 *   ├─────────────────────────┤
 *   │  NAV: Home Toolbox ...  │
 *   └─────────────────────────┘
 *
 * Each box navigates to its own screen when tapped.
 * Add routes as each tool screen is built.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';

import { colors, spacing, radius, fonts } from '../src/theme';
import { toolbox, home } from '../src/data/content';

// ── Types ─────────────────────────────────────────────────────────

type NavItem = {
  key:   string;
  label: string;
};

// ── Nav items ─────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { key: 'home',      label: home.nav.home      },
  { key: 'toolbox',   label: home.nav.toolbox   },
  { key: 'community', label: home.nav.community },
  { key: 'account',   label: home.nav.account   },
];

// ── Component ─────────────────────────────────────────────────────

export default function ToolboxScreen() {
  const [activeNav,    setActiveNav]    = useState('toolbox');
  const [chatOpen,     setChatOpen]     = useState(false);
  const [topBarBottom, setTopBarBottom] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue:         chatOpen ? 1 : 0,
      useNativeDriver: false,
      bounciness:      2,
      speed:           14,
    }).start();
  }, [chatOpen]);

  const handleChatToggle = () => setChatOpen(prev => !prev);
  const handleCloseChat  = () => setChatOpen(false);

  const handleNavPress = (key: string) => {
    setActiveNav(key);
    if (key === 'home') router.push('/home');
    // Add other screens as they are built:
    // if (key === 'community') router.replace('/community');
    // if (key === 'account')   router.replace('/account');
  };

  const handleToolPress = (id: string) => {
    if (id === 'meditation') router.push('/meditation');
    // Add other tool screens as they are built:
    // if (id === 'scripture')   router.push('/scripture');
    // if (id === 'journal')     router.push('/journal');
    // if (id === 'sleep-diary') router.push('/sleep-diary');
    // if (id === 'kingdom')     router.push('/kingdom');
    // if (id === 'hrv')         router.push('/hrv');
  };

  const chatSlideHeight = slideAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, 320],
  });

  const chatOpacity = slideAnim.interpolate({
    inputRange:  [0, 0.4, 1],
    outputRange: [0, 0.7, 1],
  });

  return (
    <View style={styles.root}>

      {/* ── MAIN LAYOUT ─────────────────────────────────────── */}
      <View style={styles.flex}>

        {/* ── TOP BAR ───────────────────────────────────────── */}
        <View
          style={styles.topBar}
          onLayout={e => setTopBarBottom(e.nativeEvent.layout.y + e.nativeEvent.layout.height)}
        >
          <TouchableOpacity
            onPress={handleChatToggle}
            style={styles.crossButton}
          >
            <CrossIcon size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── TOOL GRID ─────────────────────────────────────── */}
        <View style={styles.grid}>
          {toolbox.tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={styles.toolBox}
              onPress={() => handleToolPress(tool.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.toolName}>{tool.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── BOTTOM NAV ────────────────────────────────────── */}
        <View style={styles.bottomBar}>
          {NAV_ITEMS.map(item => {
            const isActive = activeNav === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.navItem,
                  isActive && {
                    backgroundColor: `rgba(26,26,26,${colors.navHighlightOpacity})`,
                  },
                ]}
                onPress={() => handleNavPress(item.key)}
                activeOpacity={0.7}
              >
                <NavIcon navKey={item.key} isActive={isActive} />
                <Text style={[
                  styles.navLabel,
                  { color: isActive ? colors.navActive : colors.navInactive },
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── BACKDROP ──────────────────────────────────────────── */}
      {chatOpen && (
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={handleCloseChat}
          activeOpacity={1}
        />
      )}

      {/* ── CHAT OVERLAY ──────────────────────────────────────── */}
      <Animated.View
        pointerEvents={chatOpen ? 'auto' : 'none'}
        style={[
          styles.chatOverlay,
          {
            top:     topBarBottom,
            height:  chatSlideHeight,
            opacity: chatOpacity,
          },
        ]}
      >
        <View style={styles.chatPlaceholder}>
          <Text style={styles.chatPlaceholderText}>Prayer Requests</Text>
        </View>
      </Animated.View>

    </View>
  );
}

// ── Sub-components ────────────────────────────────────────────────

function CrossIcon({ size, color }: { size: number; color: string }) {
  const thickness = size * 0.15;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', width: size, height: thickness, backgroundColor: color, borderRadius: thickness / 2 }} />
      <View style={{ position: 'absolute', width: thickness, height: size, backgroundColor: color, borderRadius: thickness / 2 }} />
    </View>
  );
}

function NavIcon({ navKey, isActive }: { navKey: string; isActive: boolean }) {
  const color = isActive ? colors.navActive : colors.navInactive;
  const size  = 22;

  const shapes: Record<string, React.ReactNode> = {
    home: (
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: 0, height: 0, borderLeftWidth: size/2, borderRightWidth: size/2, borderBottomWidth: size/2, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: color }} />
        <View style={{ width: size * 0.65, height: size * 0.45, backgroundColor: color, borderRadius: 2 }} />
      </View>
    ),
    toolbox: (
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: size * 0.5, height: size * 0.15, backgroundColor: color, borderRadius: 2, marginBottom: 2 }} />
        <View style={{ width: size, height: size * 0.6, backgroundColor: color, borderRadius: 3 }} />
      </View>
    ),
    community: (
      <View style={{ flexDirection: 'row', gap: 3 }}>
        {[0,1,2].map(i => (
          <View key={i} style={{ width: size * 0.28, height: size * 0.28, borderRadius: size, backgroundColor: color }} />
        ))}
      </View>
    ),
    account: (
      <View style={{ alignItems: 'center', gap: 2 }}>
        <View style={{ width: size * 0.4, height: size * 0.4, borderRadius: size, backgroundColor: color }} />
        <View style={{ width: size * 0.7, height: size * 0.35, borderRadius: size, backgroundColor: color }} />
      </View>
    ),
  };

  return (
    <View style={{ height: size, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
      {shapes[navKey]}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  topBar: {
    backgroundColor:   colors.topBar,
    alignItems:        'center',
    justifyContent:    'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom:     spacing.sm,
    paddingTop:        80,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  crossButton: {
    padding: spacing.sm,
  },

  // ── Tool grid ──
  // width: '48%' + gap: spacing.md gives equal space between
  // boxes and from boxes to screen edges.
  grid: {
    flex:          1,
    flexDirection: 'row',
    flexWrap:      'wrap',
    padding:       spacing.md,
    gap:           spacing.md,
    alignContent:  'flex-start',
  },
  toolBox: {
    width:           '48%',
    flexGrow:        0,
    flexShrink:      0,
    backgroundColor: colors.backgroundSubtle,
    borderRadius:    radius.lg,
    borderWidth:     0.5,
    borderColor:     colors.buttonBorder,
    padding:         spacing.md,
    justifyContent:  'flex-start',
    alignItems:      'flex-start',
    minHeight:       215,
  },
  toolName: {
    fontSize:      14,
    fontWeight:    '500',
    color:         colors.textPrimary,
    letterSpacing: 0.2,
  },
  bottomBar: {
    flexDirection:    'row',
    height:           110,
    backgroundColor:  colors.bottomBar,
    borderTopWidth:   StyleSheet.hairlineWidth,
    borderTopColor:   colors.divider,
    paddingBottom:    26,
  },
  navItem: {
    flex:             1,
    alignItems:       'center',
    justifyContent:   'center',
    borderRadius:     radius.md,
    marginHorizontal: 26,
    marginVertical:   14,
  },
  navLabel: {
    fontSize:  10,
    marginTop: 1,
  },
  chatOverlay: {
    position:          'absolute',
    left:              0,
    right:             0,
    overflow:          'hidden',
    backgroundColor:   colors.chatBackground,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.chatBorder,
    zIndex:            10,
    shadowColor:       '#000',
    shadowOffset:      { width: 0, height: 4 },
    shadowOpacity:     0.06,
    shadowRadius:      8,
    elevation:         4,
  },
  chatPlaceholder: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  chatPlaceholderText: {
    fontSize: 13,
    color:    colors.textMuted,
  },
});
