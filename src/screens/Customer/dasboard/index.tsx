import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {
  Bell,
  House,
  Sparkles,
  Car,
  Wrench,
  Navigation,
  ChevronDown,
  Clock,
  Droplets,
  Zap,
  Wind,
  ArrowLeft,
  Search,
  Building,
} from 'lucide-react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/screenSize';
import IMAGES from '../../../constants/Images';
import { colors, typography } from '../../../design-system';

// Fixed Header Component
const FixedHeader = ({
  onBack,
  currentStep,
}: {
  onBack?: () => void;
  currentStep: number;
}) => {
  const steps = ['Service Category', 'Specific Service', 'Job Details'];

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
          <Text style={typography.h3}>{currentStep === 4 ? 'Location and Timing' : 'Request a Service'}</Text>
        </View>
      </View>

      {/* Step Indicator */}
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
    </View>
  );
};

// Service Category Step
const ServiceCategoryStep = ({
  onNext,
}: {
  onNext: (category: any) => void;
}) => {
  const categories = [
    {
      id: 1,
      name: 'Home Repair & Maintenance',
      icon: House,
      servicesCount: '4 services',
    },
    {
      id: 2,
      name: 'Cleaning Services',
      icon: Sparkles,
      servicesCount: '3 services',
    },
    {
      id: 3,
      name: 'Auto Services',
      icon: Car,
      servicesCount: '12 services',
    },
    {
      id: 4,
      name: 'Home Improvement',
      icon: Wrench,
      servicesCount: '3 services',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Choose Service Category</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              className="w-full md:w-[48%] flex-row items-center gap-4 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-
              "
              onPress={() => onNext(category)}
            >
              <View className="p-3 bg-gray-200 rounded-lg">
                <category.icon className="w-6 h-6" />
              </View>
              <View>
                <Text className="font-medium">{category.name}</Text>
                <Text className="text-sm text-gray-500">
                  {category.servicesCount}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Specific Service Step
const SpecificServiceStep = ({
  category,
  onBack,
  onNext,
}: {
  category: any;
  onBack: () => void;
  onNext: (service: any) => void;
}) => {
  const services = [
    {
      id: 1,
      name: 'Plumbing Repair',
      icon: Droplets,
      description:
        'Professional plumbing services for leaks, clogs, and installations',
      price: '$50-80/hr',
      duration: '1-4 hours typical',
    },
    {
      id: 2,
      name: 'Electrical Work',
      icon: Zap,
      description:
        'Licensed electrical services for safe and reliable installations',
      price: '$60-90/hr',
      duration: '1-6 hours typical',
    },
    {
      id: 3,
      name: 'HVAC Service',
      icon: Wind,
      description:
        'Heating, ventilation, and air conditioning maintenance and repair',
      price: 'Quote based',
      duration: 'Project dependent',
    },
    {
      id: 4,
      name: 'General Repairs',
      icon: Wrench,
      description: 'Handyman services for various home maintenance needs',
      price: '$40-70/hr',
      duration: '1-8 hours typical',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Select Specific Service</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {services.map(service => (
            <TouchableOpacity
              key={service.id}
              className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
              onPress={() => onNext(service)}
            >
              <View className="flex-row items-center gap-3">
                <View className="p-2 bg-gray-200 rounded-lg">
                  <service.icon className="w-5 h-5" />
                </View>
                <Text className="font-medium">{service.name}</Text>
              </View>
              <Text className="text-sm text-gray-500">
                {service.description}
              </Text>
              <View className="flex-row items-center justify-between w-full mt-2">
                <View className="flex-col">
                  <Text className="font-medium">{service.price}</Text>
                  <Text className="text-xs text-gray-500">
                    {service.duration}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Job Details Step
const JobDetailsStep = ({
  service,
  onBack,
  onNext,
}: {
  service: any;
  onBack: () => void;
  onNext: (jobSize: any) => void;
}) => {
  const jobSizes = [
    {
      id: 1,
      name: 'Quick Fix',
      duration: '1-2 hours',
      description: 'Leaky faucet, clogged drain',
      tags: ['Minor repairs', 'Simple installations'],
    },
    {
      id: 2,
      name: 'Standard Repair',
      duration: '2-4 hours',
      description: 'Toilet repair, pipe replacement',
      tags: ['Standard repairs', 'Basic installations'],
    },
    {
      id: 3,
      name: 'Major Work',
      duration: '4-8 hours',
      description: 'Multiple fixtures, complex repairs',
      tags: ['Multiple repairs', 'Complex installations'],
    },
    {
      id: 4,
      name: 'Custom Hours',
      duration: 'custom hours',
      description: 'Set your own timeframe',
      tags: ['Project-specific', 'Custom requirements'],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="mb-6">
          <Text className="text-xl font-bold mb-2">Job Size</Text>
          <View className="text-sm text-gray-500">
            <Text>
              <Text className="font-bold">Service:</Text> {service.name}
            </Text>
            <Text>
              <Text className="font-bold">Rate:</Text> {service.price}
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-4">
          {jobSizes.map(jobSize => (
            <TouchableOpacity
              key={jobSize.id}
              className="w-full md:w-[48%] flex-col items-start gap-3 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
              onPress={() => onNext(jobSize)}
            >
              <View className="flex-row items-center justify-between w-full">
                <Text className="font-medium">{jobSize.name}</Text>
                <View className="flex-row items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <Text>{jobSize.duration}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-500">
                {jobSize.description}
              </Text>
              <View className="flex-row flex-wrap gap-1 mt-2">
                {jobSize.tags.map((tag, index) => (
                  <View
                    key={index}
                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    <Text className="text-xs">{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Location Timing Step
const LocationTimingStep = ({
  jobSize,
  onBack,
  onNext,
}: {
  jobSize: any;
  onBack: () => void;
  onNext: (data: any) => void;
}) => {
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [customAddress, setCustomAddress] = useState('');

  const locations = [
    {
      id: 1,
      name: 'Home',
      type: 'home',
      address: '123 Main St, Springfield, IL 62701',
    },
    {
      id: 2,
      name: 'Office',
      type: 'office',
      address: '456 Business Ave, Springfield, IL 62702',
    },
  ];

  const urgencyOptions = [
    {
      id: 'standard',
      name: 'Standard',
      timeframe: 'Within 1-2 days',
      color: 'bg-green-100',
      border: 'border-green-300',
    },
    {
      id: 'urgent',
      name: 'Urgent',
      timeframe: 'Today/Tomorrow',
      color: 'bg-orange-100',
      border: 'border-orange-300',
    },
    {
      id: 'emergency',
      name: 'Emergency',
      timeframe: 'ASAP',
      color: 'bg-red-100',
      border: 'border-red-300',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-col gap-6 rounded-xl border p-4 mb-6 bg-green-100 border-green-300">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-medium text-green-900">{jobSize.name}</Text>
              <Text className="text-sm text-green-700">
                {jobSize.description}
              </Text>
            </View>
            <View className="text-right">
              <Text className="text-sm text-green-700">Step 4 of 4</Text>
              <View className="w-16 h-1 bg-green-300 rounded-full mt-1">
                <View className="w-full h-full bg-green-700 rounded-full"></View>
              </View>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">
            How urgent is this service?
          </Text>
          <View className="flex-row flex-wrap justify-between gap-3">
            {urgencyOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                className={`w-full md:w-[30%] flex-col gap-2 rounded-xl border p-3 ${
                  option.color
                } ${option.border} ${
                  selectedUrgency === option.id
                    ? 'ring-2 ring-offset-2 ring-green-500'
                    : ''
                }`}
                onPress={() => setSelectedUrgency(option.id)}
              >
                <View className="text-center">
                  <Text className="font-medium text-sm">{option.name}</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {option.timeframe}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">Service Location</Text>
          <TouchableOpacity className="w-full mb-3 flex-row items-center gap-2 h-12 px-4 py-2 border border-gray-300 rounded-md bg-white">
            <Navigation className="w-4 h-4" />
            <Text>Use Current Location</Text>
          </TouchableOpacity>

          <View className="space-y-2 mb-4">
            {locations.map(loc => (
              <TouchableOpacity
                key={loc.id}
                className={`flex-row items-center gap-3 p-3 rounded-xl border ${
                  selectedLocation === loc.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white'
                }`}
                onPress={() => setSelectedLocation(loc.id)}
              >
                <View className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {loc.type === 'home' ? (
                    <House className="w-4 h-4" />
                  ) : (
                    <Building className="w-4 h-4" />
                  )}
                </View>
                <View>
                  <Text className="font-medium text-sm">{loc.name}</Text>
                  <Text className="text-xs text-gray-500">{loc.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="space-y-2">
            <Text className="text-sm font-medium">
              Or enter a different address
            </Text>
            <View className="flex-row gap-2">
              <TextInput
                className="flex-1 h-12 border border-gray-300 rounded-md px-3 py-1 bg-white"
                placeholder="Enter street address, city, state"
                value={customAddress}
                onChangeText={setCustomAddress}
              />
              <TouchableOpacity
                className="h-12 w-12 rounded-md border border-gray-300 flex items-center justify-center"
                disabled={!customAddress}
              >
                <Search className="w-4 h-4" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">Preferred Date</Text>
          <TouchableOpacity className="w-full flex-row items-center justify-between gap-2 h-12 px-3 py-2 border border-gray-300 rounded-md bg-white">
            <Text>Select a date</Text>
            <ChevronDown className="size-4 opacity-50" />
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <Text className="text-sm font-medium mb-3">Preferred Time</Text>
          <TouchableOpacity className="w-full flex-row items-center justify-between gap-2 h-12 px-3 py-2 border border-gray-300 rounded-md bg-white">
            <Text>Select a time slot</Text>
            <ChevronDown className="size-4 opacity-50" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="w-full h-12 px-4 py-2 bg-green-700 rounded-md flex-row items-center justify-center"
          disabled={!selectedUrgency || !(selectedLocation || customAddress)}
          onPress={() =>
            onNext({
              urgency: selectedUrgency,
              location: selectedLocation
                ? locations.find(l => l.id === selectedLocation)
                : customAddress,
              customAddress: customAddress,
            })
          }
        >
          <Text className="text-white font-medium">
            Find Available Handymen
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-gray-500 mt-3">
          We'll show you handymen available for your selected location and time.
        </Text>
      </View>
    </ScrollView>
  );
};

// Main Component
const ServiceRequestScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedJobSize, setSelectedJobSize] = useState<any>(null);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServiceCategoryStep onNext={handleCategorySelect} />;
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
            service={selectedService}
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
      default:
        return <ServiceCategoryStep onNext={handleCategorySelect} />;
    }
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setStep(3);
  };

  const handleJobSizeSelect = (jobSize: any) => {
    setSelectedJobSize(jobSize);
    setStep(4);
  };

  const handleLocationTimingSubmit = (data: any) => {
    console.log('Form submitted:', {
      category: selectedCategory,
      service: selectedService,
      jobSize: selectedJobSize,
      ...data,
    });
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
