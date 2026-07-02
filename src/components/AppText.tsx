import React from 'react';
import { Text, TextProps } from 'react-native';
import { fontFamily } from '../constants/fonts';

/**
 * AppText — a drop-in replacement for React Native <Text>.
 *
 * Usage:
 *   <AppText bold>Heading</AppText>
 *   <AppText weight="medium" style={{ fontSize: 14, color: '#6B7280' }}>Body</AppText>
 */
type FontWeight = keyof typeof fontFamily;

interface AppTextProps extends TextProps {
  bold?: boolean;
  weight?: FontWeight;
}

export const AppText: React.FC<AppTextProps> = ({ bold = false, weight, style, ...props }) => {
  const resolvedWeight: FontWeight = weight ?? (bold ? 'bold' : 'regular');

  return (
    <Text
      {...props}
      style={[{ fontFamily: fontFamily[resolvedWeight] }, style]}
    />
  );
};
