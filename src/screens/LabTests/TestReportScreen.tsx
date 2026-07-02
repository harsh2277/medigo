import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText, StatusBadge } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, DocumentAttachmentIcon } from "@hugeicons/core-free-icons";

export interface ReportItem {
  parameterName: string;
  resultValue: string;
  referenceRange: string;
  unit: string;
  status: "normal" | "high" | "low";
}

const mockReportData: ReportItem[] = [
  {
    parameterName: "Hemoglobin",
    resultValue: "14.2",
    referenceRange: "13.5 - 17.5",
    unit: "g/dL",
    status: "normal",
  },
  {
    parameterName: "Total Cholesterol",
    resultValue: "215",
    referenceRange: "100 - 200",
    unit: "mg/dL",
    status: "high",
  },
  {
    parameterName: "Fasting Blood Sugar",
    resultValue: "92",
    referenceRange: "70 - 100",
    unit: "mg/dL",
    status: "normal",
  },
  {
    parameterName: "Vitamin D3",
    resultValue: "18",
    referenceRange: "30 - 100",
    unit: "ng/mL",
    status: "low",
  },
];

interface TestReportScreenProps {
  reportTitle: string;
  reportDate: string;
  onBack: () => void;
}

export default function TestReportScreen({
  reportTitle = "Full Body Checkup Report",
  reportDate = "June 28, 2026",
  onBack,
}: TestReportScreenProps) {
  const getBadgeType = (status: ReportItem["status"]): "pending" | "completed" | "cancelled" | "active" => {
    switch (status) {
      case "normal":
        return "completed";
      case "high":
        return "cancelled";
      case "low":
        return "pending";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
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
            Lab Report
          </AppText>
        </View>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center"
          onPress={() => {}}
        >
          <HugeiconsIcon icon={DocumentAttachmentIcon} size={20} color="#0D9488" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
        {/* Report Overview Panel */}
        <View className="bg-slate-50 border border-neutral-100 rounded-3xl p-5 mb-6">
          <AppText weight="bold" className="text-[18px] text-neutral-800 mb-1">
            {reportTitle}
          </AppText>
          <AppText weight="medium" className="text-[13px] text-neutral-400 mb-4">
            Tested on {reportDate} • Verified by Metro Labs
          </AppText>
          <View className="flex-row gap-4 items-center">
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <AppText weight="bold" className="text-[12px] text-neutral-600">2 Normal</AppText>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <AppText weight="bold" className="text-[12px] text-neutral-600">1 High</AppText>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <AppText weight="bold" className="text-[12px] text-neutral-600">1 Low</AppText>
            </View>
          </View>
        </View>

        {/* Report Parameters */}
        <View className="mb-8">
          <AppText weight="bold" className="text-[16px] text-neutral-900 mb-4">
            Parameters Checked
          </AppText>

          {mockReportData.map((item) => (
            <View
              key={item.parameterName}
              className="border border-neutral-100 rounded-2xl p-4 mb-4 bg-white shadow-sm"
            >
              <View className="flex-row justify-between items-center mb-3">
                <AppText weight="bold" className="text-[15px] text-neutral-800">
                  {item.parameterName}
                </AppText>
                <StatusBadge
                  status={getBadgeType(item.status)}
                />
              </View>

              <View className="flex-row justify-between items-baseline">
                <View>
                  <AppText weight="medium" className="text-[12px] text-neutral-400 mb-0.5">Result</AppText>
                  <AppText weight="bold" className="text-[18px] text-neutral-800">
                    {item.resultValue} <AppText weight="regular" className="text-[12px] text-neutral-400">{item.unit}</AppText>
                  </AppText>
                </View>

                <View className="items-end">
                  <AppText weight="medium" className="text-[12px] text-neutral-400 mb-0.5">Reference Range</AppText>
                  <AppText weight="bold" className="text-[14px] text-neutral-500">
                    {item.referenceRange} <AppText weight="regular" className="text-[11px] text-neutral-400">{item.unit}</AppText>
                  </AppText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
