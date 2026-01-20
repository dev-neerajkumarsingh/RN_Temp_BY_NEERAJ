import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { CommonText, CommonButton, CommonDropDown } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

/**
 * CommonDropDown Example Component
 *
 * CommonDropDown is a dropdown selector component that provides:
 * - Animated expand/collapse functionality
 * - Customizable icon and styling
 * - Selection highlighting
 * - Keyboard dismiss on open
 */
export const CommonDropDownEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [selectedCountry, setSelectedCountry] = React.useState('Select Country');
  const [selectedGender, setSelectedGender] = React.useState('Select Gender');
  const [selectedPriority, setSelectedPriority] = React.useState('Select Priority');

  const [activeExample, setActiveExample] = React.useState<
    'basic' | 'styled' | 'multiple'
  >('basic');

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const ExampleButton = ({
    title,
    example,
  }: {
    title: string;
    example: typeof activeExample;
  }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        {
          backgroundColor:
            activeExample === example ? Colors.senary : Colors.grey2,
        },
      ]}
      onPress={() => setActiveExample(example)}>
      <CommonText
        content={title}
        fontSize={12}
        color={activeExample === example ? Colors.white : Colors.text2}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <CommonButton
            contentType={'localSvg'}
            svgType={'arrowleft'}
            imgWidth={16}
            imgHeight={14}
            moreButtonStyle={styles.backBtn}
            onPress={() => useNavs.goback()}
          />
          <CommonText
            content="CommonDropDown Examples"
            fontSize={20}
            color={Colors.text2}
          />
        </View>
        <CommonText
          content="Animated dropdown selector with customization options"
          fontSize={12}
          color={Colors.text1}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="Basic" example="basic" />
        <ExampleButton title="Styled" example="styled" />
        <ExampleButton title="Multiple" example="multiple" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'basic' && (
          <BasicDropDownExample
            colors={Colors}
            selectedValue={selectedCountry}
            onSelect={setSelectedCountry}
            data={countries}
          />
        )}
        {activeExample === 'styled' && (
          <StyledDropDownExample
            colors={Colors}
            selectedValue={selectedGender}
            onSelect={setSelectedGender}
            data={genders}
          />
        )}
        {activeExample === 'multiple' && (
          <MultipleDropDownExample
            colors={Colors}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            countries={countries}
            selectedPriority={selectedPriority}
            onSelectPriority={setSelectedPriority}
            priorities={priorities}
          />
        )}
      </View>

      {/* Code Preview */}
      <View style={styles.codeContainer}>
        <CommonText content="Usage:" fontSize={14} color={Colors.text2} />
        <View style={[styles.codeBlock, { backgroundColor: Colors.grey1 }]}>
          <CommonText
            content={getCodeExample(activeExample)}
            fontSize={11}
            color={Colors.octonary}
            moreStyle={styles.codeText}
          />
        </View>
      </View>
    </View>
  );
};

// ============ Example Components ============

const BasicDropDownExample = ({
  colors,
  selectedValue,
  onSelect,
  data,
}: {
  colors: any;
  selectedValue: string;
  onSelect: (val: string) => void;
  data: string[];
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Select a Country"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonDropDown
      initialData={data}
      selectedValue={selectedValue}
      onPressSelected={onSelect}
      moreContainerStyles={styles.dropdownContainer}
    />
    <CommonText
      content={`Selected: ${selectedValue}`}
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
    />
  </View>
);

const StyledDropDownExample = ({
  colors,
  selectedValue,
  onSelect,
  data,
}: {
  colors: any;
  selectedValue: string;
  onSelect: (val: string) => void;
  data: string[];
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Styled Dropdown"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonDropDown
      initialData={data}
      selectedValue={selectedValue}
      onPressSelected={onSelect}
      moreContainerStyles={[
        styles.dropdownContainer,
        { backgroundColor: colors.grey1 },
      ]}
      labelIconPath="info"
      width={18}
      height={18}
    />
    <CommonText
      content="With custom icon and background"
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="center"
    />
  </View>
);

const MultipleDropDownExample = ({
  colors,
  selectedCountry,
  onSelectCountry,
  countries,
  selectedPriority,
  onSelectPriority,
  priorities,
}: {
  colors: any;
  selectedCountry: string;
  onSelectCountry: (val: string) => void;
  countries: string[];
  selectedPriority: string;
  onSelectPriority: (val: string) => void;
  priorities: string[];
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Country"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonDropDown
      initialData={countries}
      selectedValue={selectedCountry}
      onPressSelected={onSelectCountry}
      moreContainerStyles={styles.dropdownContainer}
    />

    <CommonText
      content="Priority"
      fontSize={14}
      color={colors.text2}
      moreStyle={[styles.label, { marginTop: 20 }]}
    />
    <CommonDropDown
      initialData={priorities}
      selectedValue={selectedPriority}
      onPressSelected={onSelectPriority}
      moreContainerStyles={styles.dropdownContainer}
    />
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    basic: `<CommonDropDown
  initialData={['Option 1', 'Option 2']}
  selectedValue={selectedValue}
  onPressSelected={setSelectedValue}
/>`,
    styled: `<CommonDropDown
  initialData={options}
  selectedValue={selected}
  onPressSelected={setSelected}
  labelIconPath="info"
  moreContainerStyles={{ backgroundColor: '#F5F5F5' }}
/>`,
    multiple: `// Multiple dropdowns in a form
<CommonDropDown
  initialData={countries}
  selectedValue={country}
  onPressSelected={setCountry}
/>
<CommonDropDown
  initialData={priorities}
  selectedValue={priority}
  onPressSelected={setPriority}
/>`,
  };
  return examples[example] || examples.basic;
};

// ============ Styles ============

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 50 : Number(StatusBar.currentHeight) + 5,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  subtitle: {
    marginTop: 4,
  },
  backBtn: {
    width: '8%',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  exampleContainer: {
    flex: 1,
    minHeight: 200,
  },
  demoBox: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginBottom: 8,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
  },
  helperText: {
    marginTop: 16,
  },
  codeContainer: {
    marginTop: 16,
  },
  codeBlock: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'monospace',
  },
});
