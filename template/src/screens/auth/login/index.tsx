import React, { useState } from 'react';
import { useTheme } from '@themes';
import {
  CommonBox,
  CommonButton,
  CommonText,
  CommonInput,
  CommonKeyboardStickyView,
} from '@components';
import { useNavs } from '@hooks';
import { useValidators } from '@hooks';
import { queryKeys, useLoginMutation, NonAuthenticatedServices } from '@network';
import { useAppDispatch, loginReducer } from '@redux';
import { useLoginStyles } from './Styles';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export const Login = () => {
  const [states, setStates] = useState({
    email: '',
    emailErr: '',
    password: '',
    passwordErr: '',
  });
  const styles = useLoginStyles();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // Get method api call example...
  // const termsConditionData = useQuery({
  //   queryKey: queryKeys.nonAuthenticated.termscondition(),
  //   queryFn: () => NonAuthenticatedServices.termsCondition(),
  // });
  // console.log('#>> termsCondition :: ', termsConditionData);

  const login = useLoginMutation({
    onSuccess: data => {
      console.log(JSON.stringify(data), 'LOGIN_RESPONSE');
      queryClient.setQueryData(
        queryKeys.nonAuthenticated.login(),
        data?.data?.user,
      );
      console.log('#>>> data :: ', data);
      // Storing data in redux...
      // dispatch(
      //   loginReducer({
      //     userData: data?.data?.user,
      //     accessToken: data?.data?.token,
      //     refreshToken: data?.data?.token,
      //   }),
      // );
      // Navigating user to Home screen...
      // useNavs.reset({
      //   index: 0,
      //   routes: [{ name: 'Chat', params: { fromRegister: true } }],
      // });
    },
    onError: (error, variables, context) => {
      console.error(JSON.stringify(error), 'LOGIN_ERR_RESPONSE');
    },
  });

  const handleSubmit = async () => {
    const payload = {
      email: states.email?.toLowerCase()?.trim(),
      password: states.password?.trim(),
    };
    console.log('#>> handleSubmit() payload :: ', payload);
    login.mutate(payload);
  };

  const handleValidation = () => {
    const validEmail = useValidators.email(states.email);
    const validPassword = useValidators.password(states.password);

    if (!validEmail.status) {
      setStates(prev => ({ ...prev, emailErr: validEmail.msg }));
      return;
    }

    if (!validPassword.status) {
      setStates(prev => ({ ...prev, passwordErr: validPassword.msg }));
      return;
    }

    if (validEmail.status && validPassword.status) {
      handleSubmit();
    }
  };

  return (
    <>
      <CommonBox moreStyles={{ alignItems: 'center' }} scrollEnabled={false}>
        <CommonText
          content={'Login'}
          color={theme.colors.secondary}
          textAlign={'center'}
          fontSize={20}
          lineHeight={30}
          fontType={'InterBold'}
          moreStyle={styles.title}
        />
        <CommonInput
          placeholder="Enter your name1"
          value={states.email}
          msgError={states.emailErr}
          onChangeText={(text: string) =>
            setStates(prev => ({ ...prev, email: text }))
          }
          moreContainerStyle={styles.input1}
        />
        <CommonInput
          placeholder="Enter your name2"
          value={states.password}
          msgError={states.passwordErr}
          onChangeText={(text: string) =>
            setStates(prev => ({ ...prev, password: text }))
          }
          moreContainerStyle={styles.input2}
        />
      </CommonBox>
      <CommonKeyboardStickyView>
        <CommonButton
          width={'90%'}
          height={50}
          label="Go To Signup"
          textAlign={'center'}
          textColor={theme.colors.primary}
          fontSize={20}
          onPress={handleValidation}
          moreButtonStyle={styles.btnStyle}
        />
      </CommonKeyboardStickyView>
    </>
  );
};
