/**
 * app/index.tsx
 * --------------
 * Welcome Screen — route: "/"
 * The first screen every user sees.
 *
 * Layout:
 *   1. HoneycombLogo  — animated fade-in, positioned at top: '25%'
 *   2. App name       — positioned at top: '65%'
 *   3. Google button  — full width, bottom: '7%'
 *   4. Email button   — ghost style, no border
 *   5. Terms note     — fine print
 *
 * Auth: both buttons navigate to /home for now (MVP frame).
 * Wire up expo-auth-session in handleGoogleSignIn when ready.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

import HoneycombLogo from '../src/components/HoneycombLogo';
import AuthButton    from '../src/components/AuthButton';
import GoogleIcon    from '../src/components/GoogleIcon';

import { colors, spacing } from '../src/theme';
import { welcome }         from '../src/data/content';

export default function WelcomeScreen() {
  const slideAnim = useRef(new Animated.Value(24)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo fades in on its own (inside HoneycombLogo).
    // Title + buttons slide up 550ms later for a calm stagger.
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue:         1,
        duration:        600,
        delay:           550,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue:         0,
        duration:        600,
        delay:           550,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── Auth handlers ─────────────────────────────────────────────
  // Both navigate to Home for now.
  // Replace router.replace with real OAuth logic when ready.
  const handleGoogleSignIn = () => {
    router.replace('/home');
  };

  const handleEmailSignIn = () => {
    router.replace('/home');
  };
  // ─────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── Logo ─────────────────────────────────────────────
            size=33 — tuned live for the right visual weight
            top: '25%' — absolute position, adjust to move logo  */}
        <View style={styles.logoSection}>
          <HoneycombLogo size={33} animated />
        </View>

        {/* ── App name ─────────────────────────────────────────
            top: '65%' — adjust to move text up/down            */}
        <Animated.View
          style={[
            styles.titleSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.appName}>{welcome.appName}</Text>
        </Animated.View>

        {/* ── Auth buttons ─────────────────────────────────────
            bottom: '7%' — adjust to move buttons up/down       */}
        <Animated.View
          style={[
            styles.authSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <AuthButton
            label={welcome.googleButton}
            icon={<GoogleIcon size={15} />}
            onPress={handleGoogleSignIn}
          />

          <AuthButton
            label={welcome.emailButton}
            variant="ghost"
            onPress={handleEmailSignIn}
          />

          <TouchableOpacity
            onPress={() => console.log('Terms tapped')}
            style={styles.termsButton}
          >
            <Text style={styles.terms}>{welcome.termsText}</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex:            1,
    backgroundColor: colors.background,
  },
  container: {
    flex:              1,
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop:        spacing.xxl,
    paddingBottom:     spacing.lg,
  },

  // ── Logo ──
  // Adjust top: to move the logo up or down
  logoSection: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    position:       'absolute',
    top:            '25%',
    left:           0,
    right:          0,
  },

  // ── Title ──
  // Adjust top: to move the app name up or down
  titleSection: {
    alignItems:   'center',
    marginBottom: spacing.xxl,
    marginTop:    -spacing.xxl,
    position:     'absolute',
    top:          '65%',
  },
  appName: {
    fontSize:      34,
    fontWeight:    '700',
    fontFamily:    'Cormorant-SemiBold',
    color:         colors.textPrimary,
    letterSpacing: 0.6,
  },

  // ── Auth ──
  // Adjust bottom: to move the buttons up or down
  authSection: {
    width:      '100%',
    alignItems: 'center',
    gap:        spacing.md,
    position:   'absolute',
    bottom:     '7%',
  },
  termsButton: {
    marginTop:         spacing.md,
    paddingHorizontal: spacing.sm,
  },
  terms: {
    fontSize:           11,
    color:              colors.textMuted,
    textAlign:          'center',
    lineHeight:         17,
    textDecorationLine: 'underline',
  },
});
