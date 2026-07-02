import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon, ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";

interface FAQItem {
  question: string;
  answer: string;
}

const mockFAQs: FAQItem[] = [
  {
    question: "How long does medicine delivery take?",
    answer: "Delivery takes 2-4 hours for major metro areas under Express delivery. Standard delivery takes 24-48 hours depending on your pincode.",
  },
  {
    question: "Do I need a prescription to order?",
    answer: "Only prescription-only drugs (marked Rx Req) require a doctor's prescription. OTC health products can be ordered without one.",
  },
  {
    question: "How do I upload a prescription?",
    answer: "You can upload prescriptions directly under the 'My Prescriptions' tab in your Profile, or attach them directly on the Medicine details card.",
  },
  {
    question: "Can I cancel a lab test booking?",
    answer: "Yes, you can cancel any lab checkup up to 2 hours before the scheduled collection window for a full refund.",
  },
];

interface FAQScreenProps {
  onBack: () => void;
}

export default function FAQScreen({ onBack }: FAQScreenProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
            FAQs
          </AppText>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
        {mockFAQs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <View
              key={index}
              className="border border-neutral-100 bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleExpand(index)}
                className="flex-row justify-between items-center p-4 bg-slate-50/50"
              >
                <AppText weight="bold" className="text-[14px] text-neutral-800 flex-1 mr-3">
                  {faq.question}
                </AppText>
                <HugeiconsIcon
                  icon={isExpanded ? ArrowUp01Icon : ArrowDown01Icon}
                  size={16}
                  color="#FF7E3E"
                />
              </TouchableOpacity>

              {isExpanded && (
                <View className="p-4 border-t border-neutral-100">
                  <AppText weight="regular" className="text-[13px] text-neutral-500 leading-[20px]">
                    {faq.answer}
                  </AppText>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
