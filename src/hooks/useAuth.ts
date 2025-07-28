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
  });
  const [activeTab, setActiveTab] = React.useState<'login' | 'register'>(
    'login',
  );
  const [toast, setToast] = React.useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
  });
  const updateState = (field: keyof Auth, value: string) => {
    setState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };
  return {
    state,
    activeTab,
    setActiveTab,
    toast,
    setToast,
    updateState,
  };
};

export default useAuth;
