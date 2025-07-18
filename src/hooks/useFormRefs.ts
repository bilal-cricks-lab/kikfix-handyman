// useFormRefs.ts
import React from 'react';
import { TextInput } from 'react-native';


export const useFormRefs = () => {
  const form = {
    full_name: React.createRef<TextInput>(),
    email_Phone: React.createRef<TextInput>(),
    password: React.createRef<TextInput>(),
    confirm_password: React.createRef<TextInput>(),
    contact_number: React.createRef<TextInput>(),
    username: React.createRef<TextInput>(),
    last_name: React.createRef<TextInput>()
  };

  return {
    form,
  };
};
