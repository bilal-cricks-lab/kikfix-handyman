import React, { useEffect } from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LucideWrench } from 'lucide-react-native';

import IMAGES from '../../constants/Images';
import { horizontalScale, verticalScale } from '../../utils/screenSize';
import StackParamList from '../../types/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../design-system/colors';
import { typography } from '../../design-system/typography';

type SplashScreenProps = NativeStackScreenProps<StackParamList, 'Splash'>;

const Splash: React.FC = () => {
  const navigation = useNavigation<SplashScreenProps['navigation']>();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem('user_token');
      if(token){
        navigation.navigate('Serv');
      }
      else{
        navigation.navigate('SignIn');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleContinueAsFixer = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={IMAGES.logo} style={styles.logo} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.iconContainer}>
            <LucideWrench size={48} color={colors.primary[400]} />
          </View>
          
          <Text style={styles.title}>I'm a Fixer</Text>
          <Text style={styles.subtitle}>I provide professional home services</Text>

          {/* Bullet Points */}
          <View style={styles.bulletPoints}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Find jobs in your area</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Set your own rates and schedule</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Get paid quickly and securely</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Build your reputation and reviews</Text>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinueAsFixer}
          >
            <Text style={styles.continueButtonText}>Continue as Fixer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(40),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(60),
  },
  logo: {
    width: horizontalScale(200),
    height: verticalScale(70),
    resizeMode: 'contain',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: horizontalScale(80),
    height: verticalScale(80),
    borderRadius: 40,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(24),
  },
  title: {
    ...typography.h2,
    color: colors.black[500],
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    ...typography.body,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: verticalScale(40),
  },
  bulletPoints: {
    width: '100%',
    marginBottom: verticalScale(48),
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(20),
  },
  bullet: {
    fontSize: 18,
    color: colors.primary[400],
    marginRight: horizontalScale(12),
    marginTop: 2,
  },
  bulletText: {
    ...typography.bodySmall,
    color: colors.gray[600],
    flex: 1,
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: colors.primary[400],
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(16),
    borderRadius: 12,
    minWidth: horizontalScale(200),
    alignItems: 'center',
  },
  continueButtonText: {
    ...typography.h5,
    color: colors.white[50],
    fontWeight: '600',
  },
});

export default Splash;
