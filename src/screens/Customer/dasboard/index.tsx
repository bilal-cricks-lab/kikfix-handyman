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
  saveBookingsData,
  ServiceList,
} from '../../../services/appServices/serviceCategory';
import FixedHeader from '../../../components/Header';
import { Category, SpecificService, Subcategory } from '../../../types/service';
import SpecificServices from '../../../components/SpecificService';
import JobDetailsStep from '../../../components/JobDetails';
import { useSelector } from 'react-redux';
import { RootSate } from '../../../redux/Store/store';
import { t } from 'i18next';

// Main Component
const ServiceRequestScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedService, setSelectedService] = useState<number>(0);
  const [selectedJobSize, setSelectedJobSize] = useState<SpecificService[]>([]);
  const [categoryPageUrl, setCategoryPageUrl] = useState<string | null>(null);
  const [isLoadingMoreCategories, setIsLoadingMoreCategories] = useState(false);
  const [services, setServices] = useState([]);
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

  const user_data = useSelector((state: RootSate) => state.booking.booking);
  React.useEffect(() => {
    onGetCategory();
    console.log(user_data);
  }, []);

  const onGetCategory = async () => {
    if (isLoadingMoreCategories) return;

    setIsLoadingMoreCategories(true);
    try {
      const response = await getServiceCategory();
      setData(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        const existingIds = new Set(safePrev.map(item => item?.id));
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

  const getServiceLists = async (id: number) => {
    try {
      const result = await ServiceList(id);
      const services = result.data;
      setServices(services);
      console.log(services);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const bookingComplete = async () => {
    const data = {
      fixer_id: user_data?.fixer_id,
      category_id: 9,
      subcategory_id: 1,
      service_id: 11,
      service_detail_id: 1,
      date: '25-07-2025',
      time: '18:00',
      address: 'H4 himilton',
    };
    try {
      const response = await saveBookingsData(data);
      if(response){
        console.log("Your Booking Data", response.data)
      }
      const result = response.data
      return result;
    } catch (error: any) {
      console.error(error.response.data.message);
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
          <JobDetailsStep
            onBack={() => {}}
            onNext={handleJobSize}
            service={services}
          />
        );
      case 5:
        return (
          <LocationTimingStep
            jobSize={selectedJobSize}
            onBack={() => setStep(3)}
            onNext={handleLocationTimingSubmit}
          />
        );
      case 6:
        return (
          <ServiceProviders
            onBack={() => setStep(4)}
            serviceName={'Plumbing'}
            timing={timing}
            location={location}
            onProviderSelect={() => {}}
            onNext={() => setStep(7)}
          />
        );
      case 7:
        return (
          <BookingForm
            onBack={() => setStep(6)}
            providerName="John Name"
            serviceName="Plumbing"
            timing={timing}
            location={location}
            onBookingComplete={bookingComplete}
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
    getServiceLists(jobSize);
    const selectedService = selectedJobSize.find(
      (item: SpecificService) => item.id === jobSize,
    );
    if (selectedService?.job_size === true) {
      setStep(4);
    } else {
      setStep(5);
    }
  };

  const handleJobSize = (id: any) => {
    console.log(id);
    setStep(5);
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
    setStep(6);
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
