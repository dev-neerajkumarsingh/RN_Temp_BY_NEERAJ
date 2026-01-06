// CommonImagePickerModal.tsx
import React, { useCallback } from 'react';
import {
  Modal,
  Pressable,
  View,
  Platform,
  Alert,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import { useStyles } from './Styles';
import { CommonImage, CommonText } from '@components';
import { useTheme } from '@themes';
import * as ImagePicker from 'react-native-image-crop-picker';
import { Options } from 'react-native-image-crop-picker';
 
// Default image options
const DEFAULT_IMG_OPTIONS: Partial<Options> = {
  mediaType: 'photo',
  includeBase64: false,
  cropping: true,
  useFrontCamera: true,
};
 
type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'unavailable';
 
type ImageResult = {
  path: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  filename?: string;
};
 
type Props = {
  isVisible: boolean;
  onPressClose: () => void;
  onSelectImage: (image: ImageResult) => void;
  onError?: (error: Error) => void;
  // Customization props
  imageOptions?: Partial<Options>;
  enableCropping?: boolean;
  cropperCircleOverlay?: boolean;
  freeStyleCropEnabled?: boolean;
  cropWidth?: number;
  cropHeight?: number;
  compressQuality?: number;
  includeBase64?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  // UI Customization
  cameraLabel?: string;
  galleryLabel?: string;
  showCamera?: boolean;
  showGallery?: boolean;
};
 
export const CommonImagePickerModal: React.FC<Props> = ({
  isVisible = false,
  onPressClose,
  onSelectImage,
  onError,
  // Image options
  imageOptions = {},
  enableCropping = false,
  cropperCircleOverlay = false,
  freeStyleCropEnabled = true,
  cropWidth = 300,
  cropHeight = 300,
  compressQuality = 0.8,
  includeBase64 = false,
  multiple = false,
  maxFiles = 1,
  // UI options
  cameraLabel = 'CAMERA',
  galleryLabel = 'GALLERY',
  showCamera = true,
  showGallery = true,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
 
  // Merged options
  const getMergedOptions = useCallback(
    (isCamera: boolean): Options => ({
      ...DEFAULT_IMG_OPTIONS,
      cropping: enableCropping,
      cropperCircleOverlay,
      freeStyleCropEnabled,
      width: cropWidth,
      height: cropHeight,
      compressImageQuality: compressQuality,
      includeBase64,
      multiple: isCamera ? false : multiple,
      maxFiles: isCamera ? 1 : maxFiles,
      ...imageOptions,
    }),
    [
      enableCropping,
      cropperCircleOverlay,
      freeStyleCropEnabled,
      cropWidth,
      cropHeight,
      compressQuality,
      includeBase64,
      multiple,
      maxFiles,
      imageOptions,
    ],
  );
 
  // Check camera permission
  const requestCameraPermission = async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'ios') {
      return 'granted';
    }
 
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
 
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        return 'blocked';
      }
      return 'denied';
    } catch (err) {
      console.error('Camera permission error:', err);
      return 'unavailable';
    }
  };
 
  const requestGalleryPermission = async (): Promise<PermissionStatus> => {
    return 'granted';
  };
 
  const showSettingsAlert = (type: 'camera' | 'gallery') => {
    const title =
      type === 'camera' ? 'Camera Permission' : 'Gallery Permission';
    const message =
      type === 'camera'
        ? 'Camera permission is blocked. Please enable it in settings.'
        : 'Storage permission is blocked. Please enable it in settings.';
 
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
    ]);
  };
 
  // Handle camera capture
  const handleCameraCapture = async () => {
    const permissionStatus = await requestCameraPermission();
 
    if (permissionStatus === 'blocked') {
      showSettingsAlert('camera');
      return;
    }
 
    if (permissionStatus !== 'granted') {
      onError?.(new Error('Camera permission denied'));
      return;
    }
 
    try {
      const options = getMergedOptions(true);
      const result = await ImagePicker.openCamera(options);
 
      const imageResult: ImageResult = {
        path: result.path,
        mime: result.mime,
        width: result.width,
        height: result.height,
        size: result.size,
        filename: result.filename,
      };
 
      onSelectImage(imageResult);
      onPressClose();
    } catch (error: any) {
      if (error?.code !== 'E_PICKER_CANCELLED') {
        console.error('Camera error:', error);
        onError?.(error);
      }
    }
  };
 
  // Handle gallery selection
  const handleGallerySelect = async () => {
    const permissionStatus = await requestGalleryPermission();
 
    if (permissionStatus === 'blocked') {
      showSettingsAlert('gallery');
      return;
    }
 
    if (permissionStatus !== 'granted') {
      onError?.(new Error('Gallery permission denied'));
      return;
    }
 
    try {
      const options = getMergedOptions(false);
      const result = await ImagePicker.openPicker(options);
 
      // Handle multiple selection
      if (Array.isArray(result)) {
        result.forEach(img => {
          onSelectImage({
            path: img.path,
            mime: img.mime,
            width: img.width,
            height: img.height,
            size: img.size,
            filename: img.filename,
          });
        });
      } else {
        const imageResult: ImageResult = {
          path: result.path,
          mime: result.mime,
          width: result.width,
          height: result.height,
          size: result.size,
          filename: result.filename,
        };
        onSelectImage(imageResult);
      }
      onPressClose();
    } catch (error: any) {
      if (error?.code !== 'E_PICKER_CANCELLED') {
        console.error('Gallery error:', error);
        onError?.(error);
      }
    }
  };
 
  if (!isVisible) {
    return null;
  }
 
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onPressClose}
      statusBarTranslucent>
      <Pressable style={styles.container} onPress={onPressClose}>
        <Pressable
          style={styles.bottomContainer}
          onPress={e => e.stopPropagation()}>
          {showCamera && (
            <View style={styles.cameraContainer}>
              <Pressable
                style={styles.btnContainer}
                onPress={handleCameraCapture}>
                <View style={styles.cameraIconContainer}>
                  <CommonImage
                    sourceType="localSvg"
                    svgSource="camera"
                    width={30}
                    height={30}
                    color={theme.colors.white}
                  />
                </View>
              </Pressable>
              <CommonText
                content={cameraLabel}
                color={theme.colors.white}
                fontSize={1.8}
                moreStyle={styles.label}
              />
            </View>
          )}
 
          {showGallery && (
            <View style={styles.galleryContainer}>
              <Pressable
                style={styles.btnContainer}
                onPress={handleGallerySelect}>
                <View style={styles.galleryIconContainer}>
                  <CommonImage
                    sourceType="localSvg"
                    svgSource="gallery"
                    width={30}
                    height={30}
                    color={theme.colors.white}
                  />
                </View>
              </Pressable>
              <CommonText
                content={galleryLabel}
                color={theme.colors.white}
                fontSize={1.8}
                moreStyle={styles.label}
              />
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};