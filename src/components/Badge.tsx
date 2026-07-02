import React from 'react';
import { View, Text } from 'react-native';

export interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary', className = '' }) => {
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    danger: 'bg-red-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
  };

  return (
    <View className={`rounded-full px-2 py-0.5 items-center justify-center self-start ${variantStyles[variant]} ${className}`}>
      <Text className="text-white text-xs">
        {text}
      </Text>
    </View>
  );
};