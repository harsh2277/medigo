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
import { ArrowLeft01Icon, CallIcon, Mail01Icon } from "@hugeicons/core-free-icons";

interface ContactUsScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function ContactUsScreen({
  onBack,
  onSubmit,
}: ContactUsScreenProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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
              Contact Us
            </AppText>
          </View>
          <View className="w-10" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
          {/* Quick Support channels */}
          <View className="flex-row gap-4 mb-8">
            <View className="flex-1 bg-slate-50 border border-slate-100 rounded-3xl p-5 items-center">
              <View className="w-10 h-10 rounded-full bg-teal-50 items-center justify-center mb-3">
                <HugeiconsIcon icon={CallIcon} size={18} color="#0D9488" />
              </View>
              <AppText weight="bold" className="text-[14px] text-neutral-800 mb-1">
                Phone Support
              </AppText>
              <AppText weight="medium" className="text-[12px] text-neutral-400">
                +1 800-345-0100
              </AppText>
            </View>

            <View className="flex-1 bg-slate-50 border border-slate-100 rounded-3xl p-5 items-center">
              <View className="w-10 h-10 rounded-full bg-orange-50 items-center justify-center mb-3">
                <HugeiconsIcon icon={Mail01Icon} size={18} color="#FF7E3E" />
              </View>
              <AppText weight="bold" className="text-[14px] text-neutral-800 mb-1">
                Email Support
              </AppText>
              <AppText weight="medium" className="text-[12px] text-neutral-400">
                support@medigo.com
              </AppText>
            </View>
          </View>

          {/* Form */}
          <View className="gap-5 pb-8">
            <AppText weight="bold" className="text-[16px] text-neutral-900">
              Send us a Message
            </AppText>
            <Input
              label="Subject"
              placeholder="e.g. Issue with checkout"
              value={subject}
              onChangeText={setSubject}
            />
            <Input
              label="Message"
              placeholder="Explain your problem in detail..."
              value={message}
              onChangeText={setMessage}
              multiline
              className="h-28"
            />
          </View>
        </ScrollView>

        {/* Action button */}
        <View className="border-t border-neutral-100 px-6 py-4 bg-white">
          <Button
            title="Submit Message"
            variant="primary"
            size="lg"
            disabled={!subject || !message}
            onPress={onSubmit}
            className="w-full"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
