import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { PhoneInput, PhoneInputRef } from 'rn-phone-input-field';
import InputText from '../../types/input';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../utils/screenSize';
import { colors, typography } from '../../design-system';

interface InputFieldsProps {
  inputData: InputText[];
}

const InputFields = ({ inputData }: InputFieldsProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const phoneInputRef = useRef<PhoneInputRef>(null);

  const returnKeyTypes: Record<string, 'next' | 'done'> = {
    'Full Name': 'next',
    Email: 'next',
    Password: 'next',
    'Confirm Password': 'done',
  };

  const secureFields = ['password', 'confirm password'];

  return inputData.map(
    ({ id, ref, keyboardType, nextRef, placeHolder, value, onChangeText }) => {
      if (id.toLowerCase() === 'phone number') {
        return (
          <View key={id} style={{ marginBottom: verticalScale(0) }}>
            <Text style={[typography.h6, { marginBottom: verticalScale(5) }]}>
              {id}
            </Text>
            <PhoneInput
              ref={phoneInputRef}
              value={value}
              onChangeText={onChangeText}
              flagButtonStyle={styles.flagButtonStyle}
              containerStyle={[
                styles.inputText,
                focusedInput === id && styles.focusedInput,
              ]}
              textContainerStyle={styles.textContainer}
              textInputStyle={styles.textInput}
              codeTextStyle={styles.codeText}
              placeholder={'Enter phone number'}
              textInputProps={{
                keyboardType: 'phone-pad',
                onFocus: () => setFocusedInput(id),
                onBlur: () => setFocusedInput(null),
              }}
              countryPickerButtonStyle={styles.countryPickerButton}
            />
          </View>
        );
      }

      return (
        <View key={id} style={{ marginBottom: verticalScale(10) }}>
          <Text style={{ ...typography.h6, marginBottom: verticalScale(5) }}>
            {id}
          </Text>
          <TextInput
            ref={ref as React.RefObject<TextInput>}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeHolder}
            returnKeyType={returnKeyTypes[id]}
            secureTextEntry={secureFields.includes(id)}
            placeholderTextColor={'grey'}
            style={[
              styles.inputText,
              focusedInput === id && styles.focusedInput,
            ]}
            onFocus={() => setFocusedInput(id)}
            onBlur={() => setFocusedInput(null)}
            onSubmitEditing={() => {
              if (nextRef?.current) {
                nextRef.current.focus();
              }
            }}
          />
        </View>
      );
    },
  );
};

const styles = StyleSheet.create({
  inputText: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    paddingLeft: horizontalScale(18),
    fontSize: fontScale(14),
    borderColor: '#D9D9D9',
    backgroundColor: '#F3F3F5',
    borderRadius: 10,
    width: horizontalScale(355),
  },
  focusedInput: {
    borderColor: colors.primary[40],
    borderWidth: 1.5,
  },
  textContainer: {
    backgroundColor: '#F3F3F5',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(10),
  },
  textInput: {
    fontSize: fontScale(15),
    color: 'black',
  },
  codeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontScale(15),
    color: 'black',
    paddingRight: horizontalScale(5),
  },
  countryPickerButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  flagButtonStyle: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default InputFields;
