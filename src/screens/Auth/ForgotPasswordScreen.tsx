import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { Input, Button, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Mail01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onResetSuccess: (email: string) => void;
}

export default function ForgotPasswordScreen({ onBack, onResetSuccess }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleResetRequest = () => {
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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

          <View className="flex-1 justify-center">
            {!isSuccess ? (
              <>
                {/* Header */}
                <View className="mb-9">
                  <AppText weight="bold" className="text-[32px] text-neutral-900 mb-3">
                    Forgot Password?
                  </AppText>
                  <AppText weight="regular" className="text-[16px] text-neutral-500 leading-[24px]">
                    Enter your email address and we'll send you an OTP to reset your password.
                  </AppText>
                </View>

                {/* Form */}
                <View className="mb-8">
                  <Input
                    label="Email Address"
                    placeholder="e.g. name@domain.com"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (error) setError(undefined);
                    }}
                    error={error}
                    leftIcon={
                      <HugeiconsIcon icon={Mail01Icon} size={20} color={colors.neutral[400]} />
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Action */}
                <Button
                  title="Send Verification Code"
                  variant="primary"
                  size="lg"
                  onPress={handleResetRequest}
                  isLoading={isLoading}
                  className="w-full"
                />
              </>
            ) : (
              <View className="items-center px-3">
                <View className="w-20 h-20 rounded-full bg-secondary-50 items-center justify-center mb-6">
                  <HugeiconsIcon icon={Mail01Icon} size={36} color={colors.secondary[500]} />
                </View>
                <AppText weight="bold" className="text-[26px] text-neutral-900 mb-3">
                  Check Your Inbox
                </AppText>
                <AppText weight="regular" className="text-[16px] text-neutral-500 text-center leading-[24px]">
                  We sent a 4-digit verification code to <AppText weight="bold" className="text-neutral-800">{email}</AppText>. Please use it to reset your password.
                </AppText>
                <Button
                  title="Verify OTP Code"
                  variant="primary"
                  size="lg"
                  onPress={() => onResetSuccess(email)}
                  className="w-full mt-8"
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
