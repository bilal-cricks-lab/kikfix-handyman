import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { addDays, isToday, isTomorrow, format } from 'date-fns';
import { Navigation } from 'lucide-react-native';
import Select from '../Dropdown';
import { colors, typography } from '../../design-system';
import { useSelector } from 'react-redux';
import { RootSate } from '../../redux/Store/store';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../utils/screenSize';
import ENV from '../../config/env';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { request, RESULTS, PERMISSIONS } from 'react-native-permissions';

Geocoder.init(ENV.KEY.API_KEY as string);

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
  const [selectedLocation, setSelectedLocation] = useState<number | string>();
  const [customAddress, setCustomAddress] = useState('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const user_data = useSelector((state: RootSate) => state.booking.booking);

  React.useEffect(() => {
    console.log(user_data);
  }, []);

  const generateDates = () => {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);

      let label = format(date, 'EEE, MMM d');
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

  const urgencyOptions = [
    {
      id: 'standard',
      name: 'Standard',
      timeframe: '1-2 days',
      color: 'bg-white-100',
      border: 'border-gray-300',
    },
    {
      id: 'urgent',
      name: 'Urgent',
      timeframe: 'Today',
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

  const timings = [
    {
      label: '8:00 - 10AM',
      value: '1',
    },
    {
      label: '12:00 - 2PM',
      value: '2',
    },
    {
      label: '4:00 - 6PM',
      value: '3',
    },
    {
      label: '8:00 - 10AM',
      value: '4',
    },
  ];

  const urgentTimings = [
    {
      label: 'Within 4 Hours',
      value: '1',
    },
    {
      label: 'This Evening (6 - 9PM)',
      value: '2',
    },
    {
      label: 'Tommorrow Morning (8 - 12PM)',
      value: '3',
    },
  ];

  const onLocationTurnOn = async () => {
    setLoading(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'KikFixHandyman',
          message: 'KikFixHandyman wants to know your location',
          buttonNeutral: 'Ask Me Later',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const convert_Addresses = `${latitude} ${longitude}`;
            setCustomAddress(convert_Addresses);
            Geocoder.from(latitude, longitude)
              .then((json: any) => {
                const formatted_Address =
                  json.results[0]?.formatted_address || 'Unknown location';
                console.log(formatted_Address);
                setCustomAddress(`${latitude},${longitude}`); // optional
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
                  setCustomAddress(formatted_Address);
                  setSelectedLocation('');
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
      setLoading(false);
    } catch (error) {
      console.log('Permission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-col gap-6 rounded-xl border p-4 mb-6 bg-green-100 border-green-300">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-medium text-green-900">
                {user_data?.name}
              </Text>
              <Text className="text-sm text-green-700">{user_data?.serve}</Text>
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
            {urgencyOptions.map(option => {
              const isSelected = selectedUrgency === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  className={`w-32 flex-row justify-center gap-2 rounded-xl border p-3 ${isSelected
                      ? 'bg-green-200 border-green-500'
                      : `${option.color} ${option.border}`
                    }`}
                  onPress={() => setSelectedUrgency(option.id)}
                >
                  <View className="text-center">
                    <Text
                      style={{
                        ...typography.bodySmall,
                        textAlign: 'center',
                        color: isSelected
                          ? colors.primary[900]
                          : colors.white[900],
                      }}
                    >
                      {option.name}
                    </Text>
                    <Text
                      style={{
                        ...typography.bodyXs,
                        textAlign: 'center',
                        color: isSelected
                          ? colors.primary[800]
                          : colors.gray[500],
                      }}
                    >
                      {option.timeframe}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="">
          <Text className="text-sm font-medium mb-3">Service Location</Text>
          <TouchableOpacity
            onPress={onLocationTurnOn}
            className="w-full mb-3 flex-row items-center gap-2 h-12 px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <Navigation className="w-4 h-4" />
            <Text>{loading ? 'Getting Location...' : 'Current Location'}</Text>
          </TouchableOpacity>

          <View className="mt-2">
            <Text className="text-sm font-medium">
              Enter a different address
            </Text>
            <View className="flex-row">
              <View
                style={{
                  marginTop: verticalScale(5),
                  zIndex: 1,
                  flex: 1,
                }}
              >
                <GooglePlacesAutocomplete
                  placeholder="Enter Street Address, city, state"
                  query={{
                    key: ENV.KEY.API_KEY, // REPLACE WITH YOUR ACTUAL API KEY
                    language: 'en',
                    types: 'geocode',
                  }}
                  // All other default props explicitly defined
                  autoFillOnNotFound={false}
                  currentLocation={false}
                  currentLocationLabel="Current location"
                  debounce={0}
                  disableScroll={false}
                  enableHighAccuracyLocation={true}
                  enablePoweredByContainer={true}
                  fetchDetails={true}
                  filterReverseGeocodingByTypes={[]}
                  GooglePlacesDetailsQuery={{}}
                  GooglePlacesSearchQuery={{
                    rankby: 'distance',
                  }}
                  GoogleReverseGeocodingQuery={{}}
                  isRowScrollable={true}
                  keyboardShouldPersistTaps="always"
                  listUnderlayColor="#c8c7cc"
                  listViewDisplayed="auto"
                  keepResultsAfterBlur={false}
                  minLength={1}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  numberOfLines={1}
                  onFail={() => { }}
                  onNotFound={() => { }}
                  onPress={(data, details) => {
                    console.log(data, details);
                    const location_Get = details;
                    setSelectedLocation(location_Get?.formatted_address);
                    setCustomAddress('');
                  }}
                  onTimeout={() =>
                    console.warn('google places autocomplete: request timeout')
                  }
                  predefinedPlaces={[]}
                  predefinedPlacesAlwaysVisible={false}
                  styles={{
                    container: styles.addressContainer,
                    textInput: styles.inputText,
                  }}
                  suppressDefaultStyles={false}
                  textInputHide={false}
                  textInputProps={{}}
                  timeout={20000}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="flex-col mb-4 mt-2">
          <Text className="text-sm font-medium">Preferred Date</Text>
          <Select
            items={data}
            selectedValue={date}
            onValueChange={text => setDate(text)}
            placeholder="Select a date"
          />
        </View>
        <View className="mb-8">
          <Text className="text-sm font-medium">Preferred Time</Text>
          <Select
            items={
              selectedUrgency === 'standard'
                ? timings
                : selectedUrgency === 'urgent'
                  ? urgentTimings
                  : timings
            }
            selectedValue={time}
            onValueChange={(text: string) => setTime(text)}
            placeholder="Select a time Slot"
          />
        </View>
        {(customAddress || selectedLocation) &&
          selectedUrgency &&
          date &&
          time && (
            <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <View className="flex-row items-center mb-3">
                <Navigation size={16} color={colors.primary[600]} />
                <Text className="ml-2 font-medium text-blue-900">
                  Service Summary
                </Text>
              </View>

              <Text style={{ ...typography.bodySmall }}>
                <Text style={{ fontWeight: '600' }}>Location: </Text>
                {customAddress || selectedLocation}
              </Text>

              <Text style={{ ...typography.bodySmall, marginTop: 4 }}>
                <Text style={{ fontWeight: '600' }}>Date: </Text>
                {data.find(d => d.value === date)?.label || '—'}
              </Text>

              <Text style={{ ...typography.bodySmall, marginTop: 4 }}>
                <Text style={{ fontWeight: '600' }}>Time: </Text>
                {time}
              </Text>

              <Text style={{ ...typography.bodySmall, marginTop: 4 }}>
                <Text style={{ fontWeight: '600' }}>Urgency: </Text>
                {urgencyOptions.find(opt => opt.id === selectedUrgency)?.name ??
                  selectedUrgency}
              </Text>
            </View>
          )}
        <TouchableOpacity
          className="w-full h-12 px-4 py-2 rounded-md flex-row items-center justify-center"
          style={{ backgroundColor: colors.primary[40] }}
          disabled={false}
          onPress={() =>
            onNext({
              urgency: selectedUrgency,
              // location: selectedLocation
              //   ? locations.find(l => l.id === selectedLocation)
              //   : customAddress,
              customAddress: customAddress,
            })
          }
        >
          <Text style={{ ...typography.h6, color: colors.white[400] }}>
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

const styles = StyleSheet.create({
  addressContainer: {
    width: horizontalScale(370),
  },
  inputText: {
    height: verticalScale(50),
    paddingLeft: horizontalScale(18),
    fontSize: fontScale(15),
    color: 'black',
    borderColor: '#D9D9D9',
    backgroundColor: '#F3F3F5',
    borderRadius: 10,
    width: horizontalScale(355),
  },
});

export default LocationTimingStep;
