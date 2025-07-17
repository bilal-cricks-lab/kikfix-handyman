import { horizontalScale, verticalScale } from '../../../utils/screenSize';
import IMAGES from '../../../constants/Images';
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors, typography } from '../../../design-system';
import InputFields from '../../../components/TextInput';
import useInputText from '../../../data/InputText';
import CustomButton from '../../../components/Button';
import { t } from 'i18next';
import LogoText from '../../../components/LogoText';
import { NavigationProp } from '@react-navigation/native';
import StackParamList from '@/types/stack';
import { useNavigation } from '@react-navigation/native';
import { Login } from '../../../services/authServices';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const { input, formValue } = useInputText();
  const filterInput = input.filter(
    item => item.id === 'Email' || item.id === 'Password',
  );
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const onLogin = async () => {
    setLoading(true);
    try {
      const data = {
        email: formValue.email,
        password: formValue.password,
      };
      const response = await Login(data);
      console.log(response);
      response.data.user_type === 'user'
        ? navigation.navigate('Cust')
        : navigation.navigate('Serv');
      setLoading(false);
    } catch (error: any) {
      console.error('Login Error:');
      setLoading(false);
      Alert.alert('Login Error:', error.message);
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
          <View className="flex-row bg-gray-100 rounded-3xl p-1 mt-6">
            {['login', 'register'].map(tab => (
              <CustomButton
                key={tab}
                onPress={() => setActiveTab(tab as 'login' | 'register')}
                className={`flex-1 py-2 rounded-2xl ${
                  activeTab === tab ? 'bg-white-50' : ''
                }`}
                title={tab === 'login' ? t('auth.signIn') : t('auth.signUp')}
                classNameText={`text-center text-sm font-medium ${
                  activeTab === tab ? 'text-black' : 'text-black'
                }`}
              />
            ))}
          </View>

          {/* Form */}
          {activeTab === 'login' ? (
            <View className="space-y-4">
              <View className="mt-8">
                <InputFields inputData={filterInput} />
              </View>
              <CustomButton
                className="rounded-md py-2 mt-10 h-12 items-center justify-center"
                style={{
                  backgroundColor: loading
                    ? colors.secondary[50]
                    : colors.secondary[400],
                }}
                title={loading ? 'Logging....' : t('auth.signIn')}
                textStyle={{ ...typography.h5, color: colors.white[50] }}
                onPress={onLogin}
              />
            </View>
          ) : (
            <View className="space-y-4 mt-4">
              <View>
                <InputFields inputData={input} />
              </View>
              <CustomButton
                className="rounded-md py-2 mt-10 h-12 items-center justify-center"
                style={{ backgroundColor: colors.primary[40] }}
                title={t('auth.signUp')}
                textStyle={{ ...typography.h5, color: colors.white[50] }}
                onPress={() => {}}
              />
            </View>
          )}

          {/* OR Divider */}
          <View className="my-6 flex-row items-center">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="px-2 text-xs text-gray-500 uppercase">Or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Continue as Guest */}
          <CustomButton
            className="border rounded-md py-2 h-12 items-center justify-center"
            title="Continue as Guest"
            classNameText="text-center text-gray-700 font-medium"
            onPress={() => navigation.navigate('Cust')}
          />
        </View>
      </ScrollView>
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