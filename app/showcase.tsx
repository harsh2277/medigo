import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/constants/colors';
import { fontFamily } from '../src/constants/fonts';
import {
  Badge, BottomSheet, BottomTabBar, Button, Checkbox, Chip,
  DiscountBadge, Dropdown, EmptyState, Input, Loader, Modal,
  OtpInput, ProgressBar, RadioButton, SearchBar, StatusBadge, Stepper,
  Switch, Tag, Toast, Tooltip
} from '../src/components';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowLeft01Icon, ArrowRight01Icon, StarIcon, PlusSignIcon } from '@hugeicons/core-free-icons';

export default function ShowcaseScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const [isRadio, setIsRadio] = useState(false);
  const [isSwitch, setIsSwitch] = useState(false);
  const [dropdownVal, setDropdownVal] = useState('1');
  const [otp, setOtp] = useState('');
  const [otpActive, setOtpActive] = useState('12');
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'search', label: 'Search' },
    { key: 'profile', label: 'Profile' },
  ];

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.sectionBody}>{children}</View>
      <View style={s.divider} />
    </View>
  );

  const ColorSwatch = ({ name, hex }: { name: string; hex: string }) => (
    <View style={s.swatchWrap}>
      <View style={[s.swatchBox, { backgroundColor: hex }]} />
      <Text style={s.swatchName}>{name}</Text>
      <Text style={s.swatchHex}>{hex}</Text>
    </View>
  );

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120, paddingTop: 32 }}>

        {/* Header */}
        <View style={s.header}>
          <Text style={s.appName}>Medigo</Text>
          <Text style={s.appSubtitle}>Design System Reference</Text>
        </View>

        {/* ── COLOR PALETTE ── */}
        <Section title="Color Palette">
          <Text style={s.subLabel}>Primary (Orange)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            {Object.entries(colors.primary).filter(([k]) => k !== 'DEFAULT').map(([key, hex]) => (
              <ColorSwatch key={`p-${key}`} name={key} hex={hex as string} />
            ))}
          </ScrollView>

          <Text style={s.subLabel}>Secondary (Teal)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            {Object.entries(colors.secondary).filter(([k]) => k !== 'DEFAULT').map(([key, hex]) => (
              <ColorSwatch key={`s-${key}`} name={key} hex={hex as string} />
            ))}
          </ScrollView>

          <Text style={s.subLabel}>Neutral (Slate)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            {Object.entries(colors.neutral).map(([key, hex]) => (
              <ColorSwatch key={`n-${key}`} name={key} hex={hex as string} />
            ))}
          </ScrollView>

          <Text style={s.subLabel}>Status Variants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(colors.status).map(([key, variants]) => (
              <View key={key} style={s.statusGroup}>
                <Text style={s.statusGroupLabel}>{key}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <ColorSwatch name="light" hex={(variants as any).light} />
                  <ColorSwatch name="base" hex={(variants as any).DEFAULT} />
                  <ColorSwatch name="dark" hex={(variants as any).dark} />
                </View>
              </View>
            ))}
          </ScrollView>
        </Section>

        {/* ── TYPOGRAPHY ── */}
        <Section title="Typography">
          <View style={s.card}>
            <Text style={[s.typo, { fontSize: 36, fontFamily: fontFamily.black }]}>Heading 1</Text>
            <Text style={[s.typo, { fontSize: 30, fontFamily: fontFamily.bold }]}>Heading 2</Text>
            <Text style={[s.typo, { fontSize: 24, fontFamily: fontFamily.semiBold }]}>Heading 3</Text>
            <Text style={[s.typo, { fontSize: 20, fontFamily: fontFamily.medium }]}>Heading 4</Text>
            <Text style={[s.typo, { fontSize: 18, color: '#374151', fontFamily: fontFamily.regular }]}>Body Large – The quick brown fox jumps over the lazy dog.</Text>
            <Text style={[s.typo, { fontSize: 16, color: '#4B5563', fontFamily: fontFamily.light }]}>Body Regular – The quick brown fox jumps over the lazy dog.</Text>
            <Text style={[s.typo, { fontSize: 14, color: '#6B7280', fontFamily: fontFamily.thin }]}>Body Small – The quick brown fox jumps over the lazy dog.</Text>
          </View>
        </Section>

        {/* ── BUTTONS ── */}
        <Section title="Buttons Showcase">
          <View style={{ gap: 28 }}>

            {/* 1. PRIMARY BUTTONS */}
            <View style={s.card}>
              <Text style={{ fontSize: 18, color: '#F95D11', fontFamily: fontFamily.bold, marginBottom: 12 }}>1. Primary Color Buttons (Orange)</Text>

              <View style={{ gap: 16 }}>
                <View>
                  <Text style={s.subLabel}>Fill / Solid (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Solid LG" variant="primary" size="lg" />
                    <Button title="Solid MD" variant="primary" size="md" />
                    <Button title="Solid SM" variant="primary" size="sm" />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Line / Outline (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Line LG" variant="line" color="primary" size="lg" />
                    <Button title="Line MD" variant="line" color="primary" size="md" />
                    <Button title="Line SM" variant="line" color="primary" size="sm" />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Left Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Left Icon LG" variant="primary" size="lg" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={18} color="#fff" />} />
                    <Button title="Left Icon MD" variant="primary" size="md" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="#fff" />} />
                    <Button title="Left Icon SM" variant="primary" size="sm" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={14} color="#fff" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Right Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Right Icon LG" variant="primary" size="lg" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={18} color="#fff" />} />
                    <Button title="Right Icon MD" variant="primary" size="md" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#fff" />} />
                    <Button title="Right Icon SM" variant="primary" size="sm" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={14} color="#fff" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Only Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button variant="primary" size="lg" icon={<HugeiconsIcon icon={PlusSignIcon} size={24} color="#fff" />} />
                    <Button variant="primary" size="md" icon={<HugeiconsIcon icon={PlusSignIcon} size={20} color="#fff" />} />
                    <Button variant="primary" size="sm" icon={<HugeiconsIcon icon={PlusSignIcon} size={16} color="#fff" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>States (Normal, Disabled, Loading) - All Sizes</Text>
                  {/* Large */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal LG" variant="primary" size="lg" />
                    <Button title="Disabled LG" variant="primary" size="lg" disabled />
                    <Button title="Loading LG" variant="primary" size="lg" isLoading />
                  </View>
                  {/* Medium */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal MD" variant="primary" size="md" />
                    <Button title="Disabled MD" variant="primary" size="md" disabled />
                    <Button title="Loading MD" variant="primary" size="md" isLoading />
                  </View>
                  {/* Small */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Normal SM" variant="primary" size="sm" />
                    <Button title="Disabled SM" variant="primary" size="sm" disabled />
                    <Button title="Loading SM" variant="primary" size="sm" isLoading />
                  </View>
                </View>
              </View>
            </View>

            {/* 2. SECONDARY BUTTONS */}
            <View style={s.card}>
              <Text style={{ fontSize: 18, color: '#009183', fontFamily: fontFamily.bold, marginBottom: 12 }}>2. Secondary Color Buttons (Teal)</Text>

              <View style={{ gap: 16 }}>
                <View>
                  <Text style={s.subLabel}>Fill / Solid (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Solid LG" variant="secondary" size="lg" />
                    <Button title="Solid MD" variant="secondary" size="md" />
                    <Button title="Solid SM" variant="secondary" size="sm" />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Line / Outline (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Line LG" variant="line" color="secondary" size="lg" />
                    <Button title="Line MD" variant="line" color="secondary" size="md" />
                    <Button title="Line SM" variant="line" color="secondary" size="sm" />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Left Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Left Icon LG" variant="secondary" size="lg" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={18} color="#fff" />} />
                    <Button title="Left Icon MD" variant="secondary" size="md" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="#fff" />} />
                    <Button title="Left Icon SM" variant="secondary" size="sm" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={14} color="#fff" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Right Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Right Icon LG" variant="secondary" size="lg" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={18} color="#fff" />} />
                    <Button title="Right Icon MD" variant="secondary" size="md" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#fff" />} />
                    <Button title="Right Icon SM" variant="secondary" size="sm" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={14} color="#fff" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Only Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button variant="secondary" size="lg" icon={<HugeiconsIcon icon={PlusSignIcon} size={24} color="#fff" />} />
                    <Button variant="secondary" size="md" icon={<HugeiconsIcon icon={PlusSignIcon} size={20} color="#fff" />} />
                    <Button variant="secondary" size="sm" icon={<HugeiconsIcon icon={PlusSignIcon} size={16} color="#fff" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>States (Normal, Disabled, Loading) - All Sizes</Text>
                  {/* Large */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal LG" variant="secondary" size="lg" />
                    <Button title="Disabled LG" variant="secondary" size="lg" disabled />
                    <Button title="Loading LG" variant="secondary" size="lg" isLoading />
                  </View>
                  {/* Medium */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal MD" variant="secondary" size="md" />
                    <Button title="Disabled MD" variant="secondary" size="md" disabled />
                    <Button title="Loading MD" variant="secondary" size="md" isLoading />
                  </View>
                  {/* Small */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Normal SM" variant="secondary" size="sm" />
                    <Button title="Disabled SM" variant="secondary" size="sm" disabled />
                    <Button title="Loading SM" variant="secondary" size="sm" isLoading />
                  </View>
                </View>
              </View>
            </View>

            {/* 3. GHOST BUTTONS */}
            <View style={s.card}>
              <Text style={{ fontSize: 18, color: '#374151', fontFamily: fontFamily.bold, marginBottom: 12 }}>3. Ghost Buttons (No Background/Border)</Text>

              <View style={{ gap: 16 }}>
                <View>
                  <Text style={s.subLabel}>Ghost Primary vs Secondary (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Ghost Pri LG" variant="ghost" color="primary" size="lg" />
                    <Button title="Ghost Sec MD" variant="ghost" color="secondary" size="md" />
                    <Button title="Ghost Pri SM" variant="ghost" color="primary" size="sm" />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Left Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Left Icon LG" variant="ghost" color="primary" size="lg" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={18} color="#FF7E3E" />} />
                    <Button title="Left Icon MD" variant="ghost" color="primary" size="md" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="#FF7E3E" />} />
                    <Button title="Left Icon SM" variant="ghost" color="primary" size="sm" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={14} color="#FF7E3E" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Right Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Right Icon LG" variant="ghost" color="secondary" size="lg" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={18} color="#00B5A3" />} />
                    <Button title="Right Icon MD" variant="ghost" color="secondary" size="md" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#00B5A3" />} />
                    <Button title="Right Icon SM" variant="ghost" color="secondary" size="sm" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={14} color="#00B5A3" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>Only Icon (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button variant="ghost" color="primary" size="lg" icon={<HugeiconsIcon icon={StarIcon} size={24} color="#FF7E3E" />} />
                    <Button variant="ghost" color="secondary" size="md" icon={<HugeiconsIcon icon={StarIcon} size={20} color="#00B5A3" />} />
                    <Button variant="ghost" color="primary" size="sm" icon={<HugeiconsIcon icon={StarIcon} size={16} color="#FF7E3E" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>States (Normal, Disabled, Loading) - All Sizes</Text>
                  {/* Large */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal LG" variant="ghost" color="primary" size="lg" />
                    <Button title="Disabled LG" variant="ghost" color="primary" size="lg" disabled />
                    <Button title="Loading LG" variant="ghost" color="primary" size="lg" isLoading />
                  </View>
                  {/* Medium */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal MD" variant="ghost" color="secondary" size="md" />
                    <Button title="Disabled MD" variant="ghost" color="secondary" size="md" disabled />
                    <Button title="Loading MD" variant="ghost" color="secondary" size="md" isLoading />
                  </View>
                  {/* Small */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Normal SM" variant="ghost" color="primary" size="sm" />
                    <Button title="Disabled SM" variant="ghost" color="primary" size="sm" disabled />
                    <Button title="Loading SM" variant="ghost" color="primary" size="sm" isLoading />
                  </View>
                </View>
              </View>
            </View>

            {/* 4. LINK BUTTONS */}
            <View style={s.card}>
              <Text style={{ fontSize: 18, color: '#3B82F6', fontFamily: fontFamily.bold, marginBottom: 12 }}>4. Link Buttons (Underlined text only)</Text>

              <View style={{ gap: 16 }}>
                <View>
                  <Text style={s.subLabel}>Link Primary vs Secondary (LG, MD, SM)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Link Primary LG" variant="link" color="primary" size="lg" />
                    <Button title="Link Secondary MD" variant="link" color="secondary" size="md" />
                    <Button title="Link Primary SM" variant="link" color="primary" size="sm" />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>With Icons (Left / Right)</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Left Icon Link" variant="link" color="primary" leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="#FF7E3E" />} />
                    <Button title="Right Icon Link" variant="link" color="secondary" rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#00B5A3" />} />
                  </View>
                </View>

                <View>
                  <Text style={s.subLabel}>States (Normal, Disabled, Loading) - All Sizes</Text>
                  {/* Large */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal Link LG" variant="link" color="primary" size="lg" />
                    <Button title="Disabled Link LG" variant="link" color="primary" size="lg" disabled />
                    <Button title="Loading Link LG" variant="link" color="primary" size="lg" isLoading />
                  </View>
                  {/* Medium */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <Button title="Normal Link MD" variant="link" color="secondary" size="md" />
                    <Button title="Disabled Link MD" variant="link" color="secondary" size="md" disabled />
                    <Button title="Loading Link MD" variant="link" color="secondary" size="md" isLoading />
                  </View>
                  {/* Small */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Button title="Normal Link SM" variant="link" color="primary" size="sm" />
                    <Button title="Disabled Link SM" variant="link" color="primary" size="sm" disabled />
                    <Button title="Loading Link SM" variant="link" color="primary" size="sm" isLoading />
                  </View>
                </View>
              </View>
            </View>

          </View>
        </Section>

        {/* ── INPUTS & CONTROLS ── */}
        <Section title="Inputs & Controls">
          <View style={{ gap: 24 }}>
            {/* 1. STANDARD TEXT INPUTS */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#FF7E3E', fontFamily: fontFamily.bold, marginBottom: 12 }}>1. Standard Text Inputs</Text>
              <View style={{ gap: 16 }}>
                <Input label="Normal State" placeholder="Enter details..." />
                <Input label="Active State (Pre-filled)" value="John Doe" />
                <Input label="Error State" placeholder="Enter details..." error="This field is required" />
                <Input label="Disabled State" placeholder="Cannot edit this" value="Read-only text" disabled />
              </View>
            </View>

            {/* 2. PASSWORD INPUTS */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#FF7E3E', fontFamily: fontFamily.bold, marginBottom: 12 }}>2. Password Inputs (Built-in Toggle)</Text>
              <View style={{ gap: 16 }}>
                <Input label="Password Normal" placeholder="Enter password" isPassword />
                <Input label="Password Active (Pre-filled)" value="secret123" isPassword />
                <Input label="Password Error" placeholder="Enter password" error="Password is too weak" isPassword />
                <Input label="Password Disabled" value="hiddenpassword" isPassword disabled />
              </View>
            </View>

            {/* 3. MOBILE NUMBER INPUTS */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#FF7E3E', fontFamily: fontFamily.bold, marginBottom: 12 }}>3. Mobile Number Inputs</Text>
              <View style={{ gap: 16 }}>
                <Input label="Mobile Normal" placeholder="Enter mobile number..." keyboardType="phone-pad" />
                <Input label="Mobile Active" value="9876543210" keyboardType="phone-pad" />
                <Input label="Mobile Error" placeholder="Enter mobile number..." error="Invalid phone number" keyboardType="phone-pad" />
                <Input label="Mobile Disabled" value="9000000009" keyboardType="phone-pad" disabled />
              </View>
            </View>

            {/* 4. RICH TEXT BOX / TEXT AREA */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#FF7E3E', fontFamily: fontFamily.bold, marginBottom: 12 }}>4. Rich Text / Text Area (Multiline)</Text>
              <View style={{ gap: 16 }}>
                <Input label="Bio / Description" placeholder="Write something about yourself..." multiline />
                <Input label="Bio Active" value="Passionate software engineer building premium React Native applications with clean architectural patterns." multiline />
                <Input label="Bio Error" placeholder="Write something..." error="Bio is too short" multiline />
                <Input label="Bio Disabled" value="Locked bio text" multiline disabled />
              </View>
            </View>

            {/* 4.5. OTP FIELDS */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#FF7E3E', fontFamily: fontFamily.bold, marginBottom: 12 }}>4.5. OTP Fields (All States)</Text>
              <View style={{ gap: 16 }}>
                <View>
                  <Text style={s.label}>OTP Normal (4 Digits)</Text>
                  <OtpInput value={otp} onChange={setOtp} length={4} />
                </View>
                <View>
                  <Text style={s.label}>OTP Error</Text>
                  <OtpInput value="56" onChange={() => { }} length={4} error="Incorrect OTP. Please try again." />
                </View>
                <View>
                  <Text style={s.label}>OTP Disabled</Text>
                  <OtpInput value="4321" onChange={() => { }} length={4} disabled />
                </View>
              </View>
            </View>

            {/* 5. SEARCH BARS & ADDITIONAL CONTROLS */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#FF7E3E', fontFamily: fontFamily.bold, marginBottom: 12 }}>5. Search Bars (All States)</Text>
              <View style={{ gap: 16 }}>
                <View>
                  <Text style={s.label}>Search Normal</Text>
                  <SearchBar placeholder="Search clinics, doctors, pharmacy..." />
                </View>
                <View>
                  <Text style={s.label}>Search Active (Pre-filled / Clear button)</Text>
                  <SearchBar value="Cardiologist" />
                </View>

                <View>
                  <Text style={s.label}>Search Disabled</Text>
                  <SearchBar value="Stethoscope" disabled />
                </View>
              </View>
            </View>

            {/* 6. DROPDOWNS */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#FF7E3E', fontFamily: fontFamily.bold, marginBottom: 12 }}>6. Dropdowns (All States)</Text>
              <View style={{ gap: 16 }}>
                <Dropdown
                  label="Dropdown Normal"
                  options={[{ label: 'Pharmacy', value: '1' }, { label: 'Doctor', value: '2' }]}
                  value=""
                  onSelect={() => { }}
                />
                <Dropdown
                  label="Dropdown Active (Selected)"
                  options={[{ label: 'Pharmacy', value: '1' }, { label: 'Doctor', value: '2' }]}
                  value="1"
                  onSelect={() => { }}
                />
                <Dropdown
                  label="Dropdown Error"
                  options={[{ label: 'Pharmacy', value: '1' }, { label: 'Doctor', value: '2' }]}
                  value=""
                  onSelect={() => { }}
                  error="Please select a valid option"
                />
                <Dropdown
                  label="Dropdown Disabled"
                  options={[{ label: 'Pharmacy', value: '1' }, { label: 'Doctor', value: '2' }]}
                  value="2"
                  onSelect={() => { }}
                  disabled
                />
              </View>
            </View>

            {/* 7. ADDITIONAL CONTROLS */}
            <View style={s.card}>
              <Text style={{ fontSize: 16, color: '#111827', fontFamily: fontFamily.bold, marginBottom: 12 }}>7. Additional Controls</Text>
              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' }}>
                  <Checkbox checked={isChecked} onChange={setIsChecked} label="Remember me" />
                  <RadioButton selected={isRadio} onSelect={() => setIsRadio(!isRadio)} label="Agree" />
                  <Switch value={isSwitch} onValueChange={setIsSwitch} />
                </View>
              </View>
            </View>

          </View>
        </Section>

        {/* ── BADGES & TAGS ── */}
        <Section title="Badges & Tags">
          <View style={[s.card, { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }]}>
            <Badge text="New" />
            <Badge text="Alert" variant="danger" />
            <Badge text="Success" variant="success" />
            <DiscountBadge percentage={25} />
            <StatusBadge status="completed" />
            <StatusBadge status="pending" />
            <StatusBadge status="cancelled" />
            <Tag label="Healthcare" />
            <Chip label="Selected" selected />
            <Chip label="Unselected" />
          </View>
        </Section>
        {/* ── FEEDBACK & OVERLAYS ── */}
        <Section title="Feedback & Overlays">
          <View style={[s.card, { gap: 20 }]}>
            <View>
              <Text style={s.label}>Upload Progress</Text>
              <ProgressBar progress={65} />
            </View>
            <View style={{ flexDirection: 'row', gap: 24, justifyContent: 'center', paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F3F4F6' }}>
              <Loader />
              <Loader color="secondary" size="small" />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              <Button title="Modal" onPress={() => setModalVisible(true)} size="sm" />
              <Button title="Sheet" onPress={() => setBottomSheetVisible(true)} color="secondary" size="sm" />
              <Button title="Toast" onPress={() => setToastVisible(true)} variant="outline" size="sm" />
              <Tooltip text="Tooltip info">
                <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 }}>
                  <Text style={{ color: '#374151', fontFamily: fontFamily.medium }}>Tooltip</Text>
                </View>
              </Tooltip>
            </View>
          </View>
        </Section>

        {/* ── EMPTY STATES ── */}
        <Section title="Empty States">
          <View style={[s.card, { overflow: 'hidden' }]}>
            <EmptyState
              title="No Appointments"
              description="You have no upcoming appointments scheduled at this time."
              actionLabel="Book Now"
              onAction={() => { }}
            />
          </View>
        </Section>

      </ScrollView>

      {/* ── OVERLAYS ── */}
      <BottomTabBar tabs={tabs} activeTab={activeTab} onTabSelect={setActiveTab} className="absolute bottom-0 w-full" />
      <Toast visible={toastVisible} message="Action completed successfully!" type="success" onHide={() => setToastVisible(false)} />

      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text style={{ fontSize: 22, textAlign: 'center', marginBottom: 8, color: '#111827', fontFamily: fontFamily.bold }}>Success</Text>
        <Text style={{ color: '#6B7280', textAlign: 'center', marginBottom: 28, fontFamily: fontFamily.regular }}>Your action has been recorded successfully.</Text>
        <Button title="Continue" onPress={() => setModalVisible(false)} size="lg" />
      </Modal>

      <BottomSheet visible={bottomSheetVisible} onClose={() => setBottomSheetVisible(false)}>
        <Text style={{ fontSize: 22, marginBottom: 6, color: '#111827', fontFamily: fontFamily.bold }}>More Options</Text>
        <Text style={{ color: '#6B7280', marginBottom: 24, fontFamily: fontFamily.regular }}>Select an action below to proceed.</Text>
        <View style={{ gap: 10 }}>
          <Button title="Share Profile" />
          <Button title="Edit Details" color="secondary" />
          <Button title="Cancel" onPress={() => setBottomSheetVisible(false)} variant="ghost" />
        </View>
      </BottomSheet>

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingHorizontal: 16, marginBottom: 40 },
  appName: { fontSize: 48, color: '#FF7E3E', fontFamily: fontFamily.black },
  appSubtitle: { fontSize: 18, color: '#6B7280', marginTop: 2, fontFamily: fontFamily.regular },
  section: { marginBottom: 40 },
  sectionTitle: { fontSize: 22, color: '#111827', marginBottom: 20, paddingHorizontal: 16, fontFamily: fontFamily.semiBold },
  sectionBody: { paddingHorizontal: 16, gap: 16 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginTop: 40, marginHorizontal: 16 },
  subLabel: { fontSize: 14, color: '#374151', marginBottom: 8, fontFamily: fontFamily.medium },
  label: { fontSize: 14, color: '#374151', marginBottom: 6, fontFamily: fontFamily.medium },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F1F5F9' },
  swatchWrap: { alignItems: 'center', marginRight: 10, marginBottom: 8 },
  swatchBox: { width: 60, height: 60, borderRadius: 16, marginBottom: 4, borderWidth: 1, borderColor: '#E5E7EB' },
  swatchName: { fontSize: 11, color: '#6B7280', fontFamily: fontFamily.regular },
  swatchHex: { fontSize: 9, color: '#1E293B', textTransform: 'uppercase', fontFamily: fontFamily.light },
  statusGroup: { marginRight: 12, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 20, padding: 10, backgroundColor: '#fff' },
  statusGroupLabel: { fontSize: 12, color: '#374151', textTransform: 'capitalize', marginBottom: 4, fontFamily: fontFamily.medium },
  typo: { color: '#111827', marginBottom: 10, fontFamily: fontFamily.regular },
});
