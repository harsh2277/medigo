import React from 'react';
import { View, Text } from 'react-native';

export interface DiscountBadgeProps {
  percentage: number;
  className?: string;
}

export const DiscountBadge: React.FC<DiscountBadgeProps> = ({ percentage, className = '' }) => {
  return (
    <View className={`rounded-full bg-secondary px-2 py-1 items-center justify-center self-start ${className}`}>
      <Text className="text-white text-xs">
        {percentage}% OFF
      </Text>
    </View>
  );
};