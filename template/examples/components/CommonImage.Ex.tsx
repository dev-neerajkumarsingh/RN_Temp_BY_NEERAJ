import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { CommonText, CommonButton, CommonImage } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

/**
 * CommonImage Example Component
 *
 * CommonImage is a versatile image component that provides:
 * - Local SVG icon rendering
 * - Remote URL image loading with FastImage
 * - Local non-SVG image support
 * - Fade-in animation on load
 * - Custom sizing and resize modes
 */
export const CommonImageEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [activeExample, setActiveExample] = React.useState<
    'svg' | 'url' | 'colors' | 'sizes'
  >('svg');

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
        color={activeExample === example ? Colors.white : Colors.grey}
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
            content="CommonImage Examples"
            fontSize={20}
            color={Colors.text}
          />
        </View>
        <CommonText
          content="SVG icons, URL images with fade-in animation"
          fontSize={12}
          color={Colors.text}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="SVG Icons" example="svg" />
        <ExampleButton title="URL Image" example="url" />
        <ExampleButton title="Colors" example="colors" />
        <ExampleButton title="Sizes" example="sizes" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'svg' && <SvgIconsExample colors={Colors} />}
        {activeExample === 'url' && <UrlImageExample colors={Colors} />}
        {activeExample === 'colors' && <ColorsExample colors={Colors} />}
        {activeExample === 'sizes' && <SizesExample colors={Colors} />}
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

const SvgIconsExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Available SVG Icons"
      fontSize={14}
      color={colors.text}
      moreStyle={styles.sectionTitle}
    />
    <View style={styles.iconGrid}>
      <IconItem icon="arrowleft" label="arrowleft" colors={colors} />
      <IconItem icon="close" label="close" colors={colors} />
      <IconItem icon="download" label="download" colors={colors} />
      <IconItem icon="info" label="info" colors={colors} />
      <IconItem icon="tick" label="tick" colors={colors} />
      <IconItem icon="warning" label="warning" colors={colors} />
      <IconItem icon="error" label="error" colors={colors} />
      <IconItem icon="eye_show" label="eye_show" colors={colors} />
      <IconItem icon="eye_hide" label="eye_hide" colors={colors} />
    </View>
  </View>
);

const IconItem = ({
  icon,
  label,
  colors,
}: {
  icon: any;
  label: string;
  colors: any;
}) => (
  <View style={styles.iconItem}>
    <View style={[styles.iconBox, { backgroundColor: colors.grey }]}>
      <CommonImage
        sourceType="localSvg"
        svgSource={icon}
        width={24}
        height={24}
        color={colors.secondary}
      />
    </View>
    <CommonText content={label} fontSize={10} color={colors.text1} />
  </View>
);

const UrlImageExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Images from URL with fade-in animation"
      fontSize={14}
      color={colors.text}
      moreStyle={styles.sectionTitle}
    />
    <View style={styles.urlImagesContainer}>
      <CommonImage
        sourceType="url"
        source="https://picsum.photos/200/200"
        width={100}
        height={100}
        moreStyles={styles.urlImage}
      />
      <CommonImage
        sourceType="url"
        source="https://picsum.photos/201/201"
        width={100}
        height={100}
        moreStyles={styles.urlImage}
      />
      <CommonImage
        sourceType="url"
        source="https://picsum.photos/202/202"
        width={100}
        height={100}
        moreStyles={styles.urlImage}
      />
    </View>
    <CommonText
      content="Uses FastImage for optimized loading & caching"
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="center"
    />
  </View>
);

const ColorsExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText
      content="SVG Icons with Different Colors"
      fontSize={14}
      color={colors.text}
      moreStyle={styles.sectionTitle}
    />
    <View style={styles.colorRow}>
      <View style={styles.colorItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="info"
          width={32}
          height={32}
          color={colors.secondary}
        />
        <CommonText content="Default" fontSize={11} color={colors.text1} />
      </View>
      <View style={styles.colorItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="info"
          width={32}
          height={32}
          color={colors.senary}
        />
        <CommonText content="Primary" fontSize={11} color={colors.text1} />
      </View>
      <View style={styles.colorItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="info"
          width={32}
          height={32}
          color={colors.success}
        />
        <CommonText content="Success" fontSize={11} color={colors.text1} />
      </View>
      <View style={styles.colorItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="info"
          width={32}
          height={32}
          color={colors.error}
        />
        <CommonText content="Error" fontSize={11} color={colors.text1} />
      </View>
    </View>
  </View>
);

const SizesExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Icons at Different Sizes"
      fontSize={14}
      color={colors.text}
      moreStyle={styles.sectionTitle}
    />
    <View style={styles.sizeRow}>
      <View style={styles.sizeItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="tick"
          width={16}
          height={16}
          color={colors.secondary}
        />
        <CommonText content="16px" fontSize={11} color={colors.text1} />
      </View>
      <View style={styles.sizeItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="tick"
          width={24}
          height={24}
          color={colors.secondary}
        />
        <CommonText content="24px" fontSize={11} color={colors.text1} />
      </View>
      <View style={styles.sizeItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="tick"
          width={32}
          height={32}
          color={colors.secondary}
        />
        <CommonText content="32px" fontSize={11} color={colors.text1} />
      </View>
      <View style={styles.sizeItem}>
        <CommonImage
          sourceType="localSvg"
          svgSource="tick"
          width={48}
          height={48}
          color={colors.secondary}
        />
        <CommonText content="48px" fontSize={11} color={colors.text1} />
      </View>
    </View>
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    svg: `<CommonImage
  sourceType="localSvg"
  svgSource="info"
  width={24}
  height={24}
  color="#000"
/>`,
    url: `<CommonImage
  sourceType="url"
  source="https://example.com/image.jpg"
  width={100}
  height={100}
  resizeMode="cover"
/>`,
    colors: `<CommonImage
  sourceType="localSvg"
  svgSource="tick"
  width={24}
  height={24}
  color={Colors.success}
/>`,
    sizes: `<CommonImage
  sourceType="localSvg"
  svgSource="icon"
  width={48}
  height={48}
/>`,
  };
  return examples[example] || examples.svg;
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
  sectionTitle: {
    marginBottom: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'flex-start',
  },
  iconItem: {
    alignItems: 'center',
    width: 70,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  urlImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  urlImage: {
    borderRadius: 8,
  },
  helperText: {
    marginTop: 16,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  colorItem: {
    alignItems: 'center',
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  sizeItem: {
    alignItems: 'center',
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
