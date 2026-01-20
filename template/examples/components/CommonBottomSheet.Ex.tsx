import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { CommonText, CommonButton, CommonBottomSheet } from '@components';
import { useTheme } from '@themes';
import { useNavs } from '@hooks';

const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * CommonBottomSheet Example Component
 *
 * CommonBottomSheet is a modal bottom sheet component that provides:
 * - Smooth slide-up animation
 * - Gesture-based drag to dismiss
 * - Overlay with fade animation
 * - Optional scrollable content
 * - Customizable container styling
 */
export const CommonBottomSheetEx = () => {
  const { theme } = useTheme();
  const Colors = theme.colors;

  const [showBasic, setShowBasic] = React.useState(false);
  const [showScrollable, setShowScrollable] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [showDraggable, setShowDraggable] = React.useState(false);

  const [activeExample, setActiveExample] = React.useState<
    'basic' | 'scrollable' | 'form' | 'draggable'
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
            content="CommonBottomSheet Examples"
            fontSize={20}
            color={Colors.text2}
          />
        </View>
        <CommonText
          content="Draggable bottom sheet with gesture support"
          fontSize={12}
          color={Colors.text1}
          moreStyle={styles.subtitle}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ExampleButton title="Basic" example="basic" />
        <ExampleButton title="Draggable" example="draggable" />
        <ExampleButton title="Scrollable" example="scrollable" />
        <ExampleButton title="Form" example="form" />
      </View>

      {/* Example Content */}
      <View style={styles.exampleContainer}>
        {activeExample === 'basic' && (
          <BasicSheetExample colors={Colors} onOpen={() => setShowBasic(true)} />
        )}
        {activeExample === 'draggable' && (
          <DraggableSheetExample
            colors={Colors}
            onOpen={() => setShowDraggable(true)}
          />
        )}
        {activeExample === 'scrollable' && (
          <ScrollableSheetExample
            colors={Colors}
            onOpen={() => setShowScrollable(true)}
          />
        )}
        {activeExample === 'form' && (
          <FormSheetExample colors={Colors} onOpen={() => setShowForm(true)} />
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

      {/* Bottom Sheets */}
      <CommonBottomSheet
        isVisible={showBasic}
        onClose={() => setShowBasic(false)}>
        {() => (
          <View style={styles.sheetContent}>
            <CommonText
              content="Basic Bottom Sheet"
              fontSize={18}
              color={Colors.text2}
            />
            <CommonText
              content="Drag down or tap outside to close"
              fontSize={14}
              color={Colors.text1}
              moreStyle={styles.sheetText}
            />
            <CommonButton
              label="Close"
              onPress={() => setShowBasic(false)}
              moreButtonStyle={styles.sheetButton}
            />
          </View>
        )}
      </CommonBottomSheet>

      <CommonBottomSheet
        isVisible={showScrollable}
        onClose={() => setShowScrollable(false)}
        isScrollable
        containerStyle={styles.scrollableContainer}>
        {() => (
          <View style={styles.sheetContent}>
            <CommonText
              content="Scrollable Content"
              fontSize={18}
              color={Colors.text2}
            />
            <CommonText
              content="Scroll down to see more items"
              fontSize={12}
              color={Colors.text1}
              moreStyle={{ marginTop: 4, marginBottom: 8 }}
            />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(item => (
              <View
                key={item}
                style={[styles.listItem, { backgroundColor: Colors.grey1 }]}>
                <CommonText
                  content={`List Item ${item}`}
                  fontSize={14}
                  color={Colors.text2}
                />
                <CommonText
                  content="Tap or scroll to interact"
                  fontSize={11}
                  color={Colors.text1}
                />
              </View>
            ))}
            <View style={{ height: 20 }} />
          </View>
        )}
      </CommonBottomSheet>

      <CommonBottomSheet
        isVisible={showForm}
        onClose={() => setShowForm(false)}>
        {() => (
          <View style={styles.sheetContent}>
            <CommonText
              content="Quick Action"
              fontSize={18}
              color={Colors.text2}
            />
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.grey1 }]}
                onPress={() => setShowForm(false)}>
                <CommonText content="Share" fontSize={14} color={Colors.text2} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.grey1 }]}
                onPress={() => setShowForm(false)}>
                <CommonText content="Copy" fontSize={14} color={Colors.text2} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.grey1 }]}
                onPress={() => setShowForm(false)}>
                <CommonText content="Delete" fontSize={14} color={Colors.error} />
              </TouchableOpacity>
            </View>
            <CommonButton
              label="Cancel"
              textColor={Colors.text2}
              onPress={() => setShowForm(false)}
              moreButtonStyle={[
                styles.sheetButton,
                { backgroundColor: Colors.grey2 },
              ]}
            />
          </View>
        )}
      </CommonBottomSheet>

      <CommonBottomSheet
        isVisible={showDraggable}
        onClose={() => setShowDraggable(false)}>
        {() => (
          <View style={styles.sheetContent}>
            <View style={styles.dragIndicatorContainer}>
              <View style={[styles.dragIndicator, { backgroundColor: Colors.grey2 }]} />
            </View>
            <CommonText
              content="Draggable Bottom Sheet"
              fontSize={18}
              color={Colors.text2}
              textAlign="center"
            />
            <CommonText
              content="Try these gestures:"
              fontSize={14}
              color={Colors.text1}
              moreStyle={styles.gestureTitle}
            />
            <View style={styles.gestureList}>
              <View style={styles.gestureItem}>
                <View style={[styles.gestureIcon, { backgroundColor: Colors.senary }]}>
                  <CommonText content="↓" fontSize={16} color={Colors.white} />
                </View>
                <View style={styles.gestureTextContainer}>
                  <CommonText content="Swipe Down" fontSize={14} color={Colors.text2} />
                  <CommonText content="Drag down to dismiss the sheet" fontSize={12} color={Colors.text1} />
                </View>
              </View>
              <View style={styles.gestureItem}>
                <View style={[styles.gestureIcon, { backgroundColor: Colors.senary }]}>
                  <CommonText content="↑" fontSize={16} color={Colors.white} />
                </View>
                <View style={styles.gestureTextContainer}>
                  <CommonText content="Swipe Up" fontSize={14} color={Colors.text2} />
                  <CommonText content="Sheet snaps back to position" fontSize={12} color={Colors.text1} />
                </View>
              </View>
              <View style={styles.gestureItem}>
                <View style={[styles.gestureIcon, { backgroundColor: Colors.senary }]}>
                  <CommonText content="⚡" fontSize={16} color={Colors.white} />
                </View>
                <View style={styles.gestureTextContainer}>
                  <CommonText content="Quick Flick" fontSize={14} color={Colors.text2} />
                  <CommonText content="Fast swipe dismisses instantly" fontSize={12} color={Colors.text1} />
                </View>
              </View>
              <View style={styles.gestureItem}>
                <View style={[styles.gestureIcon, { backgroundColor: Colors.grey2 }]}>
                  <CommonText content="◐" fontSize={16} color={Colors.text2} />
                </View>
                <View style={styles.gestureTextContainer}>
                  <CommonText content="Tap Overlay" fontSize={14} color={Colors.text2} />
                  <CommonText content="Tap outside to close" fontSize={12} color={Colors.text1} />
                </View>
              </View>
            </View>
            <CommonButton
              label="Got it!"
              onPress={() => setShowDraggable(false)}
              moreButtonStyle={styles.sheetButton}
            />
          </View>
        )}
      </CommonBottomSheet>
    </View>
  );
};

// ============ Example Components ============

const BasicSheetExample = ({
  colors,
  onOpen,
}: {
  colors: any;
  onOpen: () => void;
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Basic Bottom Sheet"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonText
      content="A simple bottom sheet that slides up from the bottom with drag-to-dismiss gesture support."
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.description}
    />
    <CommonButton label="Open Basic Sheet" onPress={onOpen} />
  </View>
);

const DraggableSheetExample = ({
  colors,
  onOpen,
}: {
  colors: any;
  onOpen: () => void;
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Draggable Bottom Sheet"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonText
      content="Interactive demo showing all gesture controls. The sheet can be dismissed by dragging down past the threshold or with a quick flick gesture."
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.description}
    />
    <View style={[styles.featureList, { backgroundColor: colors.grey1 }]}>
      <CommonText content="• Pan gesture with spring physics" fontSize={12} color={colors.text2} />
      <CommonText content="• Velocity-based dismiss detection" fontSize={12} color={colors.text2} />
      <CommonText content="• Smooth animated transitions" fontSize={12} color={colors.text2} />
      <CommonText content="• Overlay tap to close" fontSize={12} color={colors.text2} />
    </View>
    <CommonButton label="Try Draggable Sheet" onPress={onOpen} />
  </View>
);

const ScrollableSheetExample = ({
  colors,
  onOpen,
}: {
  colors: any;
  onOpen: () => void;
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Scrollable Bottom Sheet"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonText
      content="Use isScrollable={true} for content that needs scrolling. The drag handle stays fixed at top."
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.description}
    />
    <CommonButton label="Open Scrollable Sheet" onPress={onOpen} />
  </View>
);

const FormSheetExample = ({
  colors,
  onOpen,
}: {
  colors: any;
  onOpen: () => void;
}) => (
  <View style={styles.demoBox}>
    <CommonText
      content="Action Sheet"
      fontSize={14}
      color={colors.text2}
      moreStyle={styles.label}
    />
    <CommonText
      content="Bottom sheets work great for action menus, quick forms, and confirmation dialogs."
      fontSize={12}
      color={colors.text1}
      moreStyle={styles.description}
    />
    <CommonButton label="Open Action Sheet" onPress={onOpen} />
  </View>
);

// ============ Code Examples ============

const getCodeExample = (example: string): string => {
  const examples: Record<string, string> = {
    basic: `<CommonBottomSheet
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
>
  {() => <YourContent />}
</CommonBottomSheet>`,
    draggable: `// Drag gestures are built-in!
// - Drag down past 150px to dismiss
// - Quick flick (velocity > 500) dismisses
// - Drag up snaps back with spring

<CommonBottomSheet
  isVisible={isVisible}
  onClose={handleClose}
>
  {() => <DraggableContent />}
</CommonBottomSheet>`,
    scrollable: `<CommonBottomSheet
  isVisible={isVisible}
  onClose={handleClose}
  isScrollable={true}
>
  {() => <ScrollableContent />}
</CommonBottomSheet>`,
    form: `<CommonBottomSheet
  isVisible={showActions}
  onClose={() => setShowActions(false)}
>
  {() => (
    <>
      <ActionButton label="Share" />
      <ActionButton label="Delete" />
    </>
  )}
</CommonBottomSheet>`,
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
  description: {
    marginBottom: 20,
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
  // Bottom Sheet Content Styles
  sheetContent: {
    padding: 20,
  },
  sheetText: {
    marginTop: 8,
    marginBottom: 20,
  },
  sheetButton: {
    marginTop: 16,
  },
  listItem: {
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  actionButtons: {
    marginTop: 16,
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  featureList: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 6,
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  gestureTitle: {
    marginTop: 16,
    marginBottom: 12,
  },
  gestureList: {
    gap: 12,
  },
  gestureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gestureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureTextContainer: {
    flex: 1,
  },
  scrollableContainer: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
});
