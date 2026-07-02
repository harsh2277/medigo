import React from 'react';
import { View, Text } from 'react-native';

export interface StatusBadgeProps {
  status: 'pending' | 'completed' | 'cancelled' | 'active';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
      case 'active':
        return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-700' };
      case 'pending':
      default:
        return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
    }
  };

  const { bg, text } = getStatusStyles();

  return (
    <View className={`rounded-full px-3 py-1 items-center justify-center self-start ${bg} ${className}`}>
      <Text className={`text-xs font-sans font-bold capitalize ${text}`}>
        {status}
      </Text>
    </View>
  );
};