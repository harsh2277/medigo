import React from 'react';
import { View, Text } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Folder01Icon } from '@hugeicons/core-free-icons';
import { Button } from './Button';
import { fontFamily } from '../constants/fonts';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <View className={`items-center justify-center p-8 py-12 bg-white rounded-3xl ${className}`}>
      {/* Icon Container */}
      <View className="w-20 h-20 bg-orange-50/70 rounded-full items-center justify-center mb-6 border border-orange-100/50">
        {icon ? (
          icon
        ) : (
          <HugeiconsIcon icon={Folder01Icon} size={36} color="#FF7E3E" />
        )}
      </View>

      {/* Title */}
      <Text
        className="text-xl text-gray-900 text-center mb-2 font-sans"
        style={{ fontFamily: fontFamily.bold }}
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        className="text-sm text-gray-500 text-center mb-6 max-w-[280px] leading-5 font-sans"
        style={{ fontFamily: fontFamily.regular }}
      >
        {description}
      </Text>

      {/* Call to Action Button */}
      {actionLabel && onAction && (
        <Button 
          title={actionLabel} 
          onPress={onAction} 
          size="md" 
          className="px-6"
        />
      )}
    </View>
  );
};