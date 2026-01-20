import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { CommonText, CommonButton, CommonTopTabs } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

/**
 * CommonTopTabs Example Component
 *
 * CommonTopTabs is a tab navigation component that provides:
 * - Horizontal tab layout
 * - Active tab highlighting
 * - Two tab style variants
 * - Easy tab switching
 */
export const CommonTopTabsEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [activeTab1, setActiveTab1] = React.useState('Home');
  const [activeTab2, setActiveTab2] = React.useState('All');

  const [activeExample, setActiveExample] = React.useState<
    'type1' | 'type2' | 'content'
  >('type1');

  const tabs1 = ['Home', 'Profile', 'Settings'];
  const tabs2 = ['All', 'New', 'Activating', 'Done', 'Old', 'More'];

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
            content="CommonTopTabs Examples"
            fontSize={20}
            color={Colors.text2}
          />
        </View>
        <CommonText
          content="Tab navigation with different style variants"
          fontSize={12}
          color={Colors.text1}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="Type 1" example="type1" />
        <ExampleButton title="Type 2" example="type2" />
        <ExampleButton title="With Content" example="content" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'type1' && (
          <Type1Example
            colors={Colors}
            tabs={tabs1}
            activeTab={activeTab1}
            onChangeTab={setActiveTab1}
          />
        )}
        {activeExample === 'type2' && (
          <Type2Example
            colors={Colors}
            tabs={tabs2}
            activeTab={activeTab2}
            onChangeTab={setActiveTab2}
          />
        )}
        {activeExample === 'content' && (
          <ContentExample
            colors={Colors}
            tabs={tabs1}
            activeTab={activeTab1}
            onChangeTab={setActiveTab1}
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

const Type1Example = ({
  colors,
  tabs,
  activeTab,
  onChangeTab,
}: {
  colors: any;
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Tab Type 1 (Default)"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonTopTabs
      tabs={tabs}
      activeTab={activeTab}
      tabType={1}
      onChangeTab={onChangeTab}
    />
    <CommonText
      content={`Active: ${activeTab}`}
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="center"
    />
  </View>
);

const Type2Example = ({
  colors,
  tabs,
  activeTab,
  onChangeTab,
}: {
  colors: any;
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Tab Type 2 (Scrollable)"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonText
      content="Swipe horizontally to see more tabs"
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.scrollHint}
    />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollableTabsContainer}>
      <CommonTopTabs
        tabs={tabs}
        activeTab={activeTab}
        tabType={2}
        onChangeTab={onChangeTab}
      />
    </ScrollView>
    <CommonText
      content={`Active: ${activeTab}`}
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.helperText}
      textAlign="center"
    />
  </View>
);

const ContentExample = ({
  colors,
  tabs,
  activeTab,
  onChangeTab,
}: {
  colors: any;
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}) => (
  <View style={styles.demoBox}>
    <CommonTopTabs
      tabs={tabs}
      activeTab={activeTab}
      tabType={1}
      onChangeTab={onChangeTab}
    />
    <View style={[styles.contentBox, { backgroundColor: colors.grey1 }]}>
      {activeTab === 'Home' && (
        <View style={styles.contentInner}>
          <CommonText content="Home Content" fontSize={16} color={colors.text2} />
          <CommonText
            content="This is the home tab content"
            fontSize={12}
            color={colors.text1}
            moreStyle={styles.contentText}
          />
        </View>
      )}
      {activeTab === 'Profile' && (
        <View style={styles.contentInner}>
          <CommonText content="Profile Content" fontSize={16} color={colors.text2} />
          <CommonText
            content="This is the profile tab content"
            fontSize={12}
            color={colors.text1}
            moreStyle={styles.contentText}
          />
        </View>
      )}
      {activeTab === 'Settings' && (
        <View style={styles.contentInner}>
          <CommonText content="Settings Content" fontSize={16} color={colors.text2} />
          <CommonText
            content="This is the settings tab content"
            fontSize={12}
            color={colors.text1}
            moreStyle={styles.contentText}
          />
        </View>
      )}
    </View>
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    type1: `<CommonTopTabs
  tabs={['Home', 'Profile', 'Settings']}
  activeTab={activeTab}
  tabType={1}
  onChangeTab={setActiveTab}
/>`,
    type2: `// Wrap in ScrollView for many tabs
<ScrollView horizontal>
  <CommonTopTabs
    tabs={['All', 'New', 'Active', ...]}
    activeTab={activeTab}
    tabType={2}
    onChangeTab={setActiveTab}
  />
</ScrollView>`,
    content: `<CommonTopTabs
  tabs={tabs}
  activeTab={activeTab}
  onChangeTab={setActiveTab}
/>
{activeTab === 'Home' && <HomeContent />}
{activeTab === 'Profile' && <ProfileContent />}`,
  };
  return examples[example] || examples.type1;
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
  scrollHint: {
    marginBottom: 12,
  },
  scrollableTabsContainer: {
    paddingRight: 100,
  },
  helperText: {
    marginTop: 16,
  },
  contentBox: {
    marginTop: 16,
    borderRadius: 8,
    minHeight: 150,
  },
  contentInner: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    marginTop: 8,
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
