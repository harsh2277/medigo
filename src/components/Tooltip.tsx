import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="relative items-center">
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => setVisible(!visible)}
      >
        {children}
      </TouchableOpacity>
      
      {visible && (
        <View className="absolute -top-10 bg-gray-800 px-3 py-1.5 rounded-xl z-50">
          <Text className="text-white text-xs font-sans whitespace-nowrap">
            {text}
          </Text>
          <View className="absolute -bottom-1.5 self-center w-3 h-3 bg-gray-800 rotate-45" />
        </View>
      )}
    </View>
  );
};