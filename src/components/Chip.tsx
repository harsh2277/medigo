import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

export interface ChipProps extends TouchableOpacityProps {
  label: string;
  selected?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, className = '', ...props }) => {
  const bgClass = selected ? 'bg-primary border-primary' : 'bg-gray-100 border-gray-100';
  const textClass = selected ? 'text-white' : 'text-gray-700';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`rounded-full px-4 py-2 border ${bgClass} self-start ${className}`}
      {...props}
    >
      <Text className={textClass}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};