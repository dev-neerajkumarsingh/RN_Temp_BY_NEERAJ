export const useValidators = {
  email: (email: string) => {
    if (email.trim().length === 0) {
      return {status: false, msg: 'Email ID should not be empty.'};
    } else if (email.includes(' ')) {
      return {status: false, msg: 'Email ID should not contain any spaces'};
    } else if (
      !/^[_A-Za-z0-9+-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(
        email,
      )
    ) {
      return {status: false, msg: 'Email ID is not valid'};
    } else {
      return {status: true, msg: ''};
    }
  },
  phoneNumber: (phoneNo: string) => {
    if (phoneNo.length !== 10) {
      return {status: false, msg: 'Mobile No. should contain 10 digits.'};
    } else if (!/^[0-9]{10}$/.test(phoneNo)) {
      return {
        status: false,
        msg: 'Mobile No. should contain only digits.',
      };
    } else if (!/^[6789][0-9]{9}$/.test(phoneNo)) {
      return {
        status: false,
        msg: 'Mobile No. should start with digits 6, 7, 8, or 9.',
      };
    } else if (phoneNo.split('').every(char => char === phoneNo[0])) {
      return {
        status: false,
        msg: 'Enter valid mobile number.',
      };
    } else {
      return {status: true, msg: ''};
    }
  },
  password: (password: string) => {
    if(password.length <= 8) {
      return {status: false, msg: 'Password should be at least 6 characters long.'};
    }
    if(!/[A-Z]/.test(password)) {
      return {status: false, msg: 'Password should have 1 uppercase letter.'};
    }
    if(!/[0-9]/.test(password)) {
      return {status: false, msg: 'Password should have 1 numeric value.'};
    }
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return {status: false, msg: 'Password should have 1 sepcial character.'};
    }
    return {status: true, msg: ''};
  },
  otp: (otp: string[]) => {
    for(let i = otp?.length - 1; i >= 0; i--) {
      if (isNaN(Number(otp[i]))) {
        return {status: false, msg: 'OTP should contain only digits.'};
      }
    }

    return {status: true, msg: ''};
  },
};
