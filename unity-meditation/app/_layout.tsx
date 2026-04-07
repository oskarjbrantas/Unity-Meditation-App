/**
 * app/_layout.tsx
 * ----------------
 * Root layout for Unity Meditation.
 *
 * Responsibilities:
 *   1. Load Cormorant Garamond (our display font) before any screen renders
 *   2. Hold the splash screen until fonts are ready, then release it
 *   3. Provide the <Stack> navigator shell for all routes
 *
 * Expo Router wraps this in a NavigationContainer automatically —
 * do NOT add one manually.
 *
 * To add a new screen: just create a new file in app/.
 * It becomes a route with no extra registration needed.
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts, CormorantGaramond_600SemiBold } from '@expo-google-fonts/cormorant-garamond';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding while fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // This key is referenced as fontFamily: 'Cormorant-SemiBold' in StyleSheets
    'Cormorant-SemiBold': CormorantGaramond_600SemiBold,
  });

  useEffect(() => {
    // Hide splash once fonts are ready (or failed — don't block forever)
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Render nothing until fonts are confirmed loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // each screen handles its own UI chrome
        animation: 'fade',  // calm cross-fade between routes — on brand
      }}
    />
  );
}
