import React from 'react';
import { Modal as RNModal, View, TouchableOpacity } from 'react-native';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children, className = '' }) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        {/* Click outside to close */}
        <TouchableOpacity 
          className="absolute inset-0"
          activeOpacity={1}
          onPress={onClose}
        />
        
        {/* Premium Modal Panel */}
        <View 
          className={`bg-white rounded-[32px] w-full p-7 border border-gray-100/50 shadow-2xl ${className}`}
          style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
};