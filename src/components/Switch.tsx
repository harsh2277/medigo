import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ value, onValueChange, className = '' }) => {
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // false because backgroundColor interpolation isn't supported by native driver
    }).start();
  }, [value]);

  // Interpolate slide offset (48px width - 22px circle - 2 * 3px padding = 20px)
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20], 
  });

  // Interpolate background color change (from grey to primary orange)
  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E2E8F0', '#FF7E3E'], // slate-200 to primary orange
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      className={className}
    >
      <Animated.View 
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          justifyContent: 'center',
          padding: 3,
          backgroundColor,
        }}
      >
        <Animated.View 
          className="bg-white rounded-full shadow-sm" 
          style={{ 
            width: 22,
            height: 22,
            transform: [{ translateX }],
            elevation: 1, // Android shadow
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};