import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { CommonBox, CommonText, CommonInput, CommonButton } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

/**
 * CommonBox Example Component
 *
 * CommonBox is a screen wrapper component that provides:
 * - Theme-aware background styling
 * - Configurable StatusBar
 * - Optional ScrollView support
 * - Optional KeyboardAvoidingView support
 * - Loading state with Shimmer effect
 * - Modal styling support
 */
export const CommonBoxEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [showLoader, setShowLoader] = React.useState(false);
  const [activeExample, setActiveExample] = React.useState<
    'basic' | 'scroll' | 'keyboard' | 'modal' | 'loader'
  >('basic');

  const toggleLoader = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 2000);
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
            content="CommonBox Examples"
            fontSize={20}
            color={Colors.text2}
          />
        </View>
        <CommonText
          content="Screen wrapper with theme, scroll, keyboard & loader support"
          fontSize={12}
          color={Colors.text1}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="Basic" example="basic" />
        <ExampleButton title="Scroll" example="scroll" />
        <ExampleButton title="Keyboard" example="keyboard" />
        <ExampleButton title="Modal" example="modal" />
        <ExampleButton title="Loader" example="loader" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'basic' && <BasicExample colors={Colors} />}
        {activeExample === 'scroll' && <ScrollExample colors={Colors} />}
        {activeExample === 'keyboard' && <KeyboardExample colors={Colors} />}
        {activeExample === 'modal' && <ModalExample colors={Colors} />}
        {activeExample === 'loader' && (
          <LoaderExample
            colors={Colors}
            showLoader={showLoader}
            toggleLoader={toggleLoader}
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

const BasicExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonBox moreStyles={styles.innerBox}>
      <View style={styles.centeredContent}>
        <CommonText
          content="Basic CommonBox"
          fontSize={16}
          color={colors.text2}
        />
        <CommonText
          content="Simple wrapper with theme-aware styling"
          fontSize={12}
          color={colors.text1}
          moreStyle={styles.demoText}
        />
      </View>
    </CommonBox>
  </View>
);

const ScrollExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonBox useScrollView moreStyles={styles.innerBox}>
      {[1, 2, 3, 4, 5].map(item => (
        <View
          key={item}
          style={[styles.scrollItem, { backgroundColor: colors.grey1 }]}>
          <CommonText
            content={`Scrollable Item ${item}`}
            fontSize={14}
            color={colors.text2}
          />
        </View>
      ))}
    </CommonBox>
  </View>
);

const KeyboardExample = ({ colors }: { colors: any }) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <View style={styles.demoBox}>
      <CommonBox useKeyboardAvoidingView moreStyles={styles.innerBox}>
        <View style={styles.keyboardContent}>
          <CommonText
            content="With KeyboardAvoidingView"
            fontSize={14}
            color={colors.text2}
          />
          <CommonInput
            placeholder="Try typing here..."
            value={inputValue}
            onChangeText={setInputValue}
            moreContainerStyle={styles.demoInput}
          />
          <CommonText
            content="Content adjusts when keyboard opens"
            fontSize={11}
            color={colors.text1}
            moreStyle={styles.demoText}
          />
        </View>
      </CommonBox>
    </View>
  );
};

const ModalExample = ({ colors }: { colors: any }) => (
  <View style={styles.demoBox}>
    <CommonBox isModal moreStyles={[styles.innerBox, styles.modalBox]}>
      <View style={styles.centeredContent}>
        <CommonText
          content="Modal Style Box"
          fontSize={16}
          color={colors.text2}
        />
        <CommonText
          content="Uses commonModalBox styling for modal screens"
          fontSize={12}
          color={colors.text1}
          moreStyle={styles.demoText}
        />
      </View>
    </CommonBox>
  </View>
);

const LoaderExample = ({
  colors,
  showLoader,
  toggleLoader,
}: {
  colors: any;
  showLoader: boolean;
  toggleLoader: () => void;
}) => (
  <View style={styles.demoBox}>
    <CommonBox loaderStatus={showLoader} moreStyles={styles.innerBox}>
      <View style={styles.centeredContent}>
        <CommonText
          content="With Shimmer Loader"
          fontSize={16}
          color={colors.text2}
        />
        <TouchableOpacity
          style={[styles.loaderButton, { backgroundColor: colors.senary }]}
          onPress={toggleLoader}>
          <CommonText
            content={showLoader ? 'Loading...' : 'Show Loader'}
            fontSize={14}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </CommonBox>
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    basic: `<CommonBox>
  <YourContent />
</CommonBox>`,
    scroll: `<CommonBox
  useScrollView
  showsVerticalScrollIndicator={false}
>
  <YourScrollableContent />
</CommonBox>`,
    keyboard: `<CommonBox
  useKeyboardAvoidingView
  keyboardVerticalOffset={50}
>
  <YourFormContent />
</CommonBox>`,
    modal: `<CommonBox isModal>
  <YourModalContent />
</CommonBox>`,
    loader: `<CommonBox loaderStatus={isLoading}>
  <YourContent />
</CommonBox>`,
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
    borderRadius: 12,
    overflow: 'hidden',
  },
  innerBox: {
    flex: 1,
    borderRadius: 12,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  demoText: {
    marginTop: 8,
    textAlign: 'center',
  },
  scrollItem: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  keyboardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  demoInput: {
    marginTop: 12,
    width: '100%',
  },
  modalBox: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  loaderButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
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
