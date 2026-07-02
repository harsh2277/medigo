import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar, Chip, AppText, Button } from "../../components";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ShoppingCart01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

const { width } = Dimensions.get("window");

export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: any;
  isPrescription: boolean;
  rating: number;
  description: string;
  usage: string;
}

const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "OTC",
    price: 4.99,
    originalPrice: 6.99,
    image: require("../../../assets/images/onboarding_pharmacy.png"),
    isPrescription: false,
    rating: 4.7,
    description: "Fast relief from pain, fever, headache, and body aches. Gently formulation that is kind to the stomach.",
    usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Prescription",
    price: 18.50,
    image: require("../../../assets/images/onboarding_pharmacy.png"),
    isPrescription: true,
    rating: 4.5,
    description: "Broad-spectrum antibiotic used to treat bacterial infections. Essential to complete the full prescribed course.",
    usage: "Take 1 capsule 3 times daily, preferably after meals, or as directed by a healthcare professional.",
  },
  {
    id: "3",
    name: "Vitamin C 1000mg Chewable",
    category: "Vitamins",
    price: 12.99,
    originalPrice: 15.99,
    image: require("../../../assets/images/onboarding_pharmacy.png"),
    isPrescription: false,
    rating: 4.9,
    description: "Daily immunity support and antioxidant booster. Delicious orange flavour suitable for daily consumption.",
    usage: "Chew 1 tablet daily, preferably in the morning.",
  },
  {
    id: "4",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 6.50,
    originalPrice: 8.00,
    image: require("../../../assets/images/onboarding_pharmacy.png"),
    isPrescription: false,
    rating: 4.6,
    description: "Non-steroidal anti-inflammatory drug (NSAID) to relieve muscular aches, backache, dental pain, and migraine.",
    usage: "Take 1 tablet with food every 6 hours. Limit to 3 tablets a day.",
  },
  {
    id: "5",
    name: "Loratadine 10mg (Allergy Relief)",
    category: "OTC",
    price: 9.99,
    image: require("../../../assets/images/onboarding_pharmacy.png"),
    isPrescription: false,
    rating: 4.8,
    description: "Non-drowsy 24-hour relief from runny nose, sneezing, itchy/watery eyes, and itchy throat.",
    usage: "Adults and children over 6: Take 1 tablet daily with a glass of water.",
  },
];

interface MedicineListScreenProps {
  onBack: () => void;
  onSelectMedicine: (medicine: Medicine) => void;
  onGoToCart: () => void;
  cartCount: number;
}

export default function MedicineListScreen({
  onBack,
  onSelectMedicine,
  onGoToCart,
  cartCount,
}: MedicineListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Prescription", "OTC", "Pain Relief", "Vitamins"];

  const filteredMedicines = mockMedicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            Medicines
          </AppText>
        </View>

        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center relative"
          onPress={onGoToCart}
        >
          <HugeiconsIcon icon={ShoppingCart01Icon} size={20} color="#1F2937" />
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-primary-500 rounded-full w-5 h-5 items-center justify-center border border-white">
              <AppText weight="bold" className="text-[10px] text-white">
                {cartCount}
              </AppText>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-6 pt-4 pb-2">
        <SearchBar
          placeholder="Search medicines..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories Chips */}
      <View className="pl-6 mb-4">
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip
              label={item}
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
              className="mr-2"
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Medicines List */}
      <FlatList
        data={filteredMedicines}
        numColumns={2}
        className="px-4"
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const discount = item.originalPrice
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : 0;

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onSelectMedicine(item)}
              style={{ width: (width - 48) / 2 }}
              className="bg-white border border-neutral-100 rounded-2xl p-4 mb-4 shadow-sm"
            >
              {/* Discount / Prescription Tag */}
              <View className="flex-row justify-between items-center mb-2 h-6">
                {item.isPrescription ? (
                  <View className="bg-red-50 px-2 py-0.5 rounded-md">
                    <AppText weight="semiBold" className="text-[10px] text-status-error-DEFAULT">
                      Rx Req
                    </AppText>
                  </View>
                ) : (
                  <View />
                )}
                {discount > 0 && (
                  <View className="bg-orange-50 px-2 py-0.5 rounded-md">
                    <AppText weight="bold" className="text-[10px] text-primary-500">
                      -{discount}%
                    </AppText>
                  </View>
                )}
              </View>

              {/* Product Image */}
              <View className="items-center justify-center h-28 mb-3">
                <Image
                  source={item.image}
                  className="w-20 h-20"
                  resizeMode="contain"
                />
              </View>

              {/* Info */}
              <AppText weight="bold" className="text-[14px] text-neutral-800 mb-1" numberOfLines={1}>
                {item.name}
              </AppText>
              <AppText weight="regular" className="text-[12px] text-neutral-400 mb-2">
                {item.category}
              </AppText>

              {/* Price & Add Action */}
              <View className="flex-row justify-between items-center mt-auto">
                <View>
                  <AppText weight="bold" className="text-[16px] text-neutral-900">
                    ${item.price.toFixed(2)}
                  </AppText>
                  {item.originalPrice && (
                    <AppText weight="regular" className="text-[12px] text-neutral-400 line-through">
                      ${item.originalPrice.toFixed(2)}
                    </AppText>
                  )}
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-secondary-500 rounded-full w-8 h-8 items-center justify-center"
                  onPress={() => onSelectMedicine(item)}
                >
                  <AppText weight="bold" className="text-[16px] text-white">+</AppText>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
