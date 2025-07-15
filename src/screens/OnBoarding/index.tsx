import { View, Text, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  LucideShield,
  LucideStar,
  LucideUsers,
  LucideWrench,
} from 'lucide-react-native';
import ServiceCard from '../../components/ServiceCard';
import { t } from 'i18next';
import { colors } from '../../design-system/colors';
import { typography } from '../../design-system/typography';
import { fontScale, verticalScale } from '../../utils/screenSize';
import FeatureItem from '../../components/FeatureItem';
import { NavigationProp } from '@react-navigation/native';
import StackParamList from '@/types/stack.types';

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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D1FAE5' }}>
      <ScrollView
        className="p-6"
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 0 : verticalScale(50),
        }}
      >
        {/* Logo Section */}
        <View className="items-center gap-4">
          <View
            className="w-20 h-20 bg-[#22c55e] rounded-3xl shadow-black-500 items-center justify-center"
            style={{
              shadowColor: 'grey',
              shadowOpacity: 0.8,
              shadowOffset: {
                width: 2,
                height: 2,
              },
              elevation: 10,
              shadowRadius: 10,
            }}
          >
            <Text className="text-3xl font-bold text-white-50">K</Text>
          </View>
          <Text
            className=" text-gray-900"
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: fontScale(24),
            }}
          >
            {t('onboarding.welcome')}
          </Text>
          <Text
            className="text-[18px] text-gray-600 text-center max-w-[320px]"
            style={typography.bodySmall}
          >
            {t('onboarding.choose')}
          </Text>
        </View>

        {/* Card Section */}
        <ServiceCard
          icon={<LucideUsers size={32} color="#2563eb" />}
          title={t('serviceCus.service')}
          description={t('serviceCus.find')}
          bullets={service_Text_Cus}
          buttonText="Continue as Customer"
          themeColor="#2563eb"
          onPress={() => {}}
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
