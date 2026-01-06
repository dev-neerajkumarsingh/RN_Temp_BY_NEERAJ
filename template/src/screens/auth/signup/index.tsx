import React from 'react';
import { CommonBox, CommonText, CommonInput, CommonButton } from '@components';
import { useTheme } from '@themes';
import { useSignupStyles } from './Styles';

export const Signup = () => {
  const [states, setStates] = React.useState({
    inputVal1: '',
    inputVal2: '',
    inputVal3: '',
    inputVal4: '',
    inputVal5: '',
    inputVal6: '',
    inputVal7: '',
    inputVal8: '',
  });
  const styles = useSignupStyles();
  const { theme, currentThemeName, setTheme } = useTheme();

  return (
    <CommonBox useKeyboardAvoidingView>
      <CommonText
        content={'Signup'}
        color={theme.colors.secondary}
        fontSize={20}
        lineHeight={30}
        fontType={'InterBold'}
        moreStyle={styles.title}
      />
      <CommonInput
        placeholder="Enter your name1"
        value={states.inputVal1}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal1: text }))
        }
        moreContainerStyle={styles.input1}
      />
      <CommonInput
        placeholder="Enter your name2"
        value={states.inputVal2}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal2: text }))
        }
        moreContainerStyle={styles.input2}
      />
      <CommonInput
        placeholder="Enter your name3"
        value={states.inputVal3}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal3: text }))
        }
        moreContainerStyle={styles.input2}
      />
      <CommonInput
        placeholder="Enter your name4"
        value={states.inputVal4}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal4: text }))
        }
        moreContainerStyle={styles.input2}
      />
      <CommonInput
        placeholder="Enter your name5"
        value={states.inputVal5}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal5: text }))
        }
        moreContainerStyle={styles.input2}
      />
      <CommonInput
        placeholder="Enter your name6"
        value={states.inputVal6}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal6: text }))
        }
        moreContainerStyle={styles.input2}
      />
      <CommonInput
        placeholder="Enter your name7"
        value={states.inputVal7}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal7: text }))
        }
        moreContainerStyle={styles.input2}
      />
      <CommonInput
        placeholder="Enter your name8"
        value={states.inputVal8}
        onChangeText={(text: string) =>
          setStates(prev => ({ ...prev, inputVal8: text }))
        }
        moreContainerStyle={styles.input2}
      />
      <CommonButton
        width={'90%'}
        height={50}
        label="Change Theme"
        textColor={theme.colors.primary}
        fontSize={20}
        onPress={() => setTheme(currentThemeName === 'dark' ? 'light' : 'dark')}
        moreButtonStyle={styles.btnStyle}
      />
    </CommonBox>
  );
};
