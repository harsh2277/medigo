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
import { Input, Button, Checkbox, AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Mail01Icon, LockIcon, UserIcon } from "@hugeicons/core-free-icons";

interface RegisterScreenProps {
  onLogin: () => void;
  onRegisterSuccess: (email: string) => void;
}

export default function RegisterScreen({ onLogin, onRegisterSuccess }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agree?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name) newErrors.name = "Full name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!agree) {
      newErrors.agree = "You must agree to the Terms of Service";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onRegisterSuccess(email);
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
          className="px-6 pt-8 pb-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-8">
            <AppText weight="bold" className="text-[32px] text-neutral-900 mb-2">
              Create Account
            </AppText>
            <AppText weight="regular" className="text-[16px] text-neutral-500 leading-[24px]">
              Sign up to start managing your health
            </AppText>
          </View>

          {/* Form */}
          <View className="gap-5 mb-8">
            <Input
              label="Full Name"
              placeholder="e.g. John Doe"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              error={errors.name}
              leftIcon={
                <HugeiconsIcon icon={UserIcon} size={20} color={colors.neutral[400]} />
              }
            />

            <Input
              label="Email Address"
              placeholder="e.g. name@domain.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              leftIcon={
                <HugeiconsIcon icon={Mail01Icon} size={20} color={colors.neutral[400]} />
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Min 6 characters"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              leftIcon={
                <HugeiconsIcon icon={LockIcon} size={20} color={colors.neutral[400]} />
              }
              isPassword
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: undefined });
              }}
              error={errors.confirmPassword}
              leftIcon={
                <HugeiconsIcon icon={LockIcon} size={20} color={colors.neutral[400]} />
              }
              isPassword
            />

            <View className="flex-row items-center gap-3 mt-2">
              <Checkbox
                checked={agree}
                onChange={(checked) => {
                  setAgree(checked);
                  if (errors.agree) setErrors({ ...errors, agree: undefined });
                }}
              />
              <AppText weight="regular" className="text-[14px] text-neutral-600 flex-1 leading-[20px]">
                I agree to the <AppText className="text-secondary-500 font-semibold">Terms of Service</AppText> and{" "}
                <AppText className="text-secondary-500 font-semibold">Privacy Policy</AppText>
              </AppText>
            </View>
            {errors.agree && (
              <AppText weight="medium" className="text-[12px] text-status-error-DEFAULT ml-8">
                {errors.agree}
              </AppText>
            )}
          </View>

          {/* Actions */}
          <View className="gap-6 w-full mt-auto">
            <Button
              title="Create Account"
              variant="primary"
              size="lg"
              onPress={handleRegister}
              isLoading={isLoading}
              className="w-full"
            />

            <View className="flex-row justify-center items-center">
              <AppText weight="regular" className="text-[15px] text-neutral-500">
                Already have an account?{" "}
              </AppText>
              <TouchableOpacity onPress={onLogin}>
                <AppText weight="bold" className="text-[15px] text-primary-500">
                  Sign In
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
