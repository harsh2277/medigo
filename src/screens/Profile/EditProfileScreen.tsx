import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText, Input } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface EditProfileScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export default function EditProfileScreen({
  onBack,
  onSave,
}: EditProfileScreenProps) {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@domain.com");
  const [phone, setPhone] = useState("+1 555-0199");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("12/04/1995");

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-neutral-100">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center"
              onPress={onBack}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} color="#1F2937" />
            </TouchableOpacity>
            <AppText weight="bold" className="text-[20px] text-neutral-900">
              Edit Profile
            </AppText>
          </View>
          <View className="w-10" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
          {/* Avatar Area */}
          <View className="items-center mb-6">
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-20 h-20 rounded-full bg-slate-50 border border-neutral-100 items-center justify-center overflow-hidden"
            >
              <AppText weight="bold" className="text-[14px] text-neutral-400">
                Change Photo
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View className="gap-5 pb-8">
            <Input
              label="Full Name"
              placeholder="Full name"
              value={name}
              onChangeText={setName}
            />

            <Input
              label="Email Address"
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Phone Number"
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Input
              label="Gender"
              placeholder="Gender"
              value={gender}
              onChangeText={setGender}
            />

            <Input
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChangeText={setDob}
            />
          </View>
        </ScrollView>

        {/* Action Button */}
        <View className="border-t border-neutral-100 px-6 py-4 bg-white">
          <Button
            title="Save Profile"
            variant="primary"
            size="lg"
            onPress={onSave}
            className="w-full"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
