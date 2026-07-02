import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, AppText, StatusBadge } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, ImageAddIcon, DocumentAttachmentIcon } from "@hugeicons/core-free-icons";

export interface Prescription {
  id: string;
  doctorName: string;
  date: string;
  status: "pending" | "success" | "error";
  fileName: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    doctorName: "Dr. Rachel Green",
    date: "July 01, 2026",
    status: "success",
    fileName: "rx_july_01_green.pdf",
  },
  {
    id: "2",
    doctorName: "Dr. Ross Geller",
    date: "June 25, 2026",
    status: "pending",
    fileName: "prescription_scan_25062026.jpg",
  },
  {
    id: "3",
    doctorName: "Dr. Monica Geller",
    date: "May 14, 2026",
    status: "error",
    fileName: "invalid_prescription_doc.png",
  },
];

interface PrescriptionListScreenProps {
  onBack: () => void;
  onUpload: () => void;
}

export default function PrescriptionListScreen({
  onBack,
  onUpload,
}: PrescriptionListScreenProps) {
  const getBadgeType = (status: Prescription["status"]): "pending" | "completed" | "cancelled" | "active" => {
    switch (status) {
      case "success":
        return "completed";
      case "error":
        return "cancelled";
      case "pending":
      default:
        return "pending";
    }
  };

  const getBadgeLabel = (status: Prescription["status"]) => {
    switch (status) {
      case "success":
        return "Verified";
      case "error":
        return "Rejected";
      case "pending":
      default:
        return "Under Review";
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
            My Prescriptions
          </AppText>
        </View>
        <TouchableOpacity
          onPress={onUpload}
          className="w-10 h-10 rounded-full bg-secondary-50 items-center justify-center"
        >
          <HugeiconsIcon icon={ImageAddIcon} size={20} color="#0D9488" />
        </TouchableOpacity>
      </View>

      {/* Prescription List */}
      <FlatList
        data={mockPrescriptions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
        renderItem={({ item }) => (
          <View className="border border-neutral-100 bg-white rounded-2xl p-4 mb-4 shadow-sm flex-row items-start gap-4">
            <View className="w-12 h-12 bg-slate-50 rounded-xl items-center justify-center border border-neutral-100">
              <HugeiconsIcon icon={DocumentAttachmentIcon} size={24} color="#9CA3AF" />
            </View>

            <View className="flex-1">
              <View className="flex-row justify-between items-start mb-1 gap-2">
                <AppText weight="bold" className="text-[15px] text-neutral-800 flex-1" numberOfLines={1}>
                  {item.doctorName}
                </AppText>
                 <StatusBadge
                  status={getBadgeType(item.status)}
                />
              </View>

              <AppText weight="regular" className="text-[13px] text-neutral-400 mb-2">
                Uploaded on {item.date}
              </AppText>
              <AppText weight="medium" className="text-[12px] text-neutral-500 bg-slate-50 rounded-lg p-2 self-start border border-neutral-100">
                📄 {item.fileName}
              </AppText>
            </View>
          </View>
        )}
      />

      {/* Bottom CTA */}
      <View className="px-6 py-4 bg-white border-t border-neutral-100">
        <Button
          title="Upload New Prescription"
          variant="primary"
          size="lg"
          className="w-full"
          onPress={onUpload}
        />
      </View>
    </SafeAreaView>
  );
}
