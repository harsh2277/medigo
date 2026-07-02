import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../src/constants/colors";

// Import all screens directly
import OnboardingScreen from "../src/screens/Auth/OnboardingScreen";
import LoginScreen from "../src/screens/Auth/LoginScreen";
import PhoneLoginScreen from "../src/screens/Auth/PhoneLoginScreen";
import RegisterScreen from "../src/screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "../src/screens/Auth/ForgotPasswordScreen";
import OtpScreen from "../src/screens/Auth/OtpScreen";
import HomeScreen from "../src/screens/Home/HomeScreen";

// Medicines & Cart
import MedicineListScreen, { Medicine } from "../src/screens/Medicines/MedicineListScreen";
import MedicineDetailScreen from "../src/screens/Medicines/MedicineDetailScreen";
import CartScreen, { CartItem } from "../src/screens/Cart/CartScreen";
import CheckoutScreen from "../src/screens/Cart/CheckoutScreen";
import PrescriptionListScreen, { Prescription } from "../src/screens/Prescriptions/PrescriptionListScreen";
import UploadPrescriptionScreen from "../src/screens/Prescriptions/UploadPrescriptionScreen";

// Consultations
import DoctorListScreen, { Doctor } from "../src/screens/Consultations/DoctorListScreen";
import BookConsultationScreen from "../src/screens/Consultations/BookConsultationScreen";
import SessionScreen from "../src/screens/Consultations/SessionScreen";

// Lab Tests
import LabTestListScreen, { LabTest } from "../src/screens/LabTests/LabTestListScreen";
import BookTestScreen from "../src/screens/LabTests/BookTestScreen";
import TestReportScreen from "../src/screens/LabTests/TestReportScreen";

// Orders & Notifications & Support & Profile
import OrderListScreen, { Order } from "../src/screens/Orders/OrderListScreen";
import OrderDetailScreen from "../src/screens/Orders/OrderDetailScreen";
import OrderTrackingScreen from "../src/screens/Orders/OrderTrackingScreen";
import NotificationListScreen from "../src/screens/Notifications/NotificationListScreen";
import FAQScreen from "../src/screens/Support/FAQScreen";
import ContactUsScreen from "../src/screens/Support/ContactUsScreen";
import ProfileScreen from "../src/screens/Profile/ProfileScreen";
import EditProfileScreen from "../src/screens/Profile/EditProfileScreen";
import AddressesScreen from "../src/screens/Profile/AddressesScreen";

type ViewState =
  | "loading"
  | "onboarding"
  | "login"
  | "phone-login"
  | "register"
  | "forgot-password"
  | "otp"
  | "home"
  | "medicines-list"
  | "medicine-detail"
  | "cart"
  | "checkout"
  | "prescription-list"
  | "upload-prescription"
  | "doctor-list"
  | "book-consultation"
  | "session"
  | "lab-list"
  | "book-test"
  | "test-report"
  | "order-list"
  | "order-detail"
  | "order-tracking"
  | "notification-list"
  | "faq"
  | "contact"
  | "profile"
  | "edit-profile"
  | "addresses";

export default function AppEntry() {
  const [currentView, setCurrentView] = useState<ViewState>("loading");
  const [email, setEmail] = useState("");
  const [previousView, setPreviousView] = useState<ViewState>("login");

  // Selected entities for detail screens
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedLabTest, setSelectedLabTest] = useState<LabTest | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const checkAppState = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem("onboarding_completed");
        if (onboardingCompleted !== "true") {
          setCurrentView("onboarding");
        } else {
          setCurrentView("login");
        }
      } catch (error) {
        setCurrentView("login");
      }
    };
    checkAppState();
  }, []);

  const handleResetOnboarding = async () => {
    await AsyncStorage.removeItem("onboarding_completed");
    setCurrentView("onboarding");
  };

  const navigateTo = (view: ViewState) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  // Cart Handlers
  const handleAddToCart = (med: Medicine, qty: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.medicine.id === med.id);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === med.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { medicine: med, quantity: qty }];
    });
    navigateTo("medicines-list");
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.medicine.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.medicine.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.medicine.id !== id));
  };

  if (currentView === "loading") {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={colors.secondary[500]} />
      </View>
    );
  }

  switch (currentView) {
    case "onboarding":
      return <OnboardingScreen onComplete={() => navigateTo("login")} />;
    case "login":
      return (
        <LoginScreen
          onRegister={() => navigateTo("register")}
          onLoginSuccess={() => navigateTo("home")}
          onPhoneLogin={() => navigateTo("phone-login")}
        />
      );
    case "phone-login":
      return (
        <PhoneLoginScreen
          onBack={() => navigateTo("login")}
          onSendOtp={(phone) => {
            setEmail(phone);
            navigateTo("otp");
          }}
        />
      );
    case "register":
      return (
        <RegisterScreen
          onLogin={() => navigateTo("login")}
          onRegisterSuccess={(userEmail) => {
            setEmail(userEmail);
            navigateTo("otp");
          }}
        />
      );
    case "forgot-password":
      return (
        <ForgotPasswordScreen
          onBack={() => navigateTo("login")}
          onResetSuccess={(userEmail) => {
            setEmail(userEmail);
            navigateTo("otp");
          }}
        />
      );
    case "otp":
      return (
        <OtpScreen
          email={email}
          onBack={() => navigateTo(previousView)}
          onVerifySuccess={() => navigateTo("home")}
        />
      );

    // Home
    case "home":
      return (
        <HomeScreen
          onResetOnboarding={handleResetOnboarding}
          onNavigateToMedicines={() => navigateTo("medicines-list")}
          onNavigateToConsultations={() => navigateTo("doctor-list")}
          onNavigateToLabTests={() => navigateTo("lab-list")}
          onNavigateToNotifications={() => navigateTo("notification-list")}
          onNavigateToProfile={() => navigateTo("profile")}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        />
      );

    // Medicines Marketplace Flow
    case "medicines-list":
      return (
        <MedicineListScreen
          onBack={() => navigateTo("home")}
          onSelectMedicine={(med) => {
            setSelectedMedicine(med);
            navigateTo("medicine-detail");
          }}
          onGoToCart={() => navigateTo("cart")}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        />
      );
    case "medicine-detail":
      if (!selectedMedicine) return null;
      return (
        <MedicineDetailScreen
          medicine={selectedMedicine}
          onBack={() => navigateTo("medicines-list")}
          onAddToCart={handleAddToCart}
          onUploadPrescription={() => navigateTo("upload-prescription")}
        />
      );
    case "cart":
      return (
        <CartScreen
          cartItems={cartItems}
          onBack={() => navigateTo("medicines-list")}
          onUpdateQuantity={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          onCheckout={() => navigateTo("checkout")}
        />
      );
    case "checkout":
      return (
        <CheckoutScreen
          cartItems={cartItems}
          onBack={() => navigateTo("cart")}
          onPlaceOrder={(address, payment) => {
            setCartItems([]);
            // Create a mock active order
            const newOrder: Order = {
              id: "1",
              orderNumber: "MD-" + Math.floor(10000 + Math.random() * 90000),
              date: "Today",
              status: "processing",
              itemsCount: 2,
              totalPrice: 42.80,
            };
            setSelectedOrder(newOrder);
            navigateTo("order-tracking");
          }}
        />
      );
    case "prescription-list":
      return (
        <PrescriptionListScreen
          onBack={() => navigateTo("profile")}
          onUpload={() => navigateTo("upload-prescription")}
        />
      );
    case "upload-prescription":
      return (
        <UploadPrescriptionScreen
          onBack={() => navigateTo("prescription-list")}
          onUploadSuccess={() => navigateTo("prescription-list")}
        />
      );

    // Doctor Consultation Flow
    case "doctor-list":
      return (
        <DoctorListScreen
          onBack={() => navigateTo("home")}
          onSelectDoctor={(doc) => {
            setSelectedDoctor(doc);
            navigateTo("book-consultation");
          }}
        />
      );
    case "book-consultation":
      if (!selectedDoctor) return null;
      return (
        <BookConsultationScreen
          doctor={selectedDoctor}
          onBack={() => navigateTo("doctor-list")}
          onConfirmBooking={(dateTime) => navigateTo("session")}
        />
      );
    case "session":
      if (!selectedDoctor) return null;
      return (
        <SessionScreen
          doctor={selectedDoctor}
          onEndCall={() => navigateTo("home")}
        />
      );

    // Lab Test Flow
    case "lab-list":
      return (
        <LabTestListScreen
          onBack={() => navigateTo("home")}
          onSelectTest={(test) => {
            setSelectedLabTest(test);
            navigateTo("book-test");
          }}
        />
      );
    case "book-test":
      if (!selectedLabTest) return null;
      return (
        <BookTestScreen
          test={selectedLabTest}
          onBack={() => navigateTo("lab-list")}
          onConfirmBooking={(dateTime, address) => navigateTo("test-report")}
        />
      );
    case "test-report":
      return (
        <TestReportScreen
          reportTitle={selectedLabTest?.name || "Diagnostic Checkup"}
          reportDate="Today"
          onBack={() => navigateTo("home")}
        />
      );

    // Orders Flow
    case "order-list":
      return (
        <OrderListScreen
          onBack={() => navigateTo("profile")}
          onSelectOrder={(ord) => {
            setSelectedOrder(ord);
            navigateTo("order-detail");
          }}
        />
      );
    case "order-detail":
      if (!selectedOrder) return null;
      return (
        <OrderDetailScreen
          order={selectedOrder}
          onBack={() => navigateTo("order-list")}
          onTrackOrder={() => navigateTo("order-tracking")}
        />
      );
    case "order-tracking":
      if (!selectedOrder) return null;
      return (
        <OrderTrackingScreen
          order={selectedOrder}
          onBack={() => navigateTo("home")}
        />
      );

    // Notification and Support
    case "notification-list":
      return <NotificationListScreen onBack={() => navigateTo("home")} />;
    case "faq":
      return <FAQScreen onBack={() => navigateTo("profile")} />;
    case "contact":
      return <ContactUsScreen onBack={() => navigateTo("profile")} onSubmit={() => navigateTo("profile")} />;

    // Profile Settings Flow
    case "profile":
      return (
        <ProfileScreen
          onResetOnboarding={handleResetOnboarding}
          onEditProfile={() => navigateTo("edit-profile")}
          onViewOrders={() => navigateTo("order-list")}
          onViewAddresses={() => navigateTo("addresses")}
          onViewFAQs={() => navigateTo("faq")}
          onViewPrescriptions={() => navigateTo("prescription-list")}
        />
      );
    case "edit-profile":
      return (
        <EditProfileScreen
          onBack={() => navigateTo("profile")}
          onSave={() => navigateTo("profile")}
        />
      );
    case "addresses":
      return <AddressesScreen onBack={() => navigateTo("profile")} />;

    default:
      return null;
  }
}
