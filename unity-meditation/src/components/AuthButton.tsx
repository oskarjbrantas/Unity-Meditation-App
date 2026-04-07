/**
 * src/components/AuthButton.tsx
 * ------------------------------
 * Reusable auth button — used for Google and email sign-in.
 *
 * Props:
 *   label    — button text (from content.ts, never hardcoded)
 *   onPress  — tap handler
 *   icon     — optional element left of the label (e.g. GoogleIcon)
 *   variant  — 'primary' filled | 'ghost' outlined (default: 'primary')
 */

import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme';

type Props = {
  label:    string;
  onPress:  () => void;
  icon?:    ReactNode;
  variant?: 'primary' | 'ghost';
};

export default function AuthButton({
  label,
  onPress,
  icon    = null,
  variant = 'primary',
}: Props) {
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.button, isGhost && styles.buttonGhost]}
    >
      {icon && <View style={styles.iconSlot}>{icon}</View>}
      <Text style={[styles.label, isGhost && styles.labelGhost]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    backgroundColor:   colors.buttonBackground,
    borderColor:       colors.buttonBorder,
    borderWidth:       1,
    borderRadius:      radius.full,
    paddingVertical:   spacing.sm,
    paddingHorizontal: spacing.xl,
    width:             '100%',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderColor:     'transparent',
  },
  
  iconSlot: {
    marginRight: spacing.sm,
  },
  label: {
    fontSize:      15,
    fontWeight:    '600',
    color:         colors.buttonText,
    letterSpacing: 0.2,
  },
  labelGhost: {
    color:      colors.textMuted,
    fontWeight: '500',
  },
});
