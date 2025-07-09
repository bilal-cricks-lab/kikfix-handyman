import React, { JSX } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import InputText from '../../types/input.types';
import { fontScale, horizontalScale, verticalScale } from '../../utils/screenSize';

interface InputFieldsProps {
  inputData: InputText[];
}

const InputFields = ({ inputData }: InputFieldsProps): JSX.Element[] => {
  return inputData.map(({ id, ref, keyboardType, nextRef }) => {
    //   const isFocused = focusedField === feild;
    return (
      <View key={id} style={{ position: 'relative' }}>
        <TextInput
          ref={ref}
          returnKeyType={
            id === 'Email Address'
              ? 'next'
              : id === 'Username'
              ? 'next'
              : 'done'
          }
          keyboardType={keyboardType || 'default'}
          style={[
            styles.inputText,
            //   {borderColor: isFocused ? '#33b056' : '#f0f0f0'},
          ]}
          // onChangeText={handleInputChange(feild)}
          placeholder={id}
          // value={
          //   feild === 'Email Address'
          //     ? email
          //     : feild === 'Username'
          //     ? displayName
          //     : password
          // }
          onSubmitEditing={() => nextRef?.current?.focus()}
          // placeholderTextColor={isFocused ? '#33b056' : '#d8d8d8'}
          // onFocus={() => handleFocus(feild)}
          // onBlur={handleBlur}
          secureTextEntry={id === 'Password'}
        />
        <View
          style={{
            position: 'absolute',
            left: horizontalScale(15),
            top: '25%',
          }}
        >
          {/* {getIcon(feild, isFocused)} */}
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
    color: '#D9D9D9',
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
