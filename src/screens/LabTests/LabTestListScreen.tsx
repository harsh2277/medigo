import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar, AppText, Button } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, StarIcon } from "@hugeicons/core-free-icons";

export interface LabTest {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sampleType: string;
  tat: string; // Turnaround Time
  description: string;
}

const mockTests: LabTest[] = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    price: 19.99,
    originalPrice: 29.99,
    sampleType: "Blood",
    tat: "24 Hours",
    description: "Evaluates overall health and detects wide range of disorders including anemia and leukemia.",
  },
  {
    id: "2",
    name: "Lipid Profile (Cholesterol)",
    price: 24.99,
    sampleType: "Blood",
    tat: "12 Hours",
    description: "Measures cholesterol and triglycerides in blood to check cardiovascular risk.",
  },
  {
    id: "3",
    name: "Diabetes Screen (HbA1c)",
    price: 15.50,
    originalPrice: 22.00,
    sampleType: "Blood",
    tat: "24 Hours",
    description: "Checks average blood sugar levels over the past 3 months to monitor diabetes control.",
  },
  {
    id: "4",
    name: "Thyroid Profile (T3, T4, TSH)",
    price: 35.00,
    sampleType: "Blood",
    tat: "24 Hours",
    description: "Evaluates thyroid gland function and helps diagnose hyperthyroidism or hypothyroidism.",
  },
];

interface LabTestListScreenProps {
  onBack: () => void;
  onSelectTest: (test: LabTest) => void;
}

export default function LabTestListScreen({
  onBack,
  onSelectTest,
}: LabTestListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = mockTests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Lab Tests
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      {/* Search Bar */}
      <View className="px-6 pt-4 pb-2">
        <SearchBar
          placeholder="Search blood tests, health packages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Popular Packages Section */}
        <View className="px-6 mb-6">
          <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
            Popular Health Packages
          </AppText>
          <View className="bg-gradient-to-r from-teal-500 to-teal-600 bg-secondary-500 rounded-3xl p-5 shadow-sm shadow-secondary-500/20">
            <AppText weight="bold" className="text-white text-[18px] mb-1">
              Active Health Checkup
            </AppText>
            <AppText weight="medium" className="text-teal-100 text-[12px] mb-4">
              Includes 64 key parameters (CBC, Lipid, Kidney, Liver, etc.)
            </AppText>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-baseline gap-2">
                <AppText weight="bold" className="text-white text-[22px]">
                  $49.90
                </AppText>
                <AppText weight="regular" className="text-teal-200 text-[14px] line-through">
                  $99.00
                </AppText>
              </View>
              <TouchableOpacity
                className="bg-white rounded-xl py-2.5 px-4"
                onPress={() => onSelectTest({
                  id: "pkg-1",
                  name: "Active Health Checkup Package",
                  price: 49.90,
                  sampleType: "Blood & Urine",
                  tat: "36 Hours",
                  description: "Full body health package evaluating standard diagnostic factors.",
                })}
              >
                <AppText weight="bold" className="text-[13px] text-secondary-500">
                  Book Now
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Individual Tests */}
        <View className="px-6 pb-8">
          <AppText weight="bold" className="text-[16px] text-neutral-900 mb-3">
            Individual Tests
          </AppText>
          {filteredTests.map((test) => (
            <TouchableOpacity
              key={test.id}
              activeOpacity={0.9}
              onPress={() => onSelectTest(test)}
              className="border border-neutral-100 bg-white rounded-2xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-2 gap-2">
                <AppText weight="bold" className="text-[15px] text-neutral-800 flex-1">
                  {test.name}
                </AppText>
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  ${test.price.toFixed(2)}
                </AppText>
              </View>

              <AppText weight="regular" className="text-[12px] text-neutral-400 mb-4" numberOfLines={2}>
                {test.description}
              </AppText>

              <View className="flex-row justify-between items-center mt-auto border-t border-neutral-50/50 pt-3">
                <AppText weight="medium" className="text-[11px] text-neutral-400">
                  Sample: <AppText weight="bold" className="text-neutral-500">{test.sampleType}</AppText>
                </AppText>
                <AppText weight="medium" className="text-[11px] text-neutral-400">
                  Reports in: <AppText weight="bold" className="text-neutral-500">{test.tat}</AppText>
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
