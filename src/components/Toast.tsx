import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  onHide?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  visible, 
  message, 
  type = 'info', 
  onHide,
  duration = 3000
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(duration),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => {
        onHide?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-gray-800',
  };

  return (
    <Animated.View 
      style={{ opacity }}
      className={`absolute bottom-20 self-center px-6 py-3 rounded-full shadow-md ${bgColors[type]}`}
    >
      <Text className="text-white font-sans font-bold text-sm text-center">
        {message}
      </Text>
    </Animated.View>
  );
};