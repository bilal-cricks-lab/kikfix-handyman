import React from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import StackParamList from '../../../types/stack.types';
import IMAGES from '../../../constants/Images';
import useInputText from '../../../data/InputText';
import InputFields from '../../../components/TextInput';
import CustomButton from '../../../components/Button';

// Import design system tokens
import { typography, colors, spacing } from '../../../design-system';

type NavigationProps = NativeStackNavigationProp<StackParamList, 'SignUp'>;

const SignUp = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();
  const { input } = useInputText();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ padding: spacing.lg }}>
        {/* Header Section */}
        <View className="items-center mb-12">
          <View className="mb-5">
            <Image source={IMAGES.logo} className="w-[170px] h-[71px]" />
          </View>
          <View className="items-center">
            <Text style={typography.body} className="text-black-300 text-center w-[300px]">
              {t('auth.signUpText')}
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View className="flex-1">
          <View className="items-center space-y-6">
            <InputFields inputData={input} />
            <CustomButton
              title={t('auth.signUpCon')}
              onPress={() => {}}
              style={{ backgroundColor: colors.primary[500], padding: spacing.lg }}
              textStyle={{ color: colors.white[500], ...typography.body }}
            />
          </View>
        </View>

        {/* Footer Section */}
        <View className="flex-row justify-center items-center space-x-2 mb-2">
          <Text style={typography.body} className="text-black-300">
            {t('auth.alreadyHaveAccount')}
          </Text>
          <Text style={typography.link} onPress={() => navigation.navigate('SignIn')} className="text-primary-500">
            {t('auth.signIn')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
