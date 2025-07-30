import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {
  LucideShield,
  LucideStar,
  LucideUsers,
  LucideWrench,
} from 'lucide-react-native';
import ServiceCard from '../../../components/ServiceCard';
import { t } from 'i18next';
import { colors } from '../../../design-system/colors';
import { typography } from '../../../design-system/typography';
import { horizontalScale, verticalScale } from '../../../utils/screenSize';
import FeatureItem from '../../../components/FeatureItem';
import LogoText from '../../../components/LogoText';
import { navigateToScreen } from '../../../utils/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import StackParamList from '../../../types/stack';
import IMAGES from '../../../constants/Images';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import React from 'react';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ENV from '../../../config/env';

Geocoder.init(ENV.KEY.API_KEY as string);

export default function OnBoarding() {
  const service_Provider = [
    `${t('serviceProv.receive')}`,
    `${t('serviceProv.set')}`,
    `${t('serviceProv.get')}`,
    `${t('serviceProv.build')}`,
  ];
  const service_Text_Prov = service_Provider.map(text => ({
    color: colors.secondary[500],
    text,
  }));
  const service_Cus = [
    `${t('serviceCus.browse')}`,
    `${t('serviceCus.get')}`,
    `${t('serviceCus.track')}`,
    `${t('serviceCus.rate')}`,
  ];
  const service_Text_Cus = service_Cus.map(text => ({
    color: colors.blue[50],
    text,
  }));

  React.useEffect(() => {
    onLocationTurnOn();
  }, []);

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const onLocationTurnOn = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'KikFix',
          message: 'KikFix wants to know your location',
          buttonNeutral: 'Ask Me Later',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            Geocoder.from(latitude, longitude)
              .then((json: any) => {
                const formatted_Address =
                  json.results[0]?.formatted_address || 'Unknown location';
                console.log(formatted_Address);
              })
              .catch((err: string) => console.log('Geocoding error:', err));
          },
          error => {
            console.log('Error getting location:', error.message);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }, // Prioritize speed
        );
      } else if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              Geocoder.from(latitude, longitude)
                .then((json: any) => {
                  const formatted_Address =
                    json.results[0]?.formatted_address || 'Unknown location';
                  console.log(formatted_Address);
                })
                .catch((err: string) => console.log('Geocoding error:', err));
                console.log(latitude, longitude);
            },
            error => {
              console.log('Error getting location:', error.message);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }, // Prioritize speed
          );
        }
      }
    } catch (error) {
      console.log('Permission error:', error);
    } finally {
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        className="p-6"
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 0 : verticalScale(50),
        }}
      >
        {/* Logo Section */}
        <LogoText
          imageBack={styles.imageView}
          title={t('onboarding.welcome')}
          subtitle={t('onboarding.choose')}
          logoSource={IMAGES.logo}
        />

        {/* Card Section */}
        <ServiceCard
          icon={<LucideUsers size={32} color="#2563eb" />}
          title={t('serviceCus.service')}
          description={t('serviceCus.find')}
          bullets={service_Text_Cus}
          buttonText="Continue as Customer"
          themeColor="#2563eb"
          onPress={() => navigateToScreen(navigation, 'SignIn')}
        />
        <ServiceCard
          icon={<LucideWrench size={32} color={colors.primary[400]} />}
          title={t('serviceProv.provide')}
          description={t('serviceProv.join')}
          bullets={service_Text_Prov}
          buttonText="Continue as Fixer"
          themeColor={colors.secondary[500]}
          onPress={() => navigateToScreen(navigation, 'SignIn')}
        />

        {/* Stats Section */}
        <View className="flex-row flex-wrap justify-between mt-12 gap-y-4">
          <FeatureItem
            Icon={LucideUsers}
            color="#4B5563"
            title="50K+"
            subtitle="Active Users"
          />
          <FeatureItem
            Icon={LucideWrench}
            color="#4B5563"
            title="10K+"
            subtitle="Verified Pros"
          />
          <FeatureItem
            Icon={LucideStar}
            color="#4B5563"
            title="4.9"
            subtitle="Average Rating"
          />
          <FeatureItem
            Icon={LucideShield}
            color="#4B5563"
            title="100%"
            subtitle="Secured"
          />
        </View>

        {/* Footer */}
        <View className="mt-10">
          <Text
            className="text-gray-500 text-center"
            style={typography.bodySmall}
          >
            {t('onboarding.trusted')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary[40],
  },
  imageView: {
    width: horizontalScale(200),
    height: verticalScale(70),
    backgroundColor: colors.secondary[50],
  },
  logo: {
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 10,
    shadowRadius: 10,
  },
});
