import React from 'react';
import { TextInput } from 'react-native';
import { PhoneInputRef } from '../components/PhoneInput';

type InputText = {
  id: string;
  ref?: React.RefObject<TextInput> | null ;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  nextRef?: React.RefObject<TextInput> | null
  placeHolder: string;
  value?: string;
  onChangeText?: (text) => void 
  value?: string | undefined;
  onChangeText?: (text: any) => void;
  phoneError: string
};

export default InputText;
