// components/JobCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Clock, MapPin, Navigation, MessageCircle, Edit3, CheckCircle, Phone } from 'lucide-react-native';

interface Job {
  id: number;
  customerName: string;
  customerImage: string;
  serviceName: string;
  description: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  timing: {
    date: string;
    timeSlot: string;
    urgency: 'standard' | 'urgent' | 'emergency';
  };
  budget: number;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  urgency: 'standard' | 'urgent' | 'emergency';
  distance: string;
  estimatedDuration: string;
  paymentConfirmed?: boolean;
  expiresAt?: string;
  postedTime?: string;
}

interface Props {
  job: Job;
  variant?: 'available' | 'accepted';
  onAccept?: () => void;
  onDecline?: () => void;
  onCounterOffer?: () => void;
  onNavigate?: () => void;
  onViewDetails?: () => void;
}

export const JobCard: React.FC<Props> = ({
  job,
  variant = 'available',
  onAccept,
  onDecline,
  onCounterOffer,
  onNavigate,
  onViewDetails,
}) => {
  const isExpired = new Date(job.expiresAt || '') < new Date();

  return (
    <View className={`bg-white rounded-xl p-4 mb-4 border-l-4 ${variant === 'accepted' ? 'border-blue-500' : isExpired ? 'border-red-500 bg-red-50' : 'border-green-700'}`}>
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row flex-1">
          <Image source={{ uri: job.customerImage }} className="w-12 h-12 rounded-full mr-3" />
          <View className="flex-1">
            <View className="flex-row flex-wrap items-center mb-1">
              <Text className="font-semibold text-base text-gray-900 mr-2">{job.serviceName}</Text>
              {variant === 'available' && (
                <View className="flex-row items-center bg-blue-500 px-2 py-0.5 rounded">
                  <Clock size={12} color="#fff" />
                  <Text className="text-xs text-white ml-1">{job.urgency}</Text>
                </View>
              )}
            </View>
            <Text className="text-xs text-gray-500 mb-1">by {job.customerName}</Text>
            <Text className="text-sm text-gray-700" numberOfLines={2}>{job.description}</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-green-700 font-bold text-base">Rs {job.budget}</Text>
          <Text className="text-xs text-gray-500">{job.estimatedDuration}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center flex-1 mr-2">
          <MapPin size={14} color="#6b7280" />
          <Text className="text-xs text-gray-600 ml-1" numberOfLines={1}>{job.location.address}</Text>
        </View>
        <View className="flex-row items-center">
          <Clock size={14} color="#6b7280" />
          <Text className="text-xs text-gray-600 ml-1">{job.timing.timeSlot}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        {variant === 'accepted' ? (
          <>
            <View className="flex-row space-x-3">
              <TouchableOpacity onPress={onNavigate} className="flex-row items-center bg-green-700 px-3 py-2 rounded">
                <Navigation size={14} color="#fff" />
                <Text className="text-white text-xs ml-2">Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center border border-gray-300 px-3 py-2 rounded">
                <Phone size={14} color="#3b82f6" />
                <Text className="text-blue-500 text-xs ml-2">Call</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={onViewDetails} className="border border-gray-300 px-3 py-1.5 rounded">
              <Text className="text-xs text-gray-800">View Details</Text>
            </TouchableOpacity>
            <View className="flex-row space-x-2">
              <TouchableOpacity onPress={onDecline} disabled={isExpired} className="border border-gray-300 px-3 py-1.5 rounded">
                <Text className="text-xs text-gray-500">Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCounterOffer} disabled={isExpired} className="border border-blue-300 flex-row items-center px-3 py-1.5 rounded">
                <Edit3 size={12} color="#3b82f6" />
                <Text className="text-xs text-blue-500 ml-1">Counter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onAccept} disabled={isExpired} className={`bg-green-700 px-3 py-1.5 rounded ${isExpired ? 'opacity-50' : ''}`}>
                <Text className="text-white text-xs">Accept</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
