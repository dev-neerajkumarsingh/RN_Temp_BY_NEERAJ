import * as React from 'react';
import { View, TextInput, Platform, NativeSyntheticEvent, TextInputKeyPressEvent } from 'react-native';
import { useInpuptStyles } from './Styles';

// Type for the TextInput ref
type TextInputRef = TextInput | null;

type Props = {
  otp: string[]; // Current OTP state from HOC (used for display/validation)
  setOtp: (val: string[]) => void; // External state updater
  otpLength: number; // The required length of the OTP (e.g., 6)
  onValidationChange: (isValid: boolean) => void; // New prop to notify parent of validation status
  // Removed: isOtpValid, handleInputBlur, handleInputFocus
};

export const CommonOtpInput: React.FC<Props> = ({
  otp,
  setOtp,
  otpLength,
  onValidationChange,
}) => {
  const styles = useInpuptStyles();

  // 1. INTERNAL STATES AND REFS

  // State for tracking which input box currently has focus
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  // State to track if the overall component has been touched/interacted with (for error visibility)
  const [isTouched, setIsTouched] = React.useState(false);

  // Ref for the physical TextInput elements (for focus management)
  const otpInputs = React.useRef<TextInputRef[]>(Array(otpLength).fill(null));
  // Ref for managing the OTP values locally (temporary storage)
  const internalOtpValuesRef = React.useRef<string[]>(otp);

  // Computed validation state
  const isFilled = otp.every(digit => digit.length === 1);
  const isOtpValid = isFilled; // Assuming OTP is valid if fully filled (customize this logic if needed)

  // Synchronize internal ref on external OTP change (e.g., reset)
  React.useEffect(() => {
    internalOtpValuesRef.current = otp;
  }, [otp]);

  // Notify parent component about the validation status whenever OTP or validity changes
  React.useEffect(() => {
    onValidationChange(isOtpValid);
  }, [isOtpValid, onValidationChange]);

  // ⭐ OPTIMIZED FIX: Reads directly from the stable internal ref
  const handleIsDigitFilled = React.useCallback(
    (index: number) => {
      // Use internalOtpValuesRef.current for the fastest, most direct check
      return internalOtpValuesRef.current?.[index]?.length === 1;
    },
    [],
  );

  // --- INTERNAL HANDLERS ---

  const handleInputFocus = React.useCallback((index: number) => {
    setFocusedIndex(index);
    setIsTouched(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    // Only clear the focused index after a small delay to allow focus shift between boxes
    if(otp.length === 0) {
      setTimeout(() => setFocusedIndex(-1), 50);
    }
  }, []);

  /**
   * Updates the external `setOtp` prop with the current values from the internal ref.
   */
  const updateExternalOtp = React.useCallback(() => {
    setOtp([...internalOtpValuesRef.current]);
  }, [setOtp]);

  /**
   * Handles the text change in a single OTP box (single digit entry/advance).
   */
  const handleTextChange = React.useCallback(
    (index: number, value: string) => {
      const numericValue = value.replace(/[^0-9]/g, '');

      if (numericValue.length === 1) {
        internalOtpValuesRef.current[index] = numericValue;
        updateExternalOtp();

        if (index < otpLength - 1) {
          const nextIndex = index + 1;
          setFocusedIndex(nextIndex);
          otpInputs.current?.[nextIndex]?.focus();
        } else {
          setFocusedIndex(index);
          // Auto-blur after final digit is entered
          otpInputs.current?.[index]?.blur();
        }
      }
    },
    [otpLength, updateExternalOtp],
  );

  /**
   * Handles full OTP paste/autofill on iOS/Android.
   */
  const handleFullOtpChange = React.useCallback(
    (fullOtpString: string) => {
      const numericValue = fullOtpString.replace(/[^0-9]/g, '');

      if (numericValue.length === otpLength) {
        internalOtpValuesRef.current = numericValue.split('');
        updateExternalOtp();

        setFocusedIndex(otpLength - 1);
        otpInputs.current?.[otpLength - 1]?.blur(); // Auto-blur after paste
        return true;
      }
      return false;
    },
    [otpLength, updateExternalOtp],
  );

  /**
   * Handles the 'backspace' key press for deletion and focus management.
   */
  const handleKeyPress = React.useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEvent>, index: number) => {
      if (e.nativeEvent.key === 'Backspace') {
        const currentDigit = internalOtpValuesRef.current[index];

        if (currentDigit === '' && index > 0) {
          const prevIndex = index - 1;
          internalOtpValuesRef.current[prevIndex] = '';
          updateExternalOtp();

          setFocusedIndex(prevIndex);
          otpInputs.current?.[prevIndex]?.focus();
        } else if (currentDigit !== '') {
          internalOtpValuesRef.current[index] = '';
          updateExternalOtp();
        }
        e.preventDefault();
      }
    },
    [updateExternalOtp],
  );

  return (
    <View style={styles.otpContainer1}>
      {Array(otpLength)
        .fill(0)
        .map((_, index) => {
          const digit = otp[index] || '';
          const isCurrentDigitFilled = handleIsDigitFilled(index);
          const showFilledStyle = isCurrentDigitFilled;

          const showErrorStyle =
            handleIsDigitFilled(index) && isTouched && !isOtpValid && isFilled;

          return (
            <TextInput
              key={index?.toString()}
              style={[
                styles.otpContainer2,
                focusedIndex == index && styles.otpInputFocused,
                showFilledStyle && styles.otpInputFilled,
                showErrorStyle && styles.otpInputError,
              ]}
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
              value={digit}
              onChangeText={(text: string) => {
                if (handleFullOtpChange(text)) {
                  return;
                }

                const singleChar = text.length > 0 ? text.slice(-1) : '';
                handleTextChange(index, singleChar);
              }}
              maxLength={Platform.OS === 'android' ? 1 : otpLength}
              keyboardType="numeric"
              ref={ref => (otpInputs.current[index] = ref)}
              onFocus={() => handleInputFocus(index)}
              onBlur={handleInputBlur}
              onKeyPress={(e: any) => handleKeyPress(e, index)}
              selection={{ start: digit.length, end: digit.length }}
            />
          );
        })}
    </View>
  );
};
