/**
 * src/components/HoneycombLogo.tsx
 * ---------------------------------
 * The Unity Meditation honeycomb logo.
 *
 * Built with react-native-svg for crisp, resolution-independent rendering.
 * 7 circles: 1 center + 6 surrounding at 60° intervals.
 *
 * Geometry:
 *   orbitRadius = size * 2.2
 *   Gives a small gap between circles for visual clarity.
 *   Increase multiplier for more spacing, decrease for tighter.
 *
 * Install:
 *   npx expo install react-native-svg
 *
 * Props:
 *   size      — radius of each circle in px (default: 36)
 *   color     — fill color (default: colors.logoCircle from theme)
 *   animated  — fade in on mount (default: true)
 */

import React, { useEffect, useRef } from 'react';
import { Animated }                  from 'react-native';
import Svg, { Circle }               from 'react-native-svg';
import { colors }                    from '../theme';

type Props = {
  size?:     number;
  color?:    string;
  animated?: boolean;
};

export default function HoneycombLogo({
  size     = 36,
  color    = colors.logoCircle,
  animated = true,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) {
      opacity.setValue(1);
      return;
    }
    Animated.timing(opacity, {
      toValue:         1,
      duration:        1000,
      delay:           200,
      useNativeDriver: true,
    }).start();
  }, []);

  // ── Honeycomb geometry ────────────────────────────────────────
  // orbitRadius = size * 2.2 gives a small gap between circles.
  // Tune this multiplier to adjust spacing between circles.
  const orbitRadius = size * 2.2;
  const padding     = size * 0.5;
  const cx          = orbitRadius + size + padding;
  const cy          = orbitRadius + size + padding;
  const viewSize    = (orbitRadius + size + padding) * 2;

  const outerCenters = [0, 60, 120, 180, 240, 300].map(deg => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + orbitRadius * Math.cos(rad),
      y: cy + orbitRadius * Math.sin(rad),
    };
  });

  return (
    <Animated.View style={{ opacity }}>
      <Svg width={viewSize} height={viewSize}>

        {/* Center circle */}
        <Circle cx={cx} cy={cy} r={size} fill={color} />

        {/* 6 outer circles at 60° intervals */}
        {outerCenters.map((c, i) => (
          <Circle key={i} cx={c.x} cy={c.y} r={size} fill={color} />
        ))}

      </Svg>
    </Animated.View>
  );
}
