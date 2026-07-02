import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText, ProgressBar } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, ImageAddIcon, AlertCircleIcon } from "@hugeicons/core-free-icons";

interface UploadPrescriptionScreenProps {
  onBack: () => void;
  onUploadSuccess: () => void;
}

export default function UploadPrescriptionScreen({
  onBack,
  onUploadSuccess,
}: UploadPrescriptionScreenProps) {
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectFile = () => {
    setFileSelected("prescription_july_2026.jpg");
  };

  const handleUpload = () => {
    if (!fileSelected) return;

    setIsUploading(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setUploadProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          onUploadSuccess();
        }, 500);
      }
    }, 300);
  };

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
              Upload Prescription
            </AppText>
          </View>
          <View className="w-10" />
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 pt-6 pb-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Instructions Card */}
          <View className="bg-slate-50 border border-neutral-100 rounded-2xl p-5 mb-8">
            <View className="flex-row items-center gap-2 mb-3">
              <HugeiconsIcon icon={AlertCircleIcon} size={18} color="#FF7E3E" />
              <AppText weight="bold" className="text-[14px] text-neutral-800">
                Prescription Upload Guide
              </AppText>
            </View>
            <AppText weight="regular" className="text-[13px] text-neutral-500 leading-[20px] mb-2">
              • Ensure the patient name and doctor name are clearly visible.
            </AppText>
            <AppText weight="regular" className="text-[13px] text-neutral-500 leading-[20px] mb-2">
              • Make sure the prescription has not expired (must be within last 6 months).
            </AppText>
            <AppText weight="regular" className="text-[13px] text-neutral-500 leading-[20px]">
              • JPG, PNG, or PDF formats are supported. Max file size: 5MB.
            </AppText>
          </View>

          {/* Upload Box */}
          {!fileSelected ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSelectFile}
              className="border-2 border-dashed border-neutral-200 rounded-3xl py-12 px-6 items-center justify-center bg-slate-50/50 mb-8"
            >
              <View className="w-16 h-16 rounded-full bg-secondary-50 items-center justify-center mb-4">
                <HugeiconsIcon icon={ImageAddIcon} size={30} color="#0D9488" />
              </View>
              <AppText weight="bold" className="text-[16px] text-neutral-800 mb-1.5">
                Select Photo or Document
              </AppText>
              <AppText weight="regular" className="text-[12px] text-neutral-400 text-center">
                Click to open your camera roll or files to pick
              </AppText>
            </TouchableOpacity>
          ) : (
            <View className="border border-neutral-100 rounded-3xl p-5 bg-white shadow-sm mb-8">
              <View className="flex-row items-center justify-between mb-4">
                <AppText weight="bold" className="text-[15px] text-neutral-800">
                  Selected File
                </AppText>
                <TouchableOpacity onPress={() => setFileSelected(null)}>
                  <AppText weight="bold" className="text-[13px] text-status-error-DEFAULT">
                    Remove
                  </AppText>
                </TouchableOpacity>
              </View>
              <AppText weight="medium" className="text-[14px] text-neutral-600 bg-slate-50 border border-neutral-100 rounded-xl p-3 mb-4">
                📄 {fileSelected}
              </AppText>

              {isUploading && (
                <View className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <AppText weight="bold" className="text-[12px] text-neutral-400">Uploading...</AppText>
                    <AppText weight="bold" className="text-[12px] text-secondary-500">{uploadProgress}%</AppText>
                  </View>
                  <ProgressBar progress={uploadProgress / 100} />
                </View>
              )}
            </View>
          )}

          {/* Actions */}
          <View className="mt-auto">
            <Button
              title="Submit Prescription"
              variant="primary"
              size="lg"
              disabled={!fileSelected || isUploading}
              isLoading={isUploading}
              onPress={handleUpload}
              className="w-full"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
