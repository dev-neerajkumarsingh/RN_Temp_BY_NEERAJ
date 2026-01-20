import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { CommonText, CommonButton } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

/**
 * CommonButton Example Component
 *
 * CommonButton is a versatile button component that provides:
 * - Text buttons with customizable labels
 * - Icon buttons with SVG support
 * - Loading state with ActivityIndicator
 * - Disabled state styling
 * - Customizable dimensions and colors
 */
export const CommonButtonEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [loading, setLoading] = React.useState(false);
  const [activeExample, setActiveExample] = React.useState<
    'text' | 'icon' | 'loading' | 'disabled' | 'custom'
  >('text');

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

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
            activeExample === example ? Colors.senary : Colors.grey,
        },
      ]}
      onPress={() => setActiveExample(example)}>
      <CommonText
        content={title}
        fontSize={12}
        color={activeExample === example ? Colors.white : Colors.text}
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
            content="CommonButton Examples"
            fontSize={20}
            color={Colors.text}
          />
        </View>
        <CommonText
          content="Text, icon, loading & disabled button variants"
          fontSize={12}
          color={Colors.text}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="Text" example="text" />
        <ExampleButton title="Icon" example="icon" />
        <ExampleButton title="Loading" example="loading" />
        <ExampleButton title="Disabled" example="disabled" />
        <ExampleButton title="Custom" example="custom" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'text' && <TextButtonExample colors={Colors} />}
        {activeExample === 'icon' && <IconButtonExample colors={Colors} />}
        {activeExample === 'loading' && (
          <LoadingButtonExample
            colors={Colors}
            loading={loading}
            onPress={simulateLoading}
          />
        )}
        {activeExample === 'disabled' && (
          <DisabledButtonExample colors={Colors} />
        )}
        {activeExample === 'custom' && <CustomButtonExample colors={Colors} />}
      </View>

      {/* Code Preview */}
      <View style={styles.codeContainer}>
        <CommonText content="Usage:" fontSize={14} color={Colors.text} />
        <View style={[styles.codeBlock, { backgroundColor: Colors.grey }]}>
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

const TextButtonExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonButton
      label="Primary Button"
      onPress={() => Alert.alert('Button Pressed!')}
    />
    <CommonButton
      label="Secondary Button"
      moreButtonStyle={[
        styles.buttonSpacing,
        { backgroundColor: colors.senary },
      ]}
      onPress={() => Alert.alert('Secondary!')}
    />
    <CommonButton
      label="Outline Style"
      textColor={colors.secondary}
      moreButtonStyle={[
        styles.buttonSpacing,
        styles.outlineButton,
        { borderColor: colors.secondary },
      ]}
      onPress={() => Alert.alert('Outline!')}
    />
  </View>
);

const IconButtonExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <View style={styles.iconRow}>
      <CommonButton
        contentType="localSvg"
        svgType="download"
        imgWidth={24}
        imgHeight={24}
        svgColor={colors.white}
        width={50}
        height={50}
        moreButtonStyle={styles.iconButton}
        onPress={() => Alert.alert('Download!')}
      />
      <CommonButton
        contentType="localSvg"
        svgType="info"
        imgWidth={24}
        imgHeight={24}
        svgColor={colors.white}
        width={50}
        height={50}
        moreButtonStyle={[styles.iconButton, { backgroundColor: colors.senary }]}
        onPress={() => Alert.alert('Info!')}
      />
      <CommonButton
        contentType="localSvg"
        svgType="tick"
        imgWidth={24}
        imgHeight={24}
        svgColor={colors.white}
        width={50}
        height={50}
        moreButtonStyle={[styles.iconButton, { backgroundColor: colors.success }]}
        onPress={() => Alert.alert('Success!')}
      />
      <CommonButton
        contentType="localSvg"
        svgType="close"
        imgWidth={24}
        imgHeight={24}
        svgColor={colors.white}
        width={50}
        height={50}
        moreButtonStyle={[styles.iconButton, { backgroundColor: colors.error }]}
        onPress={() => Alert.alert('Close!')}
      />
    </View>
  </View>
);

const LoadingButtonExample = ({
  colors,
  loading,
  onPress,
}: {
  colors: any;
  loading: boolean;
  onPress: () => void;
}) => (
  <View style={styles.demoBox}>
    <CommonButton
      label={loading ? '' : 'Click to Load'}
      loader={loading}
      onPress={onPress}
    />
    <CommonText
      content="Button shows loading indicator when loader={true}"
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="center"
    />
  </View>
);

const DisabledButtonExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonButton label="Disabled Button" disabled onPress={() => {}} />
    <CommonText
      content="Disabled buttons have reduced opacity and don't respond to taps"
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="center"
    />
  </View>
);

const CustomButtonExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonButton
      label="Small Button"
      width="50%"
      height={40}
      fontSize={12}
      moreButtonStyle={{ alignSelf: 'center' }}
      onPress={() => Alert.alert('Small!')}
    />
    <CommonButton
      label="Full Width"
      height={55}
      fontSize={16}
      moreButtonStyle={[styles.buttonSpacing, { backgroundColor: colors.senary }]}
      onPress={() => Alert.alert('Full Width!')}
    />
    <CommonButton
      label="Rounded"
      height={45}
      moreButtonStyle={[
        styles.buttonSpacing,
        { borderRadius: 25, backgroundColor: colors.septenary },
      ]}
      onPress={() => Alert.alert('Rounded!')}
    />
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    text: `<CommonButton
  label="Click Me"
  onPress={() => handlePress()}
/>`,
    icon: `<CommonButton
  contentType="localSvg"
  svgType="download"
  imgWidth={24}
  imgHeight={24}
  width={50}
  height={50}
  onPress={() => {}}
/>`,
    loading: `<CommonButton
  label="Submit"
  loader={isLoading}
  onPress={() => submit()}
/>`,
    disabled: `<CommonButton
  label="Disabled"
  disabled={true}
  onPress={() => {}}
/>`,
    custom: `<CommonButton
  label="Custom"
  width="50%"
  height={45}
  fontSize={14}
  moreButtonStyle={{ borderRadius: 25 }}
/>`,
  };
  return examples[example] || examples.text;
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
  buttonSpacing: {
    marginTop: 12,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconButton: {
    borderRadius: 25,
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
