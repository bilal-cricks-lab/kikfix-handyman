import React, { JSX } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import InputText from '../../types/input.types';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../utils/screenSize';
import PhoneInputText from '../PhoneInput';
import { getIcon } from '../../utils/icons';
import phoneInput from 'rn-phone-input-field';

interface InputFieldsProps {
  inputData: InputText[];
}

const InputFields = ({ inputData }: InputFieldsProps): JSX.Element[] => {
  return inputData.map(({ id, ref, keyboardType, nextRef }) => {
    if (id === 'PhoneNumber') {
      return (
        <View key={id}>
          <PhoneInputText
            onChange={val => {}}
            ref={ref as React.RefObject<phoneInput.PhoneInputRef>}
            value=""
          />
        </View>
      );
    }
    return (
      <View key={id} style={{ position: 'relative' }}>
        <TextInput
          ref={ref as React.RefObject<TextInput>}
          returnKeyType={
            id === 'FullName'
              ? 'next'
              : id === 'EmailPhone'
              ? 'next'
              : id === 'Password'
              ? 'next'
              : 'done'
          }
          placeholderTextColor={'#D9D9D9'}
          keyboardType={keyboardType}
          style={[styles.inputText]}
          placeholder={id}
          onSubmitEditing={() => {
            if (nextRef?.current && nextRef?.current.focus) {
              nextRef.current.focus();
            }
          }}
          secureTextEntry={id === 'Password'}
        />
        <View
          style={{
            position: 'absolute',
            right: horizontalScale(20),
            top: '35%',
          }}
        >
          <Image
            source={getIcon(id)}
            style={{ tintColor: 'black' }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  inputText: {
    padding: verticalScale(10),
    paddingLeft: horizontalScale(18),
    fontFamily: 'Poppins-Regular',
    lineHeight: verticalScale(25),
    fontSize: fontScale(15),
    color: 'black',
    width: horizontalScale(330),
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    borderRadius: 6,
    textAlignVertical: 'center',
  },
});

export default InputFields;
