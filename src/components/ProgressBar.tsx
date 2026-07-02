import React from 'react';
import { View } from 'react-native';

export interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  color?: 'primary' | 'secondary';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '', color = 'primary' }) => {
  const boundedProgress = Math.min(Math.max(progress, 0), 100);
  const bgColor = color === 'primary' ? 'bg-primary' : 'bg-secondary';

  return (
    <View className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <View 
        className={`h-full ${bgColor} rounded-full`} 
        style={{ width: `${boundedProgress}%` }}
      />
    </View>
  );
};