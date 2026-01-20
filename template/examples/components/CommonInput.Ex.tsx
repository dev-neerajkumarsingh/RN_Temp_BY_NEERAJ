import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { CommonText, CommonButton, CommonInput } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

/**
 * CommonInput Example Component
 *
 * CommonInput is a text input component that provides:
 * - Theme-aware styling with border color changes
 * - Left and right icon support
 * - Error message display
 * - Password visibility toggle
 * - Various keyboard types
 * - Multiline support
 */
export const CommonInputEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [basicValue, setBasicValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorValue, setErrorValue] = React.useState('');
  const [multilineValue, setMultilineValue] = React.useState('');

  const [activeExample, setActiveExample] = React.useState<
    'basic' | 'icons' | 'password' | 'error' | 'multiline'
  >('basic');

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
            content="CommonInput Examples"
            fontSize={20}
            color={Colors.text2}
          />
        </View>
        <CommonText
          content="Text inputs with icons, validation & password support"
          fontSize={12}
          color={Colors.text1}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="Basic" example="basic" />
        <ExampleButton title="Icons" example="icons" />
        <ExampleButton title="Password" example="password" />
        <ExampleButton title="Error" example="error" />
        <ExampleButton title="Multiline" example="multiline" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'basic' && (
          <BasicInputExample
            colors={Colors}
            value={basicValue}
            onChange={setBasicValue}
          />
        )}
        {activeExample === 'icons' && <IconInputExample colors={Colors} />}
        {activeExample === 'password' && (
          <PasswordInputExample
            colors={Colors}
            value={passwordValue}
            onChange={setPasswordValue}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />
        )}
        {activeExample === 'error' && (
          <ErrorInputExample
            colors={Colors}
            value={errorValue}
            onChange={setErrorValue}
          />
        )}
        {activeExample === 'multiline' && (
          <MultilineInputExample
            colors={Colors}
            value={multilineValue}
            onChange={setMultilineValue}
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

const BasicInputExample = ({
  colors,
  value,
  onChange,
}: {
  colors: any;
  value: string;
  onChange: (text: string) => void;
}) => (
  <View style={styles.demoBox}>
    <CommonInput
      placeholder="Enter your name"
      value={value}
      onChangeText={onChange}
    />
    <CommonText
      content={`Current value: ${value || '(empty)'}`}
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
    />
  </View>
);

const IconInputExample = ({ colors }: { colors: any }) => {
  const [email, setEmail] = React.useState('');
  const [search, setSearch] = React.useState('');

  return (
    <View style={styles.demoBox}>
      <CommonInput
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        leftIcon="info"
        keyboardType="email-address"
      />
      <CommonInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        rightIcon="close"
        onPressRightIcon={() => setSearch('')}
        moreContainerStyle={styles.inputSpacing}
      />
    </View>
  );
};

const PasswordInputExample = ({
  colors,
  value,
  onChange,
  showPassword,
  togglePassword,
}: {
  colors: any;
  value: string;
  onChange: (text: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
}) => (
  <View style={styles.demoBox}>
    <CommonInput
      placeholder="Enter password"
      value={value}
      onChangeText={onChange}
      secureTextEntry={!showPassword}
      rightIcon={showPassword ? 'eye_show' : 'eye_hide'}
      onPressRightIcon={togglePassword}
    />
    <CommonText
      content="Tap the eye icon to toggle password visibility"
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="center"
    />
  </View>
);

const ErrorInputExample = ({
  colors,
  value,
  onChange,
}: {
  colors: any;
  value: string;
  onChange: (text: string) => void;
}) => {
  const hasError = value.length > 0 && value.length < 3;

  return (
    <View style={styles.demoBox}>
      <CommonInput
        placeholder="Enter at least 3 characters"
        value={value}
        onChangeText={onChange}
        msgError={hasError ? 'Must be at least 3 characters' : ''}
      />
      <CommonText
        content="Error message appears when validation fails"
        fontSize={12}
        color={colors.text1}
        moreStyle={styles.helperText}
        textAlign="center"
      />
    </View>
  );
};

const MultilineInputExample = ({
  colors,
  value,
  onChange,
}: {
  colors: any;
  value: string;
  onChange: (text: string) => void;
}) => (
  <View style={styles.demoBox}>
    <CommonInput
      placeholder="Enter your message..."
      value={value}
      onChangeText={onChange}
      multiline
      numberOfLines={4}
      moreContainerStyle={styles.multilineInput}
    />
    <CommonText
      content={`${value.length} characters`}
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="right"
    />
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    basic: `<CommonInput
  placeholder="Enter text"
  value={value}
  onChangeText={setValue}
/>`,
    icons: `<CommonInput
  placeholder="Search..."
  value={value}
  onChangeText={setValue}
  leftIcon="search"
  rightIcon="close"
/>`,
    password: `<CommonInput
  placeholder="Password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={!showPassword}
  rightIcon={showPassword ? 'eye_show' : 'eye_hide'}
  onPressRightIcon={togglePassword}
/>`,
    error: `<CommonInput
  placeholder="Enter text"
  value={value}
  onChangeText={setValue}
  msgError="Validation error message"
/>`,
    multiline: `<CommonInput
  placeholder="Message..."
  value={value}
  onChangeText={setValue}
  multiline
  numberOfLines={4}
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
  inputSpacing: {
    marginTop: 16,
  },
  helperText: {
    marginTop: 12,
  },
  multilineInput: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 12,
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
