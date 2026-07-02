import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText, StatusBadge, Button, SearchBar } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowRight01Icon,
  Location01Icon,
  ShoppingCart01Icon,
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
  const renderTabContent = (animScrollY: Animated.Value) => {
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
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: animScrollY } } }],
              { useNativeDriver: false }
            )}
          >
            {/* Promo Banner on Green background */}
            <View className="px-6 mb-6 pt-6">
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
          </Animated.ScrollView>
        );
    }
  };
  // --- Scroll-driven animated header ---
  const scrollY = useRef(new Animated.Value(0)).current;
  const THRESHOLD = 70;

  const locationOpacity = scrollY.interpolate({
    inputRange: [0, THRESHOLD * 0.8],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const locationHeight = scrollY.interpolate({
    inputRange: [0, THRESHOLD],
    outputRange: [60, 0],
    extrapolate: "clamp",
  });
  const cardsOpacity = scrollY.interpolate({
    inputRange: [0, THRESHOLD * 0.6],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const cardsHeight = scrollY.interpolate({
    inputRange: [0, THRESHOLD],
    outputRange: [107, 0],
    extrapolate: "clamp",
  });
  const compactCartOpacity = scrollY.interpolate({
    inputRange: [THRESHOLD * 0.5, THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const compactCartWidth = scrollY.interpolate({
    inputRange: [THRESHOLD * 0.5, THRESHOLD],
    outputRange: [0, 56],
    extrapolate: "clamp",
  });
  const searchPaddingBottom = scrollY.interpolate({
    inputRange: [0, THRESHOLD],
    outputRange: [16, 14],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Header — animates between expanded and compact on scroll */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#E9ECEF",
          borderBottomLeftRadius: 34,
          borderBottomRightRadius: 34,
          overflow: "hidden",
        }}
      >
        {/* Location row — animates out on scroll */}
        <Animated.View
          style={{
            opacity: locationOpacity,
            height: locationHeight,
            overflow: "hidden",
          }}
        >
          <View className="flex-row justify-between items-center px-4 pt-4">
            <View className="flex-row items-center gap-2">
              <HugeiconsIcon icon={Location01Icon} size={18} color="#FF7E3E" />
              <AppText weight="bold" className="text-[16px] text-[#1A1A1A]">
                Bangalore, Karnataka
              </AppText>
            </View>
          </View>
        </Animated.View>

        {/* Search row — always visible; compact cart fades in on scroll */}
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: searchPaddingBottom,
          }}
        >
          {/* Search bar — flex-1 */}
          <View style={{ flex: 1 }}>
            <SearchBar
              placeholder="Search for medicines, lab tests..."
              editable={false}
              disabled={false}
            />
          </View>

          {/* Compact cart button — slides in from right on scroll */}
          <Animated.View
            style={{
              opacity: compactCartOpacity,
              width: compactCartWidth,
              overflow: "hidden",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={onNavigateToNotifications}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#F8F9FA",
                borderWidth: 1,
                borderColor: "#E9ECEF",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <HugeiconsIcon icon={ShoppingCart01Icon} size={20} color="#1A1A1A" />
              <View
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#FF7E3E",
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Cards row — animates out on scroll */}
        <Animated.View
          style={{
            opacity: cardsOpacity,
            height: cardsHeight,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              gap: 12,
              paddingBottom: 16,
            }}
          >
            {/* Lab Tests */}
            <TouchableOpacity
              onPress={onNavigateToLabTests}
              activeOpacity={0.9}
              style={{
                flex: 1,
                backgroundColor: "#FF7E3E",
                borderRadius: 17,
                padding: 2,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  paddingTop: 6,
                  paddingLeft: 12,
                  paddingRight: 6,
                  paddingBottom: 0,
                  overflow: "hidden",
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <View style={{ flex: 1 }}>
                    <AppText weight="bold" className="text-[14px] text-[#1A1A1A]">Lab Tests</AppText>
                    <AppText weight="medium" className="text-[11px] text-[#6B7280] mt-1">Book from home</AppText>
                  </View>
                  <View style={{ width: 62, height: 52, alignItems: "center", justifyContent: "center" }}>
                    <AppText style={{ fontSize: 28 }}>🧪</AppText>
                  </View>
                </View>
                <View style={{ backgroundColor: "#FF7E3E", marginLeft: -12, marginRight: -6, paddingVertical: 4, paddingHorizontal: 10, alignItems: "center" }}>
                  <AppText weight="bold" className="text-[12px] text-white">Buy 1 - Get 1 Free</AppText>
                </View>
              </View>
            </TouchableOpacity>

            {/* Medicines */}
            <TouchableOpacity
              onPress={onNavigateToMedicines}
              activeOpacity={0.9}
              style={{
                flex: 1,
                backgroundColor: "#FF7E3E",
                borderRadius: 17,
                padding: 2,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  paddingTop: 6,
                  paddingLeft: 12,
                  paddingRight: 6,
                  paddingBottom: 0,
                  overflow: "hidden",
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <View style={{ flex: 1 }}>
                    <AppText weight="bold" className="text-[14px] text-[#1A1A1A]">Medicines</AppText>
                    <AppText weight="medium" className="text-[11px] text-[#6B7280] mt-1">Fast delivery</AppText>
                  </View>
                  <View style={{ width: 62, height: 52, alignItems: "center", justifyContent: "center" }}>
                    <AppText style={{ fontSize: 28 }}>💊</AppText>
                  </View>
                </View>
                <View style={{ backgroundColor: "#FF7E3E", marginLeft: -12, marginRight: -6, paddingVertical: 4, paddingHorizontal: 10, alignItems: "center" }}>
                  <AppText weight="bold" className="text-[12px] text-white">Extra Rs.50 OFF</AppText>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {/* Main Tab Screen Body */}
      <View className="flex-1">
        {renderTabContent(scrollY)}
      </View>

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
