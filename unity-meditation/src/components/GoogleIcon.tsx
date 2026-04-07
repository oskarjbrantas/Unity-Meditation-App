/**
 * src/components/GoogleIcon.tsx
 * ------------------------------
 * Minimal Google 'G' glyph for the sign-in button.
 *
 * For production: replace with the official SVG asset via react-native-svg
 * to meet Google's branding guidelines exactly.
 *
 * Props:
 *   size — font size in px (default: 16)
 */

import React   from 'react';
import { Text } from 'react-native';

type Props = {
  size?: number;
};

export default function GoogleIcon({ size = 16 }: Props) {
  return (
    <Text style={{ fontSize: size, fontWeight: '700', color: '#4285F4' }}>
      G
    </Text>
  );
}
