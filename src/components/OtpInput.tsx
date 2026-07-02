import React, { useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  value,
  onChange,
  className = '',
  error,
  disabled = false,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (text: string, index: number) => {
    if (disabled) return;
    const newValue = value.split('');
    newValue[index] = text;
    onChange(newValue.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (disabled) return;
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className={`w-full ${className}`}>
      <View className="flex-row gap-3">
        {Array(length)
          .fill(0)
          .map((_, index) => {
            const isDigitFocused = focusedIndex === index;
            const isDigitFilled = !!value[index];

            // Determine border styling based on state
            let borderColorClass = 'border-gray-200';
            if (error) {
              borderColorClass = 'border-red-500 border-2';
            } else if (isDigitFocused) {
              borderColorClass = 'border-primary border-2';
            } else if (isDigitFilled) {
              borderColorClass = 'border-gray-400';
            }

            return (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                className={`w-16 h-16 ${disabled ? 'bg-gray-50' : 'bg-white'
                  } border ${borderColorClass} rounded-full text-center text-xl font-sans font-bold text-gray-900 ${disabled ? 'opacity-60' : 'opacity-100'
                  }`}
                style={{ paddingVertical: 0 }}
                keyboardType="number-pad"
                maxLength={1}
                value={value[index] || ''}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                editable={!disabled}
                placeholderTextColor="#9CA3AF"
              />
            );
          })}
      </View>
      {error ? (
        <Text className="text-red-500 text-xs mt-1.5 ml-1 font-sans font-medium">
          {error}
        </Text>
      ) : null}
    </View>
  );
};