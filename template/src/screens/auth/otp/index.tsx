import React from 'react';
import { CommonBox, CommonOtpInput } from '@components';
import { useTheme, GlobalStyles } from '@themes';

export const Otp = () => {
  const { theme } = useTheme();
  const globalStyles = GlobalStyles(theme);
  const [states, setStates] = React.useState({ otp: ['', '', '', '', '', ''] });

  return (
    <CommonBox moreStyles={globalStyles.centerContent}>
      <CommonOtpInput
        otp={states.otp}
        setOtp={(val: string[]) => setStates({ ...states, otp: val })}
        otpLength={4}
        onValidationChange={(val: any) => console.log('#>> val :: ', val)}
      />
    </CommonBox>
  );
};
