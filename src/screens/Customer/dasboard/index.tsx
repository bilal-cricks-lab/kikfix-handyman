import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { Bell, ArrowLeft } from 'lucide-react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/screenSize';
import IMAGES from '../../../constants/Images';
import { colors, typography } from '../../../design-system';
import ServiceCategoryStep from '../../../components/ServiceCategory';
import SpecificServiceStep from '../../../components/SpecificService';
import JobDetailsStep from '../../../components/JobDetails';
import LocationTimingStep from '../../../components/LocationTiming';
import ServiceProviders from '../../../components/ServiceProvider';
import BookingForm from '../../../components/BookingForm';
import { LocationData, TimingData } from '../../../types/LocationTimingProps';
import {
  getServiceCategory,
  getServiceList,
} from '../../../services/appServices/serviceCategory';

const FixedHeader = ({
  onBack,
  currentStep,
}: {
  onBack?: () => void;
  currentStep: number;
}) => {
  const steps = ['Service Category', 'Specific SubCat', 'Specific Service'];
  return (
    <View
      className=""
      style={{
        marginTop:
          Platform.OS === 'ios' ? verticalScale(60) : verticalScale(10),
      }}
    >
      {/* Top Navigation */}
      <View>
        <View className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center">
            <View
              className="items-center justify-center"
              style={{
                width: horizontalScale(70),
                height: verticalScale(30),
                backgroundColor: colors.secondary[50],
              }}
            >
              <Image
                source={IMAGES.logo}
                style={{
                  width: horizontalScale(70),
                  height: verticalScale(30),
                }}
              />
            </View>
          </View>
          <View className="flex-row items-center space-x-3 gap-4">
            <TouchableOpacity className="relative p-2">
              <Bell className="w-5 h-5" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white-50">3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="relative h-8 w-8 rounded-full">
              <Image
                source={{ uri: 'https://avatar.vercel.sh/demo@kikfix.com' }}
                className="h-8 w-8 rounded-full"
                alt="User"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row items-center py-6 px-6">
          {onBack && (
            <TouchableOpacity
              className="mr-3 w-8 h-8 items-center justify-center bg-gray-200 rounded-full"
              onPress={onBack}
            >
              <ArrowLeft size={15} />
            </TouchableOpacity>
          )}
          <Text style={typography.h3}>
            {currentStep === 4
              ? 'Location and Timing'
              : currentStep === 5
              ? 'Available Handyman'
              : currentStep === 6
              ? 'Booking Details'
              : 'Request a Service'}
          </Text>
        </View>
      </View>

      {/* Step Indicator */}
      {currentStep === 5 || currentStep === 6 ? null : (
        <View className="px-8 py-4">
          <View className="flex-row items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep - 1;
              const isActive = index === currentStep - 1;

              return (
                <View
                  key={index}
                  className="flex-row items-center justify-center"
                >
                  <View
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted || isActive ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Text className="text-white-50 font-medium">✓</Text>
                    ) : (
                      <Text
                        className={`text-sm font-medium ${
                          isActive ? 'text-white-50' : 'text-gray-500'
                        }`}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    className={`left-2 w-[58px] ${
                      isActive ? 'font-medium text-gray-900' : 'text-gray-500'
                    }`}
                    style={{ fontSize: fontScale(14) }}
                    numberOfLines={2}
                  >
                    {step}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};
type Category = {
  id: string | number;
  name: string;
  services: string;
  category_image: string;
};
type SpecificService = {
  id: string | number;
  name: string;
  price: number;
  duration: string;
  description: string;
};

// Main Component
const ServiceRequestScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedJobSize, setSelectedJobSize] = useState([]);
  const [categoryPageUrl, setCategoryPageUrl] = useState<string | null>(null);
  const [isLoadingMoreCategories, setIsLoadingMoreCategories] = useState(false);
  const [data, setData] = useState<Category[]>([]);
  const [timing, setTiming] = useState<TimingData>({
    date: new Date().toISOString(),
    timeSlot: '8-10',
    urgency: 'standard',
  });

  const [location, setLocation] = useState<LocationData>({
    address: '123 Main St, Springfield',
    latitude: 39.7817,
    longitude: -89.6501,
    type: 'home',
  });
  React.useEffect(() => {
    onGetCategory();
  }, []);

  const CatList = 'https://kikfix-com.stackstaging.com/api/get-category-list';

  const onGetCategory = async (url = CatList) => {
    if (isLoadingMoreCategories) return;

    setIsLoadingMoreCategories(true);
    try {
      const response = await getServiceCategory(url);
      setData(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = response.data.filter(
          (item: any) => !existingIds.has(item.id),
        );
        return [...prev, ...newItems];
      });
      setCategoryPageUrl(response.pagination?.next_page ?? null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMoreCategories(false);
    }
  };

  const handleLoadMoreCategories = () => {
    if (categoryPageUrl) {
      onGetCategory(categoryPageUrl);
    }
  };

  const onGetServiceList = async (id: string) => {
    const ServiceList = `https://kikfix-com.stackstaging.com/api/get-subcategory?id=${id}`;
    try {
      const result = await getServiceList(ServiceList);
      setSelectedCategory(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ServiceCategoryStep
            onNext={handleCategorySelect}
            categories={data}
            onLoadMore={handleLoadMoreCategories}
            isLoadingMore={isLoadingMoreCategories}
          />
        );
      case 2:
        return (
          <SpecificServiceStep
            category={selectedCategory}
            onBack={() => setStep(1)}
            onNext={handleServiceSelect}
          />
        );
      case 3:
        return (
          <JobDetailsStep
            service={selectedJobSize}
            onBack={() => setStep(2)}
            onNext={handleJobSizeSelect}
          />
        );
      // case 4:
      //   return (
      //     <LocationTimingStep
      //       jobSize={selectedJobSize}
      //       onBack={() => setStep(3)}
      //       onNext={handleLocationTimingSubmit}
      //     />
      //   );
      case 5:
        return (
          <ServiceProviders
            onBack={() => setStep(4)}
            serviceName={selectedService?.name || 'Plumbing'}
            timing={timing}
            location={location}
            onProviderSelect={() => {}}
            onNext={() => setStep(6)}
          />
        );
      case 6:
        return (
          <BookingForm
            onBack={() => setStep(6)}
            providerName="John Name"
            serviceName="Plumbing"
            timing={timing}
            location={location}
            onBookingComplete={() => []}
          />
        );
      default:
        return (
          <ServiceCategoryStep
            onNext={handleCategorySelect}
            categories={data}
            onLoadMore={handleLoadMoreCategories}
            isLoadingMore={isLoadingMoreCategories}
          />
        );
    }
  };

  const handleCategorySelect = async (selected: any) => {
    try {
      console.log(selected);
      onGetServiceList(selected);
      setStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  const handleServiceSelect = async (service: any) => {
    try {
      console.log(service);
      onGetServiceList(service);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobSizeSelect = (jobSize: any) => {
    setStep(4);
  };

  const handleLocationTimingSubmit = (data: any) => {
    // console.log('Form submitted:', {
    //   category: selectedCategory,
    //   service: selectedService,
    //   jobSize: selectedJobSize,
    //   ...data,
    // });
    // setTiming({
    //   date: data.date,
    //   timeSlot: data.timeSlot,
    //   urgency: data.urgency,
    // });
    // setLocation(data.location);
    // setStep(5);
  };

  return (
    <View className="flex-1 bg-white-50">
      <FixedHeader
        onBack={step > 1 ? () => setStep(step - 1) : undefined}
        currentStep={step}
      />
      {renderStep()}
    </View>
  );
};

export default ServiceRequestScreen;
