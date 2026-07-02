import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { OtpInput, Button, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface OtpScreenProps {
  phone?: string;
  onBack: () => void;
  onVerifySuccess: () => void;
}

export default function OtpScreen({ phone = "your mobile number", onBack, onVerifySuccess }: OtpScreenProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(59);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = () => {
    if (otp.length < 4) {
      setError("Please enter the full 4-digit code");
      return;
    }
    setError(undefined);
    setIsLoading(true);

    // Simulate OTP validation
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "1234") {
        onVerifySuccess();
      } else {
        setError("Invalid verification code. Try '1234'.");
      }
    }, 1500);
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(59);
      setOtp("");
      setError(undefined);
      // Simulate Resending API
    }
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

          {/* Top Content Panel */}
          <View className="mb-8">
            <AppText weight="bold" className="text-[32px] text-neutral-900 mb-3 leading-[38px]">
              Verification Code
            </AppText>
            <AppText weight="regular" className="text-[16px] text-neutral-500 leading-[24px]">
            We've sent a 4-digit verification code to <AppText weight="bold" className="text-neutral-800">{phone}</AppText>. Please enter it below.
            </AppText>
          </View>

          {/* OTP Input Fields */}
          <View className="gap-6 mb-8">
            <OtpInput
              length={4}
              value={otp}
              onChange={(val) => {
                setOtp(val);
                if (error) setError(undefined);
              }}
              error={error}
            />

            {/* Resend Timer */}
            <View className="self-start">
              {countdown > 0 ? (
                <AppText weight="regular" className="text-[14px] text-neutral-400">
                  Resend code in <AppText weight="semiBold" className="text-secondary-500">{countdown}s</AppText>
                </AppText>
              ) : (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <AppText weight="bold" className="text-[14px] text-primary-500 underline">
                    Resend Code
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Sticky Bottom Action */}
          <View className="mt-auto">
            <Button
              title="Verify & Proceed"
              variant="primary"
              size="lg"
              onPress={handleVerify}
              isLoading={isLoading}
              className="w-full"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
