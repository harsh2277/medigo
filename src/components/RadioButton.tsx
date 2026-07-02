import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, Text } from 'react-native';

export interface RadioButtonProps {
  selected: boolean;
  onSelect: () => void;
  label?: string;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ selected, onSelect, label, className = '' }) => {
  const animValue = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: selected ? 1 : 0,
      duration: 180,
      useNativeDriver: false, // Color and layout scale updates
    }).start();
  }, [selected]);

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const borderColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBD5E1', '#FF7E3E'], // slate-300 to primary orange
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onSelect}
      className={`flex-row items-center ${className}`}
    >
      <Animated.View 
        style={{
          borderColor,
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Animated.View 
          style={{ 
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#FF7E3E',
            transform: [{ scale }],
          }} 
        />
      </Animated.View>
      {label && <Text className="ml-3 font-sans font-medium text-gray-700">{label}</Text>}
    </TouchableOpacity>
  );
};