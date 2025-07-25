import React, { JSX } from 'react';
import { View, TextInput, StyleSheet, Image, Text } from 'react-native';
import InputText from '../../types/input';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../utils/screenSize';
import { typography } from '../../design-system';

interface InputFieldsProps {
  inputData: InputText[];
}

const InputFields = ({ inputData }: InputFieldsProps): JSX.Element[] => {
  const returnKeyTypes: Record<string, 'next' | 'done'> = {
    'Full Name': 'next',
    'Email': 'next',
    'Password': 'next',
    'Confirm Password': 'done',
  };
  return inputData.map(
    ({ id, ref, keyboardType, nextRef, placeHolder, value, onChangeText }) => {
      return (
        <View key={id}>
          <View style={{ gap: verticalScale(10) }}>
            <Text style={{ ...typography.h6, top: verticalScale(10) }}>
              {id}
            </Text>
            <TextInput
              ref={ref as React.RefObject<TextInput>}
              returnKeyType={returnKeyTypes[id] || 'done'}
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor={'grey'}
              keyboardType={keyboardType}
              style={[styles.inputText]}
              placeholder={placeHolder}
              onSubmitEditing={() => {
                if (nextRef?.current) {
                  nextRef.current.focus();
                }
              }}
              secureTextEntry={id === 'password'}
            />
          </View>
        </View>
      );
    },
  );
};

const styles = StyleSheet.create({
  inputText: {
    paddingLeft: horizontalScale(18),
    fontSize: fontScale(14),
    color: 'black',
    width: horizontalScale(355),
    height: verticalScale(45),
    borderColor: '#D9D9D9',
    backgroundColor: '#F3F3F5',
    borderRadius: 10,
  },
});

export default InputFields;
