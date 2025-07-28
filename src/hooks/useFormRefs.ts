// useFormRefs.ts
import { PhoneInputRef } from '@/components/PhoneInput';
import React from 'react';
import { TextInput } from 'react-native';


export const useFormRefs = () => {
  const reg_form = {
    full_name: React.createRef<TextInput>(),
    email_Phone: React.createRef<TextInput>(),
    password: React.createRef<TextInput>(),
    confirm_password: React.createRef<TextInput>(),
    phone_number: React.createRef<PhoneInputRef>(),
    username: React.createRef<TextInput>(),
    last_name: React.createRef<TextInput>(),
  };

  const signIn_form = {
    email: React.createRef<TextInput>(),
    password: React.createRef<TextInput>(),
  }

  return {
    reg_form,
    signIn_form,
  };
};
