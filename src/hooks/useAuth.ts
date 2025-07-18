import React from 'react';

interface Auth {
  email: string;
  password: string;
  regEmail: string;
  regPassword: string;
  fullName: string;
  confirmPassword: string;
  phoneNumber: string;
  lastName: string;
  username: string;
  contactNumber: string;
}

const useAuth = () => {
  const [state, setState] = React.useState<Auth>({
    email: '',
    password: '',
    regEmail: '',
    regPassword: '',
    fullName: '',
    confirmPassword: '',
    phoneNumber: '',
    lastName: '',
    username: '',
    contactNumber: '',
  });
    const updateState = (field: keyof Auth, value: string) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  return {
    state, 
    updateState
  }
};

export default useAuth;