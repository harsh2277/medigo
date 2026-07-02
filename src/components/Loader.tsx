import React from 'react';
import { ActivityIndicator, View, ViewProps } from 'react-native';

export interface LoaderProps extends ViewProps {
  size?: 'small' | 'large';
  color?: 'primary' | 'secondary' | 'white';
}

export const Loader: React.FC<LoaderProps> = ({ size = 'large', color = 'primary', className = '', ...props }) => {
  const colorMap = {
    primary: '#FF7E3E',
    secondary: '#00B5A3',
    white: '#FFFFFF',
  };

  return (
    <View className={`items-center justify-center ${className}`} {...props}>
      <ActivityIndicator size={size} color={colorMap[color]} />
    </View>
  );
};