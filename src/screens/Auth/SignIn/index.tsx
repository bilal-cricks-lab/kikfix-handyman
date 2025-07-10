import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import IMAGES from '../../../constants/Images';
import TEXT from '../../../constants/Text';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/screenSize';
import InputFields from '../../../components/TextInput';
import useInputText from '../../../data/InputText';

const SignIn = () => {
  const { input } = useInputText();
  const filterInput = input.filter(
    item => item.id === 'EmailPhone' || item.id === 'Password',
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoTextPos}>
        <View style={styles.imagePos}>
          <Image source={IMAGES.logo} style={styles.imageStyle} />
        </View>
        <View style={styles.welcomePos}>
          <Text style={styles.welcomeTextStyle}>{TEXT.welcomeText}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputFieldView}>
          <InputFields inputData={filterInput} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoTextPos: {
    marginTop: verticalScale(50),
    gap: verticalScale(20),
  },
  imagePos: {
    alignItems: 'center',
  },
  imageStyle: {
    width: horizontalScale(170),
    height: verticalScale(71),
  },
  welcomePos: {
    alignItems: 'center',
  },
  welcomeTextStyle: {
    fontSize: fontScale(16),
    fontFamily: 'Poppins-Regular',
    color: '#545454',
    width: horizontalScale(300),
    textAlign: 'center',
  },
  formContainer: {
    marginTop: verticalScale(50)
  },
  inputFieldView: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    gap: verticalScale(35),
  },
});

export default SignIn;
