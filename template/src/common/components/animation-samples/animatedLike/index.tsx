import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
  StatusBar,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

// --- SVG Icon Components ---

/**
 * Heart (Outline) Icon
 * This component renders the SVG for the 'unliked' state.
 */
const HeartOutlineIcon = ({ width = 28, height = 28, color = '#262626' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

/**
 * Heart (Filled) Icon
 * This component renders the SVG for the 'liked' state.
 * The color is a classic red, similar to Instagram.
 */
const HeartFilledIcon = ({ width = 28, height = 28, color = '#FF3040' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);


// --- The Like Button Component ---

/**
 * A reusable LikeButton component that manages its own state
 * and displays an animated heart icon.
 */
const LikeButton = () => {
  // State to track whether the post is liked or not
  const [liked, setLiked] = useState(false);
  
  // Animated value for scaling the heart icon
  const scaleValue = useRef(new Animated.Value(1)).current;
  
  // Animation configuration
  const animateHeart = () => {
    // Reset the scale to 1 before starting the animation
    scaleValue.setValue(1);
    
    // Spring animation for a bouncy effect
    Animated.spring(scaleValue, {
      toValue: 1.05, // Scale up to 120%
      friction: 1, // Controls the bounciness
      useNativeDriver: true, // for better performance
    }).start(() => {
      // After the spring animation, scale back down to 1
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  // Toggles the liked state and triggers the animation
  const handlePress = () => {
    animateHeart();
    setLiked(!liked);
  };
  
  // Define the animated style for the TouchableOpacity
  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View style={animatedStyle}>
        {liked ? <HeartFilledIcon /> : <HeartOutlineIcon />}
      </Animated.View>
    </TouchableOpacity>
  );
};


// --- Main App Component to display the feature ---

export const AnimatedLike = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                 <View style={styles.profileImagePlaceholder} />
                 <Text style={styles.username}>react_native_dev</Text>
            </View>
            <View style={styles.imagePlaceholder} />
            <View style={styles.cardFooter}>
                <LikeButton />
                <Text style={styles.likesText}>1,234 likes</Text>
                <Text style={styles.caption}>
                    <Text style={{fontWeight: 'bold'}}>react_native_dev</Text> Here is a cool post with a like button! #reactnative #svg #animation
                </Text>
            </View>
        </View>
      </SafeAreaView>
    </>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // A light grey background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  profileImagePlaceholder: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#e1e1e1',
  },
  username: {
      marginLeft: 10,
      fontWeight: 'bold',
      fontSize: 14,
  },
  imagePlaceholder: {
    width: '100%',
    height: 350,
    backgroundColor: '#e1e1e1', // Placeholder for an image
  },
  cardFooter: {
    padding: 12,
  },
  likesText: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
  },
  caption: {
      marginTop: 4,
      fontSize: 14,
      lineHeight: 20,
  }
});