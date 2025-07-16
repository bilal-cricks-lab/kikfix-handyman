import React from 'react';
import { TextInput } from 'react-native';
// import PhoneInput from 'react-native-phone-number-input';
import { PhoneInputRef } from '../components/PhoneInput';

type InputText = {
  id: string;
  ref: React.RefObject<TextInput> | React.RefObject<PhoneInputRef>;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  nextRef?:
    | React.RefObject<TextInput>
    // | React.RefObject<PhoneInput>
    | React.RefObject<PhoneInputRef>;
  placeHolder: string;
};

export default InputText;
