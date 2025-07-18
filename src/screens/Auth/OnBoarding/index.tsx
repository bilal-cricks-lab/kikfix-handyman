import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { verticalScale } from '../../../utils/screenSize';
import FeatureItem from '../../../components/FeatureItem';
import { NavigationProp } from '@react-navigation/native';
import StackParamList from '@/types/stack';
import LogoText from '../../../components/LogoText';
import { useEffect, useState } from 'react';

// const useInitialURL = () => {
//   const [url, setUrl] = useState<string | null>(null);
//   const [processing, setProcessing] = useState(true);

//   useEffect(() => {
//     const getUrlAsync = async () => {
//       const initialUrl = await Linking.getInitialURL();

//       // The setTimeout is just for testing purpose
//       setTimeout(() => {
//         setUrl(initialUrl);
//         setProcessing(false);
//       }, 1000);
//     };

//     getUrlAsync();
//   }, []);

//   return { url, processing };
// };


export default function OnBoarding() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
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
  // const { url: initialUrl, processing } = useInitialURL();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D1FAE5' }}>
      <ScrollView
        className="p-6"
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 0 : verticalScale(50),
        }}
      >
        {/* Logo Section */}
        <LogoText
          customLogo={{
            shadowColor: 'grey',
            shadowOpacity: 0.8,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            elevation: 10,
            shadowRadius: 10,
          }}
          title={t('onboarding.welcome')}
          subtitle={t('onboarding.choose')}
          logoSource={0}
        />

        {/* <Text>
          {processing
            ? 'Processing the initial url from a deep link'
            : `The deep link is: ${initialUrl || 'None'}`}
        </Text> */}

        {/* Card Section */}
        <ServiceCard
          icon={<LucideUsers size={32} color="#2563eb" />}
          title={t('serviceCus.service')}
          description={t('serviceCus.find')}
          bullets={service_Text_Cus}
          buttonText="Continue as Customer"
          themeColor="#2563eb"
          onPress={() => navigation.navigate('SignIn')}
        />
        <ServiceCard
          icon={<LucideWrench size={32} color={colors.primary[400]} />}
          title={t('serviceProv.provide')}
          description={t('serviceProv.join')}
          bullets={service_Text_Prov}
          buttonText="Continue as Handyman"
          themeColor={colors.secondary[500]}
          onPress={() => navigation.navigate('SignIn')}
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
