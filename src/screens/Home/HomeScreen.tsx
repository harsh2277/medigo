import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  runOnJS,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AppText, StatusBadge, Button, SearchBar } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowRight01Icon,
  Location01Icon,
  ShoppingCart01Icon,
  DropletIcon,
  Shield01Icon,
  HeartIcon,
  Medicine01Icon
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
    { label: "Diabetes", icon: DropletIcon, color: "#EF4444", bg: "bg-red-50" },
    { label: "Stomach", icon: Shield01Icon, color: "#3B82F6", bg: "bg-blue-50" },
    { label: "Heart", icon: HeartIcon, color: "#EC4899", bg: "bg-pink-50" },
    { label: "Vitamins", icon: Medicine01Icon, color: "#10B981", bg: "bg-emerald-50" },
  ];

  const surgicalProducts = [
    {
      id: "s-1",
      name: "Glucose Test Strips",
      brand: "ACCU-CHEK",
      price: 189,
      originalPrice: 249,
      discount: "24% OFF",
      image: require("../../../assets/images/glucose_test_strips_1783059864630.png"),
    },
    {
      id: "s-2",
      name: "BP Monitor",
      brand: "OMRON",
      price: 1499,
      originalPrice: 1999,
      discount: "25% OFF",
      image: require("../../../assets/images/bp_monitor_1783059873912.png"),
    },
    {
      id: "s-3",
      name: "Digital Thermometer",
      brand: "DR. MOREPEN",
      price: 299,
      originalPrice: 350,
      discount: "15% OFF",
      image: require("../../../assets/images/digital_thermometer_1783059886044.png"),
    },
    {
      id: "s-4",
      name: "Orthopedic Brace",
      brand: "HANSAPLAST",
      price: 299,
      originalPrice: 350,
      discount: "15% OFF",
      image: require("../../../assets/images/orthopedic_brace_1783059914743.png"),
    },
  ];

  const vitaminsProducts = [
    {
      id: "v-1",
      name: "Vitamin C 500mg",
      brand: "CELIN",
      price: 249,
      originalPrice: 300,
      discount: "17% OFF",
      image: require("../../../assets/images/vitamin_c_celin_1783059794464.png"),
    },
    {
      id: "v-2",
      name: "Omega 3 Fish Oil",
      brand: "WOW",
      price: 399,
      originalPrice: 899,
      discount: "55% OFF",
      image: require("../../../assets/images/omega_3_wow_1783059807556.png"),
    },
    {
      id: "v-3",
      name: "Daily Multivitamin",
      brand: "CENTRUM",
      price: 349,
      originalPrice: 450,
      discount: "22% OFF",
      image: require("../../../assets/images/multivitamin_centrum_1783059816714.png"),
    },
  ];

  const bloodTests = [
    {
      id: "b-1",
      name: "Full Body Checkup Vital",
      tests: "61 Tests",
      price: 599,
      originalPrice: "1,299",
      discount: "54% OFF",
    },
    {
      id: "b-2",
      name: "Diabetes Package",
      tests: "12 Tests",
      price: 299,
      originalPrice: 600,
      discount: "50% OFF",
    },
  ];

  const doctors = [
    {
      id: "d-1",
      name: "Dr. Ananya Sharma",
      specialty: "General Physician",
      experience: "8 yrs exp",
      rating: "4.8",
      image: require("../../../assets/images/login_doctor.png"),
    },
    {
      id: "d-2",
      name: "Dr. Rohan Mehta",
      specialty: "Dermatologist",
      experience: "12 yrs exp",
      rating: "4.9",
      image: require("../../../assets/images/login_doctor.png"),
    },
  ];

  // Helper to render current active tab screen body
  const renderTabContent = (scrollHandler: any) => {
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
            onScroll={scrollHandler}
          >
            {/* Promo Banner on Green background */}
            <View className="px-6 mb-10 pt-6">
              <LinearGradient
                colors={['#00B5A3', '#00D1C1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 24,
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 20,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  overflow: 'hidden',
                  position: 'relative',
                  height: 142
                }}
              >
                <View style={{ flex: 1, gap: 14, zIndex: 10 }}>
                  <View style={{ gap: 4 }}>
                    <AppText weight="bold" className="text-white text-[18px]">
                      Save 25% on Medicines
                    </AppText>
                    <AppText weight="medium" className="text-white text-[12px] opacity-90">
                      India's Lowest Prices 1 lakh+ medicines
                    </AppText>
                  </View>
                  <TouchableOpacity
                    onPress={onNavigateToMedicines}
                    className="bg-[#FF7E3E] rounded-full self-start"
                    style={{ paddingVertical: 8, paddingHorizontal: 16 }}
                  >
                    <AppText weight="bold" className="text-white text-[14px]">
                      Shop Now
                    </AppText>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require("../../../assets/images/banner.png")}
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: 140,
                    height: 142,
                  }}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>

            {/* Top Categories */}
            <View className="px-6 mb-10">
              <View className="flex-row justify-between items-center mb-4">
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  Shop by Category
                </AppText>
                <Button
                  title="See All"
                  variant="ghost"
                  size="none"
                  onPress={onNavigateToMedicines}
                  className="text-[13px] text-[#0D9488]"
                />
              </View>

              <View className="flex-row justify-between">
                {topCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat.label}
                    onPress={onNavigateToMedicines}
                    className="items-center"
                  >
                    <View className={`w-[72px] h-[72px] rounded-[50px] ${cat.bg} items-center justify-center mb-2`}>
                      <HugeiconsIcon icon={cat.icon} size={32} color={cat.color} />
                    </View>
                    <AppText weight="medium" className="text-[12px] text-neutral-600">
                      {cat.label}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Health Devices & Surgicals Grid */}
            <View className="px-6 mb-12">
              <View className="flex-row justify-between items-center mb-4">
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  Health Devices & Surgicals
                </AppText>
                <Button
                  title="See All"
                  variant="ghost"
                  size="none"
                  onPress={onNavigateToMedicines}
                  className="text-[13px] text-[#0D9488]"
                />
              </View>

              <View className="flex-row flex-wrap justify-between">
                {surgicalProducts.map((prod) => (
                  <View
                    key={prod.id}
                    style={{
                      width: (width - 64) / 2,
                      padding: 12,
                      gap: 8,
                      borderColor: '#E9ECEF',
                      borderWidth: 1,
                      borderRadius: 24,
                      backgroundColor: '#FFFFFF',
                      marginBottom: 16
                    }}
                  >
                    <Image
                      source={prod.image}
                      style={{ width: '100%', height: 100, borderRadius: 8 }}
                      resizeMode="contain"
                    />
                    <View style={{ gap: 2, width: '100%' }}>
                      <AppText weight="bold" style={{ fontSize: 10, color: '#666666', textTransform: 'uppercase' }}>
                        {prod.brand}
                      </AppText>
                      <AppText weight="medium" style={{ fontSize: 14, color: '#1A1A1A' }} numberOfLines={1}>
                        {prod.name}
                      </AppText>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                        <AppText weight="bold" style={{ fontSize: 16, color: '#1A1A1A' }}>
                          ₹{prod.price}
                        </AppText>
                        <AppText weight="regular" style={{ fontSize: 12, color: '#666666', textDecorationLine: 'line-through' }}>
                          ₹{prod.originalPrice}
                        </AppText>
                      </View>
                      <View style={{ backgroundColor: '#E6F7F6', borderRadius: 100, paddingVertical: 2, paddingHorizontal: 6 }}>
                        <AppText weight="bold" style={{ fontSize: 10, color: '#00B5A3' }}>
                          {prod.discount}
                        </AppText>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={onNavigateToMedicines}
                      style={{ width: '100%', height: 32, backgroundColor: '#FFFFFF', borderColor: '#00B5A3', borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <AppText weight="bold" style={{ fontSize: 14, color: '#00B5A3' }}>
                        ADD
                      </AppText>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            {/* Offer Banner */}
            <View className="mb-12 bg-[#F47A46] px-6 py-4 flex-row justify-between items-center">
              <View>
                <AppText weight="bold" className="text-white text-[16px] mb-1">
                  10% extra off on first order
                </AppText>
                <AppText weight="regular" className="text-white text-[12px]">
                  Use code 1MGNEW
                </AppText>
              </View>
              <Button
                title="APPLY"
                variant="solid"
                className="bg-white rounded-[100px] px-4 py-2 text-[12px] text-[#F47A46]"
              />
            </View>

            {/* Popular Blood Test Packages */}
            <View className="mb-12">
              <View className="px-6 flex-row justify-between items-center mb-4">
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  Popular Blood Test Packages
                </AppText>
                <Button
                  title="See All"
                  variant="ghost"
                  size="none"
                  onPress={onNavigateToMedicines}
                  className="text-[13px] text-[#0D9488]"
                />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
                {bloodTests.map((test) => (
                  <View key={test.id} style={{ width: 240, padding: 16, borderColor: '#E9ECEF', borderWidth: 1, borderRadius: 20, backgroundColor: '#FFFFFF' }}>
                    <View className="flex-row justify-between items-center mb-3">
                      <AppText weight="bold" className="text-[10px] text-[#00B5A3]">NABL CERTIFIED</AppText>
                      <View className="bg-orange-50 px-2 py-0.5 rounded">
                        <AppText weight="bold" className="text-[9px] text-[#F47A46]">{test.discount}</AppText>
                      </View>
                    </View>
                    <AppText weight="bold" className="text-[14px] text-neutral-900 mb-1">{test.name}</AppText>
                    <View className="flex-row items-center mb-4">
                      <AppText weight="medium" className="text-[11px] text-neutral-500">🔬 {test.tests}</AppText>
                    </View>
                    <View className="flex-row justify-between items-end">
                      <View>
                        <AppText weight="bold" className="text-[16px] text-neutral-900">₹{test.price}</AppText>
                        <AppText weight="regular" className="text-[12px] text-neutral-400 line-through">₹{test.originalPrice}</AppText>
                      </View>
                      <Button
                        title="BOOK"
                        variant="solid"
                        color="secondary"
                        size="sm"
                        className="rounded-full text-[12px] text-neutral-50"
                      />
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Vitamins & Supplements */}
            <View className="mb-12">
              <View className="px-6 flex-row justify-between items-center mb-4">
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  Vitamins & Supplements
                </AppText>
                <Button
                  title="See All"
                  variant="ghost"
                  size="none"
                  onPress={onNavigateToMedicines}
                  className="text-[13px] text-[#0D9488]"
                />
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
                {vitaminsProducts.map((prod) => (
                  <View
                    key={prod.id}
                    style={{
                      width: 150,
                      padding: 12,
                      gap: 8,
                      borderColor: '#E9ECEF',
                      borderWidth: 1,
                      borderRadius: 24,
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Image
                      source={prod.image}
                      style={{ width: '100%', height: 100, borderRadius: 8 }}
                      resizeMode="contain"
                    />
                    <View style={{ gap: 2, width: '100%' }}>
                      <AppText weight="bold" style={{ fontSize: 10, color: '#666666', textTransform: 'uppercase' }}>
                        {prod.brand}
                      </AppText>
                      <AppText weight="medium" style={{ fontSize: 14, color: '#1A1A1A' }} numberOfLines={1}>
                        {prod.name}
                      </AppText>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                        <AppText weight="bold" style={{ fontSize: 16, color: '#1A1A1A' }}>
                          ₹{prod.price}
                        </AppText>
                        <AppText weight="regular" style={{ fontSize: 12, color: '#666666', textDecorationLine: 'line-through' }}>
                          ₹{prod.originalPrice}
                        </AppText>
                      </View>
                    </View>

                    <Button
                      title="ADD"
                      variant="outline"
                      color="secondary"
                      size="sm"
                      className="rounded-full text-[12px] text-secondary"
                      onPress={onNavigateToMedicines}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Doctor Banner */}
            <View className="px-6 mb-12">
              <LinearGradient
                colors={['#00B5A3', '#00D1C1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row overflow-hidden relative"
                style={{ height: 200, borderRadius: 24, paddingTop: 24, paddingLeft: 24, paddingBottom: 24, paddingRight: 24 }}
              >
                <View className="flex-1 z-10 justify-center">
                  <AppText weight="bold" className="text-white text-[20px] mb-3 leading-tight w-[208px]">
                    Switch to Branded{"\n"}Generics - Save 60%
                  </AppText>
                  <View className="gap-1.5 mb-4 w-[208px]">
                    <View className="flex-row items-center gap-2">
                      <AppText weight="bold" className="text-white text-[12px]">✓</AppText>
                      <AppText weight="regular" className="text-white text-[12px]">Trusted by 10L+ users</AppText>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <AppText weight="bold" className="text-white text-[12px]">✓</AppText>
                      <AppText weight="regular" className="text-white text-[12px]">Save Upto 60%</AppText>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <AppText weight="bold" className="text-white text-[12px]">✓</AppText>
                      <AppText weight="regular" className="text-white text-[12px]">Doctor Approved</AppText>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => { }}>
                    <AppText weight="bold" className="text-white text-[12px]" style={{ textDecorationLine: 'underline' }}>
                      Learn More
                    </AppText>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require("../../../assets/images/login_doctor.png")}
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: 180,
                    height: 180,
                  }}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>

            {/* Consult a Doctor */}
            <View className="mb-12">
              <View className="px-6 flex-row justify-between items-center mb-4">
                <AppText weight="bold" className="text-[16px] text-neutral-900">
                  Consult a Doctor
                </AppText>
                <Button
                  title="See All"
                  variant="ghost"
                  size="none"
                  onPress={onNavigateToConsultations}
                  className="text-[13px] text-[#0D9488]"
                />
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
                {doctors.map((doc) => (
                  <View key={doc.id} style={{ width: 140, padding: 12, gap: 12, borderColor: '#E9ECEF', borderWidth: 1, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                    <Image source={doc.image} style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#F8F9FA' }} resizeMode="cover" />
                    
                    <View style={{ alignItems: 'center', gap: 2, width: '100%' }}>
                      <AppText weight="bold" style={{ fontSize: 13, color: '#1A1A1A' }} numberOfLines={1}>
                        {doc.name}
                      </AppText>
                      <AppText weight="medium" style={{ fontSize: 11, color: '#666666' }}>
                        {doc.specialty}
                      </AppText>
                    </View>

                    <Button
                      title="CONSULT"
                      variant="outline"
                      color="secondary"
                      size="sm"
                      className="rounded-full text-[12px] text-secondary w-full"
                      onPress={onNavigateToConsultations}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </Animated.ScrollView>
        );
    }
  };
  // --- Scroll-driven animated header (Reanimated — everything on the UI thread) ---
  // A single shared value drives the whole header, so height, opacity and the
  // cart slide all update in lockstep at 60fps with no thread hops or glitches.
  const scrollY = useSharedValue(0);

  const CART_SLOT = 66;        // room the compact cart (54px) + gap occupies

  // Real, measured heights of the collapsible rows (self-correcting per device/
  // font). We measure the INNER content — which keeps its natural size — because
  // the outer row's height is animated and can't report its expanded size.
  // Fallbacks are sensible first-frame guesses, overwritten on first layout.
  const locationH = useSharedValue(60);
  const cardsH = useSharedValue(107);
  const onLocationLayout = (e: any) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) locationH.value = h;
  };
  const onCardsLayout = (e: any) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) cardsH.value = h;
  };
  const FADE_IN_RATIO = 0.55;  // fraction of the collapse before the cart appears

  // Track compact state (JS side) purely to toggle the overlay cart's tappability.
  const [isCompact, setIsCompact] = useState(false);
  const applyCompact = (next: boolean) =>
    setIsCompact((prev) => (prev === next ? prev : next));
  const compactFlag = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const y = event.contentOffset.y;
    scrollY.value = y;
    // Threshold == total collapsible height → the header vacates layout at
    // exactly finger speed (1:1), so no lurch/gap on slow scroll.
    const threshold = locationH.value + cardsH.value;
    const next = y >= threshold * FADE_IN_RATIO;
    if (next !== compactFlag.value) {
      compactFlag.value = next;
      runOnJS(applyCompact)(next);
    }
  });

  // Location row: collapses its height + fades out.
  const locationStyle = useAnimatedStyle(() => {
    const threshold = locationH.value + cardsH.value;
    return {
      height: interpolate(scrollY.value, [0, threshold], [locationH.value, 0], Extrapolation.CLAMP),
      opacity: interpolate(scrollY.value, [0, threshold * 0.8], [1, 0], Extrapolation.CLAMP),
    };
  });

  // Promo cards row: collapses its height + fades out (a touch faster).
  const cardsStyle = useAnimatedStyle(() => {
    const threshold = locationH.value + cardsH.value;
    return {
      height: interpolate(scrollY.value, [0, threshold], [cardsH.value, 0], Extrapolation.CLAMP),
      opacity: interpolate(scrollY.value, [0, threshold * 0.6], [1, 0], Extrapolation.CLAMP),
    };
  });

  // Search bar shrinks to make room for the compact cart.
  const searchBarStyle = useAnimatedStyle(() => {
    const threshold = locationH.value + cardsH.value;
    return {
      marginRight: interpolate(scrollY.value, [threshold * FADE_IN_RATIO, threshold], [0, CART_SLOT], Extrapolation.CLAMP),
    };
  });

  // Compact cart fades + slides in from the right (never clips, never reflows).
  const compactCartStyle = useAnimatedStyle(() => {
    const threshold = locationH.value + cardsH.value;
    return {
      opacity: interpolate(scrollY.value, [threshold * FADE_IN_RATIO, threshold], [0, 1], Extrapolation.CLAMP),
      transform: [
        { translateX: interpolate(scrollY.value, [threshold * FADE_IN_RATIO, threshold], [24, 0], Extrapolation.CLAMP) },
      ],
    };
  });

  // Reusable cart button. `size` lets the compact cart match the search bar's
  // height (64px) while the expanded-header cart stays smaller (44px).
  const CartButton = ({ size = 44 }: { size?: number }) => (
    <TouchableOpacity
      onPress={onNavigateToNotifications}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#F8F9FA",
        borderWidth: 1,
        borderColor: "#E9ECEF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HugeiconsIcon icon={ShoppingCart01Icon} size={size * 0.45} color="#1A1A1A" />
      <View
        style={{
          position: "absolute",
          top: size * 0.16,
          right: size * 0.16,
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: size * 0.11,
          backgroundColor: "#FF7E3E",
        }}
      />
    </TouchableOpacity>
  );

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
        {/* Location row — collapses height + fades out (single UI-thread node). */}
        <Animated.View style={[{ overflow: "hidden" }, locationStyle]}>
          <View onLayout={onLocationLayout} className="flex-row justify-between items-center px-4 pt-4">
            <View className="flex-row items-center gap-2">
              <HugeiconsIcon icon={Location01Icon} size={18} color="#FF7E3E" />
              <AppText weight="bold" className="text-[16px] text-[#1A1A1A]">
                Bangalore, Karnataka
              </AppText>
            </View>
            {/* Cart — visible in expanded state, fades out with the row */}
            <CartButton />
          </View>
        </Animated.View>

        {/* Search row — always visible; compact cart fades in on scroll */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 16,
            position: "relative",
            justifyContent: "center",
          }}
        >
          {/* Search bar — shrinks via marginRight to make room for the cart */}
          <Animated.View style={searchBarStyle}>
            <SearchBar
              placeholder="Search for medicines, lab tests..."
              editable={false}
              disabled={false}
            />
          </Animated.View>

          {/* Compact cart — absolutely positioned so it never reflows/clips.
              Fades + slides in on scroll (no width animation = no glitch). */}
          <Animated.View
            style={[
              // top: 22 centers the 44px cart against the 64px (h-16) search bar (12 + 10).
              { position: "absolute", right: 16, top: 12 },
              compactCartStyle,
            ]}
            pointerEvents={isCompact ? "auto" : "none"}
          >
            <CartButton size={54} />
          </Animated.View>
        </View>

        {/* Cards row — collapses height + fades out (single UI-thread node). */}
        <Animated.View style={[{ overflow: "hidden" }, cardsStyle]}>
          <View
            onLayout={onCardsLayout}
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
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <View style={{ flex: 1 }}>
                    <AppText weight="bold" className="text-[14px] text-[#1A1A1A]">Lab Tests</AppText>
                    <AppText weight="medium" className="text-[11px] text-[#6B7280] mt-1">Book from home</AppText>
                  </View>
                  <View style={{ width: 62, height: 52, alignItems: "center", justifyContent: "center" }}>
                    <AppText style={{ fontSize: 28 }}>🧪</AppText>
                  </View>
                </View>
                <View style={{ backgroundColor: "#FF7E3E", marginLeft: -12, marginRight: -6, paddingVertical: 4, paddingHorizontal: 10, alignItems: "flex-start" }}>
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
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <View style={{ flex: 1 }}>
                    <AppText weight="bold" className="text-[14px] text-[#1A1A1A]">Medicines</AppText>
                    <AppText weight="medium" className="text-[11px] text-[#6B7280] mt-1">Fast delivery</AppText>
                  </View>
                  <View style={{ width: 62, height: 52, alignItems: "center", justifyContent: "center" }}>
                    <AppText style={{ fontSize: 28 }}>💊</AppText>
                  </View>
                </View>
                <View style={{ backgroundColor: "#FF7E3E", marginLeft: -12, marginRight: -6, paddingVertical: 4, paddingHorizontal: 10, alignItems: "flex-start" }}>
                  <AppText weight="bold" className="text-[12px] text-white">Extra Rs.50 OFF</AppText>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {/* Main Tab Screen Body */}
      <View className="flex-1">
        {renderTabContent(scrollHandler)}
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
