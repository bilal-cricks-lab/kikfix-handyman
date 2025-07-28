import React, { useState } from 'react';
import { View } from 'react-native';
import ServiceCategoryStep from '../../../components/ServiceCategory';
import SpecificServiceStep from '../../../components/SubCategory';
import LocationTimingStep from '../../../components/LocationTiming';
import ServiceProviders from '../../../components/ServiceProvider';
import BookingForm from '../../../components/BookingForm';
import { LocationData, TimingData } from '../../../types/LocationTimingProps';
import {
  getServiceCategory,
  getServiceList,
  getSpecificService,
} from '../../../services/appServices/serviceCategory';
import FixedHeader from '../../../components/Header';
import { Category, SpecificService, Subcategory } from '../../../types/service';
import { useSelector } from 'react-redux';
import { RootSate } from '@/redux/Store/store';
import SpecificServices from '../../../components/SpecificService';

// Main Component
const ServiceRequestScreen = () => {
  const [step, setStep] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedService, setSelectedService] = useState<number>(0);
  const [selectedJobSize, setSelectedJobSize] = useState<SpecificService[]>([]);
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
  const userState = useSelector((state: RootSate) => state.user.user);
  React.useEffect(() => {
    onGetCategory();
  }, []);

  const onGetCategory = async () => {
    if (isLoadingMoreCategories) return;

    setIsLoadingMoreCategories(true);
    try {
      const response = await getServiceCategory();
      setData(prev => {
        // Ensure prev is an array (default to empty array if undefined)
        const safePrev = Array.isArray(prev) ? prev : [];
        const existingIds = new Set(safePrev.map(item => item?.id)); // Optional chaining for item.id

        // Ensure response.data is an array before filtering
        const newData = Array.isArray(response?.data) ? response.data : [];

        const newItems = newData.filter(
          (item: any) => item?.id && !existingIds.has(item.id), // Optional chaining for item.id
        );

        return [...safePrev, ...newItems];
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
      onGetCategory();
    }
  };

  const onGetServiceList = async (id: number) => {
    try {
      const result = await getServiceList(id);
      const subcategories = result.data;
      setSelectedCategory(subcategories);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSpecificServices = async (
    id: number,
    per_page?: string | number,
    page?: number | string,
  ) => {
    try {
      const result = await getSpecificService(id);
      const services = result.data;
      setSelectedJobSize(services);
      return result.data;
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
          <SpecificServices
            selectedSubcategoryId={selectedService}
            services={selectedJobSize}
            onBack={() => setStep(2)}
            onNext={handleJobSizeSelect}
          />
        );
      case 4:
        return (
          <LocationTimingStep
            jobSize={selectedJobSize}
            onBack={() => setStep(3)}
            onNext={handleLocationTimingSubmit}
          />
        );
      case 5:
        return (
          <ServiceProviders
            onBack={() => setStep(4)}
            serviceName={'Plumbing'}
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
      onGetServiceList(selected);
      console.log(selected);
      setStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  const handleServiceSelect = async (service: any) => {
    try {
      getSpecificServices(service);
      setSelectedService(service);
      console.log(service);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobSizeSelect = (jobSize: any) => {
    console.log(jobSize);
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
    setStep(5);
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
