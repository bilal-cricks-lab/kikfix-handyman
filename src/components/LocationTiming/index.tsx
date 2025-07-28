import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { addDays, isToday, isTomorrow, format } from 'date-fns';
import { Navigation, House, Building, Search } from 'lucide-react-native';
import Select from '../Dropdown';
import { colors, typography } from '../../design-system';
import { Dropdown } from 'react-native-element-dropdown';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

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
  const [value, setValue] = useState<string>('');

  const generateDates = () => {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);

      let label = format(date, 'EEE, MMM d'); // e.g., Wed, Jul 23
      if (isToday(date)) {
        label = 'Today';
      } else if (isTomorrow(date)) {
        label = 'Tomorrow';
      }

      dates.push({
        label,
        value: format(date, 'yyyy-MM-dd'),
      });
    }

    return dates;
  };

  const data = generateDates();

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

  const urgencyDropdownData = urgencyOptions.map(option => ({
    label: `${option.name} (${option.timeframe})`,
    value: option.id,
    name: option.name,
    timeframe: option.timeframe,
    color: option.color,
    border: option.border,
  }));

   const renderUrgencyItem = (item: any) => {
    return (
      <View className={`p-3 ${item.color} ${item.border} rounded-lg my-1`}>
        <Text style={{...typography.bodySmall}}>{item.name}</Text>
        <Text style={{...typography.bodyXs, color: colors.gray[500]}}>
          {item.timeframe}
        </Text>
      </View>
    );
  };
  
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
                className={`w-32 flex-row justify-center gap-2 rounded-xl border p-3 ${
                  option.color
                } ${option.border} ${
                  selectedUrgency === option.id
                    ? 'ring-2 ring-offset-2 ring-green-500'
                    : ''
                }`}
                // onPress={() => setSelectedUrgency(option.id)}
              >
                <View className="text-center">
                  <Text
                    style={{ ...typography.bodySmall, textAlign: 'center' }}
                  >
                    {option.name}
                  </Text>
                  <Text
                    style={{
                      ...typography.bodyXs,
                      color: colors.gray[500],
                      textAlign: 'center',
                    }}
                  >
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

          <View className="space-y-2 mb-6 gap-4">
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
          {/* <TouchableOpacity className="w-full flex-row items-center justify-between gap-2 h-12 px-3 py-2 border border-gray-300 rounded-md bg-white">
            <Text>Select a date</Text>
            <ChevronDown className="size-4 opacity-50" />
          </TouchableOpacity> */}
          <Select
            items={data}
            selectedValue={value}
            onValueChange={text => setValue(text)}
            placeholder="Select a date"
          />
        </View>

        <View className="mb-8">
          <Text className="text-sm font-medium mb-3">Preferred Time</Text>
          {/* <TouchableOpacity className="w-full flex-row items-center justify-between gap-2 h-12 px-3 py-2 border border-gray-300 rounded-md bg-white">
            <Text>Select a time slot</Text>
            <ChevronDown className="size-4 opacity-50" />
          </TouchableOpacity> */}

          <Select
            items={data}
            selectedValue={value}
            onValueChange={(text: string) => setValue(text)}
            placeholder="Select a date"
          />
        </View>

        <TouchableOpacity
          className="w-full h-12 px-4 py-2 bg-green-700 rounded-md flex-row items-center justify-center"
          disabled={false}
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
          <Text className="text-white-50 font-medium">
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

export default LocationTimingStep;
