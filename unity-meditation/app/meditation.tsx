/**
 * app/meditation.tsx
 * -------------------
 * Meditation Screen — route: "/meditation"
 * Opened when user taps the Meditation box in Toolbox.
 *
 * Layout:
 *   ┌─────────────────────────────┐
 *   │  TOP BAR (extended)         │
 *   │  ← (back arrow)             │
 *   │  Meditation (title)         │
 *   ├─────────────────────────────┤
 *   │  ┌─────────────────────┐    │
 *   │  │ Title               │    │
 *   │  │ Description         │    │
 *   │  │ 2 TRACKS            │    │
 *   │  └─────────────────────┘    │
 *   │  ... scrollable             │
 *   └─────────────────────────────┘
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

import { colors, spacing, radius, fonts } from '../src/theme';
import { meditationScreen } from '../src/data/content';

// ── Component ─────────────────────────────────────────────────────

export default function MeditationScreen() {
  return (
    <View style={styles.root}>

      {/* ── TOP BAR ─────────────────────────────────────────────
          Extended gray area with back arrow, title and + sign. */}
      <View style={styles.topBar}>

        {/* Left side: back arrow + title */}
        <View style={styles.topBarLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>{meditationScreen.title}</Text>
        </View>

        {/* Right side: + cross icon (same as Home and Toolbox) */}
        <TouchableOpacity style={styles.crossButton} activeOpacity={0.7}>
          <CrossIcon size={18} color={colors.textPrimary} />
        </TouchableOpacity>

      </View>

      {/* ── SESSION LIST ────────────────────────────────────────
          Scrollable list of horizontal session boxes.          */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {meditationScreen.sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={styles.sessionBox}
            onPress={() => console.log(`${session.title} tapped`)}
            activeOpacity={0.75}
          >
            {/* Title */}
            <Text style={styles.sessionTitle}>{session.title}</Text>

            {/* Description */}
            <Text style={styles.sessionDescription}>{session.description}</Text>

            {/* Track count */}
            <Text style={styles.sessionTracks}>
              {session.tracks} {session.tracks === 1 ? 'TRACK' : 'TRACKS'}
            </Text>

          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
}

// ── Sub-components ────────────────────────────────────────────────

/**
 * ChevronLeft — a simple < back arrow using two lines.
 */
function ChevronLeft({ size, color }: { size: number; color: string }) {
  const stroke = 2;
  const arm    = size * 0.5;
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      {/* Top arm of chevron */}
      <View style={{
        position:        'absolute',
        width:           arm,
        height:          stroke,
        backgroundColor: color,
        borderRadius:    stroke,
        top:             size * 0.3,
        left:            size * 0.25,
        transform:       [{ rotate: '-45deg' }],
      }} />
      {/* Bottom arm of chevron */}
      <View style={{
        position:        'absolute',
        width:           arm,
        height:          stroke,
        backgroundColor: color,
        borderRadius:    stroke,
        bottom:          size * 0.3,
        left:            size * 0.25,
        transform:       [{ rotate: '45deg' }],
      }} />
    </View>
  );
}

/**
 * CrossIcon — + shape, same as Home and Toolbox screens.
 */
function CrossIcon({ size, color }: { size: number; color: string }) {
  const thickness = size * 0.15;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', width: size, height: thickness, backgroundColor: color, borderRadius: thickness / 2 }} />
      <View style={{ position: 'absolute', width: thickness, height: size, backgroundColor: color, borderRadius: thickness / 2 }} />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: colors.background,
  },

  // ── Top bar ──
  // Adjust paddingTop to control how far it extends into status bar.
  // Adjust paddingBottom to control how far it comes down.
  topBar: {
    backgroundColor:   colors.topBar,
    paddingTop:        90,
    paddingBottom:     spacing.xl,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
    flexDirection:     'row',
    alignItems:        'flex-end',
    justifyContent:    'space-between',
  },
  topBarLeft: {
    flex: 1,
  },
  backButton: {
    marginBottom: spacing.md,
    alignSelf:    'flex-start',
  },
screenTitle: {
    fontSize:      28,
    fontFamily:    fonts.display,
    color:         colors.textPrimary,
    letterSpacing: 0.6,
    marginTop:     spacing.xxl,
  },

crossButton: {
    padding:    spacing.sm,
  },

  // ── Scroll view ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap:     spacing.md,
  },

  // ── Session box ──
  // Horizontal layout — wider than tall.
  // Adjust minHeight to make boxes taller or shorter.
  sessionBox: {
    backgroundColor: colors.backgroundSubtle,
    borderRadius:    radius.lg,
    borderWidth:     0.5,
    borderColor:     colors.buttonBorder,
    padding:         spacing.md,
    width:           '100%',
    minHeight:       140,
    justifyContent:  'space-between',
  },
  sessionTitle: {
    fontSize:      16,
    fontWeight:    '600',
    color:         colors.textPrimary,
    marginBottom:  spacing.xs,
    letterSpacing: 0.2,
  },
  sessionDescription: {
    fontSize:   13,
    color:      colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  sessionTracks: {
    fontSize:      11,
    fontWeight:    '600',
    color:         colors.textMuted,
    letterSpacing: 1.2,
  },
});
