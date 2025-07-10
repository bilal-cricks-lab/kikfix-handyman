import React, { forwardRef } from 'react';
import { PhoneInput, PhoneInputRef } from 'rn-phone-input-field';

import { StyleSheet } from 'react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../utils/screenSize';

interface PhoneProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface PhoneInputRef {
  focus: () => void;
}

const PhoneInputText = forwardRef<PhoneInputRef, PhoneProps>((params, ref) => {
  const { value, onChange, placeholder } = params;
  React.useEffect(() => {
  }, [])
  return (
    <>
      <PhoneInput
        ref={ref}
        flagButtonStyle={styles.flagButtonStyle}
        containerStyle={styles.container}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
        placeholder={placeholder || 'Enter phone number'}
        value={value}
        onChangeFormattedText={(value: any) => {
          onChange(value);
        }}
        onChangeText={(text: any) => {
          console.log('Raw phone number:', text);
        }}
        textInputProps={{
          placeholder: 'Phone Number',
          keyboardType: 'phone-pad',
        }}
        countryPickerButtonStyle={styles.countryPickerButton}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(330),
    height: verticalScale(50),
    borderRadius: 6,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(15),
    gap: horizontalScale(10),
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontScale(15),
    color: 'black',
  },
  codeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontScale(15),
    color: 'black',
    paddingRight: horizontalScale(0),
  },
  countryPickerButton: {
    width: horizontalScale(50),
    height: verticalScale(50),
    left: horizontalScale(20),
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  flagButtonStyle: {
    width: horizontalScale(50),
    height: verticalScale(50),
    left: horizontalScale(20),
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
});

export default PhoneInputText;
