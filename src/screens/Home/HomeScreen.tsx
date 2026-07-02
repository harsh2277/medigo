import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText, StatusBadge, Button } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowRight01Icon,
  Search01Icon,
  Location01Icon,
  ShoppingCart01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

// Custom SVG components for the new bottom nav bar
import Svg, { Path, Rect, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

// Pentagon Home Icon with "+" sign
const CustomHomeIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L3 9v11a2 2 0 002 2h14a2 2 0 002-2V9l-9-7z"
      fill={active ? "#0D9488" : "none"}
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M12 9v6M9 12h6"
      stroke={active ? "#FFFFFF" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

// Sanitizer pump bottle SVG icon
const CustomCategoriesIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9a4 4 0 014 4v7H8v-7a4 4 0 014-4z"
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 5v4M12 5c-1.5 0-3 1-3 2M16 9h-8"
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={15} r={1.5} fill={active ? "#0D9488" : "#9CA3AF"} />
  </Svg>
);

// Blood drop + test tube SVG icon
const CustomLabTestIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 3h6M10 3v15a2 2 0 002 2h0a2 2 0 002-2V3"
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M6 12a3 3 0 003 3h0a3 3 0 003-3V9a3 3 0 00-3-3h0a3 3 0 00-3 3v3z"
      fill={active ? "#0D9488" : "none"}
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
    />
    <Circle cx={9} cy={10} r={1} fill={active ? "#FFFFFF" : "#9CA3AF"} />
  </Svg>
);

// Stethoscope SVG icon
const CustomConsultIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4v8M12 12a4 4 0 00-4 4v1a3 3 0 006 0v-1a4 4 0 00-4-4z"
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={4} r={2} stroke={active ? "#0D9488" : "#9CA3AF"} strokeWidth={2} />
    <Path
      d="M18 10a6 6 0 01-12 0"
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

// Rupee Savings Coin SVG icon
const CustomSavingsIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle
      cx={12}
      cy={12}
      r={9}
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
    />
    <Path
      d="M9 9h6M9 12h5M9 9c3 0 3 6 0 6M12 15h3"
      stroke={active ? "#0D9488" : "#9CA3AF"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface HomeScreenProps {
  onResetOnboarding: () => void;
  onNavigateToMedicines: () => void;
  onNavigateToConsultations: () => void;
  onNavigateToLabTests: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToProfile: () => void;
  cartCount: number;
}

type TabType = "Home" | "Categories" | "Lab Test" | "Consult" | "Savings";

export default function HomeScreen({
  onResetOnboarding,
  onNavigateToMedicines,
  onNavigateToConsultations,
  onNavigateToLabTests,
  onNavigateToNotifications,
  onNavigateToProfile,
  cartCount,
}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Home");

  // Category Lists
  const topCategories = [
    { label: "Diabetes", icon: "💧", bg: "bg-red-50" },
    { label: "Stomach", icon: "🛡️", bg: "bg-blue-50" },
    { label: "Heart", icon: "❤️", bg: "bg-purple-50" },
    { label: "Vitamins", icon: "💊", bg: "bg-emerald-50" },
  ];

  const surgicalProducts = [
    {
      id: "s-1",
      name: "Glucose Test Strips",
      brand: "ACCU-CHEK",
      price: 189,
      originalPrice: 249,
      discount: "24% OFF",
      image: require("../../../assets/images/onboarding_pharmacy.png"),
    },
    {
      id: "s-2",
      name: "BP Monitor",
      brand: "OMRON",
      price: 1499,
      originalPrice: 1999,
      discount: "25% OFF",
      image: require("../../../assets/images/onboarding_pharmacy.png"),
    },
    {
      id: "s-3",
      name: "Digital Thermometer",
      brand: "DR. MOREPEN",
      price: 299,
      originalPrice: 350,
      discount: "15% OFF",
      image: require("../../../assets/images/onboarding_pharmacy.png"),
    },
    {
      id: "s-4",
      name: "Orthopedic Brace",
      brand: "HANSAPLAST",
      price: 299,
      originalPrice: 350,
      discount: "15% OFF",
      image: require("../../../assets/images/onboarding_pharmacy.png"),
    },
  ];

  // Helper to render current active tab screen body
  const renderTabContent = () => {
    switch (activeTab) {
      case "Categories":
        return (
          <ScrollView className="flex-1 px-6 pt-4">
            <AppText weight="bold" className="text-[18px] text-neutral-900 mb-4">
              Shop by Category
            </AppText>
            {/* Mock Categories list */}
            {["Medicines", "Wellness", "Devices", "Personal Care", "Nutrition", "Baby Care"].map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={onNavigateToMedicines}
                className="border border-neutral-100 rounded-2xl p-4 mb-3 bg-white flex-row justify-between items-center"
              >
                <AppText weight="bold" className="text-[15px] text-neutral-800">{cat}</AppText>
                <AppText weight="bold" className="text-[16px] text-neutral-400">›</AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case "Lab Test":
        // Fallback to Lab list trigger
        return (
          <View className="flex-1 justify-center px-6 items-center">
            <Button
              title="Open Lab Tests Portal"
              variant="primary"
              onPress={onNavigateToLabTests}
              className="w-full max-w-xs"
            />
          </View>
        );
      case "Consult":
        return (
          <View className="flex-1 justify-center px-6 items-center">
            <Button
              title="Find Doctors"
              variant="primary"
              onPress={onNavigateToConsultations}
              className="w-full max-w-xs"
            />
          </View>
        );
      case "Savings":
        return (
          <ScrollView className="flex-1 px-6 pt-4">
            <AppText weight="bold" className="text-[18px] text-neutral-900 mb-4">
              Your Health Savings
            </AppText>
            <View className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-4">
              <AppText weight="bold" className="text-primary-500 text-[16px] mb-1">Coupon: MEDIC10</AppText>
              <AppText weight="regular" className="text-neutral-600 text-[13px]">
                Get 10% extra discount on all medicine packages.
              </AppText>
            </View>
          </ScrollView>
        );
      case "Home":
      default:
        return (
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            {/* Services Row Grid */}
            <View className="flex-row px-6 gap-4 mb-6">
              {/* Lab Tests */}
              <TouchableOpacity
                onPress={onNavigateToLabTests}
                activeOpacity={0.9}
                className="flex-1 border-2 border-orange-100 bg-white rounded-3xl p-4 shadow-sm relative overflow-hidden"
              >
                <AppText weight="black" className="text-[16px] text-neutral-900 mb-1">
                  Lab Tests
                </AppText>
                <AppText weight="medium" className="text-[11px] text-neutral-400 mb-2">
                  Book from home
                </AppText>
                <View className="bg-orange-500 rounded-lg py-1 px-2 self-start mb-2">
                  <AppText weight="bold" className="text-[9px] text-white">Buy 1 - Get 1 Free</AppText>
                </View>
                <View className="absolute bottom-2 right-2 opacity-10">
                  <CustomLabTestIcon active />
                </View>
              </TouchableOpacity>

              {/* Medicines */}
              <TouchableOpacity
                onPress={onNavigateToMedicines}
                activeOpacity={0.9}
                className="flex-1 border-2 border-orange-100 bg-white rounded-3xl p-4 shadow-sm relative overflow-hidden"
              >
                <AppText weight="black" className="text-[16px] text-neutral-900 mb-1">
                  Medicines
                </AppText>
                <AppText weight="medium" className="text-[11px] text-neutral-400 mb-2">
                  Fastest delivery
                </AppText>
                <View className="bg-orange-500 rounded-lg py-1 px-2 self-start mb-2">
                  <AppText weight="bold" className="text-[9px] text-white">Extra Rx.30 OFF</AppText>
                </View>
                <View className="absolute bottom-2 right-2 opacity-10">
                  <CustomCategoriesIcon active />
                </View>
              </TouchableOpacity>
            </View>

            {/* Promo Banner on Green background */}
            <View className="px-6 mb-6">
              <View className="bg-[#00B4D8] rounded-[24px] p-5 flex-row justify-between items-center overflow-hidden relative">
                <View className="flex-1 pr-2 z-10">
                  <AppText weight="black" className="text-white text-[20px] mb-1">
                    Save 25% on Medicines
                  </AppText>
                  <AppText weight="bold" className="text-teal-50 text-[12px] mb-4">
                    India's Lowest Prices Guaranteed
                  </AppText>
                  <TouchableOpacity
                    onPress={onNavigateToMedicines}
                    className="bg-[#FF7E3E] rounded-full py-2.5 px-6 self-start"
                  >
                    <AppText weight="bold" className="text-[12px] text-white">
                      Shop Now
                    </AppText>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require("../../../assets/images/login_doctor.png")}
                  style={{
                    width: width * 0.32,
                    height: width * 0.35,
                    marginBottom: -30,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Top Categories */}
            <View className="px-6 mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  Top Categories
                </AppText>
                <TouchableOpacity onPress={onNavigateToMedicines}>
                  <AppText weight="bold" className="text-[13px] text-[#0D9488]">
                    See All ›
                  </AppText>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between">
                {topCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat.label}
                    onPress={onNavigateToMedicines}
                    className="items-center"
                  >
                    <View className={`w-14 h-14 rounded-full ${cat.bg} items-center justify-center mb-2`}>
                      <AppText className="text-[22px]">{cat.icon}</AppText>
                    </View>
                    <AppText weight="bold" className="text-[11px] text-neutral-500">
                      {cat.label}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Health Devices & Surgicals Grid */}
            <View className="px-6 mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  Health Devices & Surgicals
                </AppText>
                <TouchableOpacity onPress={onNavigateToMedicines}>
                  <AppText weight="bold" className="text-[13px] text-[#0D9488]">
                    See All ›
                  </AppText>
                </TouchableOpacity>
              </View>

              <View className="flex-row flex-wrap justify-between">
                {surgicalProducts.map((prod) => (
                  <View
                    key={prod.id}
                    style={{ width: (width - 64) / 2 }}
                    className="border border-neutral-100 rounded-2xl p-3 bg-white mb-4 shadow-sm"
                  >
                    <View className="bg-orange-50 px-2 py-0.5 rounded self-start mb-2">
                      <AppText weight="bold" className="text-[9px] text-primary-500">
                        {prod.discount}
                      </AppText>
                    </View>
                    <Image
                      source={prod.image}
                      className="w-20 h-20 self-center mb-2"
                      resizeMode="contain"
                    />
                    <AppText weight="regular" className="text-[10px] text-neutral-400 mb-0.5">
                      {prod.brand}
                    </AppText>
                    <AppText weight="bold" className="text-[13px] text-neutral-850 mb-2 h-8" numberOfLines={2}>
                      {prod.name}
                    </AppText>
                    <View className="flex-row justify-between items-baseline mb-3">
                      <AppText weight="black" className="text-[14px] text-neutral-900">
                        ₹{prod.price}
                      </AppText>
                      <AppText weight="regular" className="text-[10px] text-neutral-400 line-through">
                        ₹{prod.originalPrice}
                      </AppText>
                    </View>
                    <TouchableOpacity
                      onPress={onNavigateToMedicines}
                      className="border border-[#0D9488] rounded-full py-1.5 items-center"
                    >
                      <AppText weight="bold" className="text-[11px] text-[#0D9488]">
                        ADD
                      </AppText>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            {/* Flat promo banner */}
            <View className="mx-6 mb-8 bg-[#FF7E3E] rounded-xl p-3 flex-row justify-between items-center">
              <AppText weight="bold" className="text-white text-[12px]">
                10% extra off on first order • Use code MEDICNEW
              </AppText>
              <TouchableOpacity className="bg-white rounded-lg px-2.5 py-1">
                <AppText weight="bold" className="text-[10px] text-[#FF7E3E]">APPLY</AppText>
              </TouchableOpacity>
            </View>

            {/* Debug Onboarding reset button */}
            <View className="px-6 pb-12 items-center">
              <TouchableOpacity
                onPress={onResetOnboarding}
                className="border border-neutral-200 rounded-full py-2 px-5"
              >
                <AppText weight="bold" className="text-[12px] text-neutral-400">
                  Reset Onboarding (Debug Mode)
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Location header bar */}
      <View className="flex-row justify-between items-center px-6 py-3 border-b border-neutral-50 bg-white">
        <View className="flex-row items-center gap-1.5">
          <HugeiconsIcon icon={Location01Icon} size={16} color="#FF7E3E" />
          <AppText weight="bold" className="text-[14px] text-neutral-800">
            Bangalore, Karnataka
          </AppText>
          <HugeiconsIcon icon={ArrowDown01Icon} size={12} color="#1F2937" />
        </View>

        <TouchableOpacity
          onPress={onNavigateToNotifications}
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center relative"
        >
          <HugeiconsIcon icon={ShoppingCart01Icon} size={20} color="#1F2937" />
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-[#FF7E3E] rounded-full w-5 h-5 items-center justify-center border border-white">
              <AppText weight="bold" className="text-[10px] text-white">
                {cartCount}
              </AppText>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Input bar */}
      <View className="px-6 py-3 bg-white">
        <View className="flex-row items-center bg-slate-50 border border-neutral-100 rounded-full px-5 h-12">
          <HugeiconsIcon icon={Search01Icon} size={18} color="#9CA3AF" className="mr-3" />
          <TextInput
            placeholder="Search for medicines, lab tests..."
            placeholderTextColor="#9CA3AF"
            editable={false}
            className="flex-1 text-[13px] font-sans text-neutral-800"
          />
        </View>
      </View>

      {/* Main Tab Screen Body */}
      <View className="flex-1">{renderTabContent()}</View>

      {/* Stepped custom bottom navigation bar */}
      <View className="flex-row border-t border-neutral-100 bg-white pt-2.5 pb-2 justify-around items-center">
        {/* Tab 1: Home */}
        <TouchableOpacity
          onPress={() => setActiveTab("Home")}
          className="items-center"
        >
          <CustomHomeIcon active={activeTab === "Home"} />
          <AppText
            weight="bold"
            className={`text-[10px] mt-1 ${activeTab === "Home" ? "text-[#0D9488]" : "text-neutral-400"}`}
          >
            Home
          </AppText>
        </TouchableOpacity>

        {/* Tab 2: Categories */}
        <TouchableOpacity
          onPress={() => setActiveTab("Categories")}
          className="items-center"
        >
          <CustomCategoriesIcon active={activeTab === "Categories"} />
          <AppText
            weight="bold"
            className={`text-[10px] mt-1 ${activeTab === "Categories" ? "text-[#0D9488]" : "text-neutral-400"}`}
          >
            Categories
          </AppText>
        </TouchableOpacity>

        {/* Tab 3: Lab Test */}
        <TouchableOpacity
          onPress={() => setActiveTab("Lab Test")}
          className="items-center"
        >
          <CustomLabTestIcon active={activeTab === "Lab Test"} />
          <AppText
            weight="bold"
            className={`text-[10px] mt-1 ${activeTab === "Lab Test" ? "text-[#0D9488]" : "text-neutral-400"}`}
          >
            Lab Test
          </AppText>
        </TouchableOpacity>

        {/* Tab 4: Consult */}
        <TouchableOpacity
          onPress={() => setActiveTab("Consult")}
          className="items-center"
        >
          <CustomConsultIcon active={activeTab === "Consult"} />
          <AppText
            weight="bold"
            className={`text-[10px] mt-1 ${activeTab === "Consult" ? "text-[#0D9488]" : "text-neutral-400"}`}
          >
            Consult
          </AppText>
        </TouchableOpacity>

        {/* Tab 5: Savings */}
        <TouchableOpacity
          onPress={() => setActiveTab("Savings")}
          className="items-center"
        >
          <CustomSavingsIcon active={activeTab === "Savings"} />
          <AppText
            weight="bold"
            className={`text-[10px] mt-1 ${activeTab === "Savings" ? "text-[#0D9488]" : "text-neutral-400"}`}
          >
            Savings
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
