import React from 'react';
import { View, Text } from 'react-native';

export interface TagProps {
  label: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, className = '' }) => {
  return (
    <View className={`rounded-full bg-gray-100 px-3 py-1 self-start ${className}`}>
      <Text className="text-gray-700 text-xs font-sans">
        {label}
      </Text>
    </View>
  );
};