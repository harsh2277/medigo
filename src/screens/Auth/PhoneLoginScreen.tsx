import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { Button, AppText, Input } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface PhoneLoginScreenProps {
  onBack: () => void;
  onSendOtp: (phone: string) => void;
}

export default function PhoneLoginScreen({
  onBack,
  onSendOtp,
}: PhoneLoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | undefined>();

  const handleSend = () => {
    if (!phoneNumber) {
      setError("Mobile number is required");
      return;
    }
    if (phoneNumber.length < 8) {
      setError("Please enter a valid mobile number");
      return;
    }
    setError(undefined);
    onSendOtp("+91 " + phoneNumber);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 pt-4 pb-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Back Action */}
          <TouchableOpacity
            className="w-11 h-11 rounded-full bg-slate-50 items-center justify-center mb-10"
            onPress={onBack}
            activeOpacity={0.7}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={24} color={colors.neutral[800]} />
          </TouchableOpacity>

          <View className="flex-1">
            {/* Header */}
            <View className="mb-9">
              <AppText weight="bold" className="text-[32px] text-neutral-900 mb-3 leading-[38px]">
                Enter Mobile Number
              </AppText>
              <AppText weight="regular" className="text-[16px] text-neutral-400">
                We'll send you a verification code
              </AppText>
            </View>

            {/* Input Container */}
            <View className="mb-4">
              <Input
                label="Mobile Number"
                prefix="+91"
                placeholder="98765 43210"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text.replace(/[^0-9]/g, ""));
                  if (error) setError(undefined);
                }}
                keyboardType="phone-pad"
                error={error}
              />
            </View>
          </View>

          {/* Sticky Bottom Action */}
          <View className="mt-auto">
            <Button
              title="Send OTP"
              variant="primary"
              size="lg"
              onPress={handleSend}
              className="w-full"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
