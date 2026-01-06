import React, { useEffect } from 'react';
import {
  View,
  Pressable,
  Modal,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SCREEN_HEIGHT } from '@utils';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import { useCommonBottomSheetStyles } from './Styles';

type CommonBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: () => React.ReactNode | React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>[] | StyleProp<ViewStyle>;
  isScrollable?: boolean;
};

export const CommonBottomSheet: React.FC<CommonBottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  containerStyle,
  isScrollable = false,
}) => {
  const styles = useCommonBottomSheetStyles();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const overlayOpacity = useSharedValue(0);

  const startY = useSharedValue(0);

  const CLOSE_THRESHOLD = 150;
  const VELOCITY_THRESHOLD = 500;

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const handleClose = () => {
    onClose();
  };

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate(event => {
      const newY = startY.value + event.translationY;
      translateY.value = Math.max(0, newY);
    })
    .onEnd(event => {
      const shouldClose =
        translateY.value > CLOSE_THRESHOLD ||
        event.velocityY > VELOCITY_THRESHOLD;

      if (shouldClose) {
        translateY.value = withTiming(
          SCREEN_HEIGHT,
          { duration: 250 },
          finished => {
            if (finished) {
              scheduleOnRN(handleClose);
            }
          },
        );
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
          overshootClamping: true,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    if (isVisible) {
      overlayOpacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      overlayOpacity.value = withTiming(0, { duration: 250 });
      translateY.value = SCREEN_HEIGHT;
    }
  }, [overlayOpacity, translateY, isVisible]);

  const closeWithAnimation = () => {
    overlayOpacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(
      SCREEN_HEIGHT,
      {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      },
      finished => {
        if (finished) {
          scheduleOnRN(handleClose);
        }
      },
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.mainContainer}>
        <Animated.View
          style={[styles.dimOverlay, overlayStyle]}
          pointerEvents="none"
        />

        <View style={styles.container} pointerEvents="box-none">
          <Pressable style={styles.close} onPress={closeWithAnimation} />
          <Animated.View style={[styles.card, animatedStyle]}>
            {isScrollable ? (
              <>
                <GestureDetector gesture={panGesture}>
                  <View style={styles.scroll}>
                    <View style={styles.down} />
                  </View>
                </GestureDetector>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={containerStyle}>
                  {children && children()}
                </ScrollView>
              </>
            ) : (
              <GestureDetector gesture={panGesture}>
                <View style={styles.box}>
                  <View style={styles.down} />
                  <View style={containerStyle}>{children && children()}</View>
                </View>
              </GestureDetector>
            )}
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};
