import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import IMAGES from '../../constants/Images';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../utils/screenSize';
import TEXT from '../../constants/Text';
import useInputText from '../../data/InputText';
import InputFields from '../../components/TextInput';
import CustomButton from '../../components/Button';

const SignUp = () => {
  const { input } = useInputText();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoTextPos}>
        <View style={styles.imagePos}>
          <Image source={IMAGES.logo} style={styles.imageStyle} />
        </View>
        <View style={styles.welcomePos}>
          <Text style={styles.welcomeTextStyle}>{TEXT.signUpText}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputFieldView}>
          {InputFields({ inputData: input })}
          <CustomButton
            title="Sign Up"
            style={styles.btnSignUp}
            onPress={() => {}}
            textStyle={styles.btnSignUpText}
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>{TEXT.alreadyHaveAccount}</Text>
        <Text
          // onPress={() => navigation.navigate('Login')}
          style={styles.footerLink}
        >
          {TEXT.signinText}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    marginTop: verticalScale(50),
  },
  inputFieldView: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    gap: verticalScale(25),
  },
  btnSignUp: {
    width: horizontalScale(330),
    height: verticalScale(50),
    backgroundColor: '#28A94D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSignUpText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: 'Poppins-SemiBold',
  },
  footerContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: horizontalScale(10),
    bottom: verticalScale(5),
  },
  footerText: {
    color: '#545454',
    fontSize: fontScale(15),
    fontFamily: 'Poppins-Regular',
  },
  footerLink: {
    color: '#1A693B',
    fontSize: fontScale(15),
    fontFamily: 'Poppins-Regular',
  },
});
