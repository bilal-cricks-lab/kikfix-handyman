import { horizontalScale, verticalScale } from '../../../utils/screenSize';
import IMAGES from '../../../constants/Images';
import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { colors, typography } from '../../../design-system';
import InputFields from '../../../components/TextInput';
import useInputText from '../../../data/InputText';
import CustomButton from '../../../components/Button';
import { t } from 'i18next';
import LogoText from '../../../components/LogoText';
import { Login, Register } from '../../../services/authServices';
import Toast from '../../../components/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '../../../redux/Reducers/userSlice';
import { Store } from '../../../redux/Store/store';
import { navigateToScreen } from '../../../utils/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import { setRegData } from '../../../redux/Reducers/regSlice';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
  });
  const { inputSignin, inputSignUp, formValue } = useInputText();
  const [loading, setLoading] = useState<boolean>(false);
  const { email, password } = formValue.state;
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning',
  ) => {
    setToast({ visible: true, message, type });
  };

  const onLogin = async () => {
    if (!email || !password) {
      showToast('Email and password are required.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setLoading(true);
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await Login(data);
      if (response.data.user_type === 'user') {
        AsyncStorage.setItem('user_token', response.data.api_token);
        showToast('LoggedIn Successfully', 'success')
        setTimeout(() => {
          navigateToScreen(navigation, 'Cust');
        }, 2000);
      }
      Store.dispatch(
        setUserData({
          username: response.data.username,
          id: response.data.id,
          email: response.data.email,
          status: response.data.status,
          last_notification_seen: null,
          uid: null,
          social_image: response.data.profile_image,
          user_type: response.data.user_type,
        }),
      );
      setLoading(false);
      return response;
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        'Something Went Wrong. Please try Again Later';
      if (error?.response?.data?.is_verfied === 0) {
        setTimeout(() => {
          navigateToScreen(navigation, 'Otp')
        }, 2000);
      }
      setLoading(false);
      showToast(errMsg, 'error');
    }
  };

  const isRegisterFormValid = () => {
    return (
      formValue.state.username &&
      formValue.state.regEmail &&
      formValue.state.regPassword &&
      formValue.state.confirmPassword &&
      formValue.state.phoneNumber &&
      formValue.state.regPassword === formValue.state.confirmPassword
    );
  };

  const onSignUp = async () => {
    if (!formValue.state.username) {
      showToast('The Username is Required', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValue.state.regEmail)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (!formValue.state.regPassword) {
      showToast('The Password field is Required', 'error');
      return;
    }
    if (!formValue.state.confirmPassword) {
      showToast('Please ReEnter Your Password', 'error');
      return;
    }
    if (!formValue.state.phoneNumber) {
      showToast('The Phone Number field is Required', 'error');
      return;
    }

    const data = {
      first_name: formValue.state.fullName,
      last_name: formValue.state.lastName,
      email: formValue.state.regEmail,
      password: formValue.state.regPassword,
      username: formValue.state.username,
      contact_number: formValue.state.phoneNumber,
      confirmPassword: formValue.state.confirmPassword,
    };

    console.log(data);
    setLoading(true);
    try {
      console.log(data);
      const response = await Register(data);
      if (response) {
        showToast('Account Created Successfully', 'success');
        setTimeout(() => {
          navigateToScreen(navigation, 'Otp');
        }, 2000);
        console.log(response.data);
      }
      Store.dispatch(
        setRegData({
          id: 0,
          email: formValue.state.regEmail,
        }),
      );
      setLoading(false);
      return;
    } catch (error: any) {
      setLoading(false);
      const errMsg = error?.response?.data?.message || 'Something went wrong';
      showToast(errMsg, 'error');
    }
  };

  return (
    <SafeAreaView className="flex-1" style={styles.container}>
      <ScrollView>
        <View className="w-full max-w-md bg-white p-8 shadow-sm">
          {/* Logo + Title */}
          <LogoText
            imageBack={styles.imageView}
            logoSource={IMAGES.logo}
            title={t('onboarding.welcome')}
            subtitle={t('auth.yourTrusted')}
          />

          {/* Tabs */}
          <View
            className="flex-row rounded-3xl p-1 mt-6"
            style={{
              backgroundColor: colors.gray[100],
            }}
          >
            {['login', 'register'].map((tab, index) => (
              <CustomButton
                key={tab}
                id={index}
                onPress={() => setActiveTab(tab as 'login' | 'register')}
                className={`flex-1 py-2 rounded-2xl ${
                  activeTab === tab ? 'bg-white-50' : ''
                }`}
                textStyle={{ ...typography.bodySmall }}
                title={tab === 'login' ? t('auth.signIn') : t('auth.signUp')}
                classNameText={`text-center`}
              />
            ))}
          </View>

          {/* Form */}
          {activeTab === 'login' ? (
            <View className="space-y-4">
              <View className="mt-8">
                <InputFields inputData={inputSignin} />
              </View>
              <CustomButton
                className="rounded-md py-2 mt-10 h-12 items-center justify-center"
                style={{
                  backgroundColor: loading
                    ? colors.secondary[400]
                    : colors.primary[40],
                }}
                title={loading ? 'Logging....' : t('auth.signIn')}
                textStyle={{ ...typography.h5, color: colors.white[50] }}
                onPress={onLogin}
              />
            </View>
          ) : (
            <View className="space-y-4 mt-4">
              <View>
                <InputFields inputData={inputSignUp} />
              </View>
              <CustomButton
                className="rounded-md py-2 mt-10 h-12 items-center justify-center"
                style={{
                  backgroundColor: isRegisterFormValid()
                    ? colors.primary[40]
                    : colors.secondary[300],
                  opacity: isRegisterFormValid() ? 1 : 0.7,
                }}
                title={loading ? 'Creating....' : t('auth.signUp')}
                textStyle={{ ...typography.h5, color: colors.white[50] }}
                onPress={onSignUp}
                disabled={!isRegisterFormValid() || loading}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {toast && (
        <Toast
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
          message={toast.message}
          visible={toast.visible}
          type={toast.type}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white[50],
  },
  imageView: {
    width: horizontalScale(200),
    height: verticalScale(70),
    backgroundColor: colors.secondary[50],
  },
  imageStyle: {
    width: horizontalScale(180),
    height: verticalScale(60),
  },
});
