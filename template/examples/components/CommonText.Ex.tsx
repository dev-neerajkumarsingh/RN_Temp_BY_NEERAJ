import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { CommonText, CommonButton } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

/**
 * CommonText Example Component
 *
 * CommonText is a text component that provides:
 * - Theme-aware text styling
 * - Configurable font size, color, and alignment
 * - Support for different font types
 * - Line height customization
 * - Text truncation with numberOfLines and ellipsizeMode
 */
export const CommonTextEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [activeExample, setActiveExample] = React.useState<
    'basic' | 'sizes' | 'colors' | 'alignment' | 'truncation'
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
            content="CommonText Examples"
            fontSize={20}
            color={Colors.text}
          />
        </View>
        <CommonText
          content="Customizable text with fonts, sizes, colors & alignment"
          fontSize={12}
          color={Colors.text}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="Basic" example="basic" />
        <ExampleButton title="Sizes" example="sizes" />
        <ExampleButton title="Colors" example="colors" />
        <ExampleButton title="Align" example="alignment" />
        <ExampleButton title="Truncate" example="truncation" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'basic' && <BasicExample colors={Colors} />}
        {activeExample === 'sizes' && <SizesExample colors={Colors} />}
        {activeExample === 'colors' && <ColorsExample colors={Colors} />}
        {activeExample === 'alignment' && <AlignmentExample colors={Colors} />}
        {activeExample === 'truncation' && (
          <TruncationExample colors={Colors} />
        )}
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

const BasicExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText content="Basic Text" fontSize={16} color={colors.text} />
    <CommonText
      content="This is a simple text with default styling"
      fontSize={14}
      color={colors.text}
      moreStyle={styles.demoText}
    />
  </View>
);

const SizesExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText content="Small (12px)" fontSize={12} color={colors.text} />
    <CommonText
      content="Medium (16px)"
      fontSize={16}
      color={colors.text}
      moreStyle={styles.demoText}
    />
    <CommonText
      content="Large (20px)"
      fontSize={20}
      color={colors.text}
      moreStyle={styles.demoText}
    />
    <CommonText
      content="Extra Large (24px)"
      fontSize={24}
      color={colors.text}
      moreStyle={styles.demoText}
    />
  </View>
);

const ColorsExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText content="Primary Color" fontSize={14} color={colors.senary} />
    <CommonText
      content="Success Color"
      fontSize={14}
      color={colors.success}
      moreStyle={styles.demoText}
    />
    <CommonText
      content="Error Color"
      fontSize={14}
      color={colors.error}
      moreStyle={styles.demoText}
    />
    <CommonText
      content="Warning Color"
      fontSize={14}
      color={colors.septenary}
      moreStyle={styles.demoText}
    />
    <CommonText
      content="Muted Color"
      fontSize={14}
      color={colors.text}
      moreStyle={styles.demoText}
    />
  </View>
);

const AlignmentExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <View style={styles.alignBox}>
      <CommonText
        content="Left aligned text"
        fontSize={14}
        color={colors.text}
        textAlign="left"
      />
    </View>
    <View style={[styles.alignBox, styles.demoText]}>
      <CommonText
        content="Center aligned text"
        fontSize={14}
        color={colors.text}
        textAlign="center"
      />
    </View>
    <View style={[styles.alignBox, styles.demoText]}>
      <CommonText
        content="Right aligned text"
        fontSize={14}
        color={colors.text}
        textAlign="right"
      />
    </View>
  </View>
);

const TruncationExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Single line with ellipsis at the end when text is too long to fit"
      fontSize={14}
      color={colors.text}
      numberOfLines={1}
      ellipsizeMode="tail"
    />
    <CommonText
      content="Two lines maximum - This is a longer text that will be truncated after two lines of content are displayed on the screen"
      fontSize={14}
      color={colors.text}
      numberOfLines={2}
      ellipsizeMode="tail"
      moreStyle={styles.demoText}
    />
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    basic: `<CommonText
  content="Hello World"
  fontSize={16}
  color="#000"
/>`,
    sizes: `<CommonText
  content="Large Text"
  fontSize={24}
  lineHeight={30}
/>`,
    colors: `<CommonText
  content="Colored Text"
  color={Colors.senary}
  fontSize={14}
/>`,
    alignment: `<CommonText
  content="Centered"
  textAlign="center"
  fontSize={14}
/>`,
    truncation: `<CommonText
  content="Long text..."
  numberOfLines={2}
  ellipsizeMode="tail"
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
  demoText: {
    marginTop: 12,
  },
  alignBox: {
    width: '100%',
    padding: 12,
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
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
