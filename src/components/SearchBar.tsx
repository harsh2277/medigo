import React, { useState, useEffect } from 'react';
import { TextInput, TextInputProps, View, Pressable, Text } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

export interface SearchBarProps extends Omit<TextInputProps, 'onChangeText'> {
  onSearch?: (text: string) => void;
  onChangeText?: (text: string) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  onChangeText,
  onSearch,
  error,
  disabled = false,
  value,
  onFocus,
  onBlur,
  placeholder = 'Search...',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(value || '');

  useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    onChangeText?.(text);
    onSearch?.(text);
  };

  const handleClear = () => {
    setQuery('');
    onChangeText?.('');
    onSearch?.('');
  };

  // Determine border color based on error or focus state
  let borderColorClass = 'border-gray-200';
  if (error) {
    borderColorClass = 'border-red-500';
  } else if (isFocused) {
    borderColorClass = 'border-primary';
  }

  // Determine search icon color
  let iconColor = '#9CA3AF'; // gray-400
  if (error) {
    iconColor = '#EF4444'; // red-500
  } else if (isFocused) {
    iconColor = '#FF7E3E'; // primary orange
  }

  return (
    <View className={`w-full ${disabled ? 'opacity-60' : 'opacity-100'} ${className}`}>
      <View
        className={`flex-row items-center border ${borderColorClass} ${disabled ? 'bg-gray-50' : 'bg-white'
          } rounded-full px-5 h-16`}
      >
        <View style={{ marginRight: 8 }}>
          <HugeiconsIcon icon={Search01Icon} size={20} color={iconColor} />
        </View>

        <TextInput
          className="flex-1 font-sans text-gray-900 h-full text-base"
          style={{ paddingVertical: 0, textAlignVertical: 'center' }}
          placeholderTextColor="#9CA3AF"
          placeholder={placeholder}
          value={query}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          {...props}
        />

        {query.length > 0 && !disabled && (
          <Pressable onPress={handleClear} className="p-1">
            <HugeiconsIcon icon={Cancel01Icon} size={18} color="#9CA3AF" />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text className="text-red-500 text-xs mt-1 ml-4 font-sans font-medium">
          {error}
        </Text>
      ) : null}
    </View>
  );
};