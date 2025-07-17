// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   TextInput,
// } from 'react-native';
// import {
//   Bell,
//   Plus,
//   Wrench,
//   Bolt,
//   Hammer,
//   Paintbrush,
//   Home,
//   Snowflake,
//   History,
//   User,
//   Zap,
//   Calendar,
// } from 'lucide-react-native';

// const { width } = Dimensions.get('window');

// // Mock data for services
// const categories = [
//   {
//     id: 1,
//     name: 'Plumbing',
//     icon: Wrench,
//     services: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning', 'Toilet Repair']
//   },
//   {
//     id: 2,
//     name: 'Electrical',
//     icon: Bolt,
//     services: ['Wiring', 'Outlet Installation', 'Light Fixture', 'Circuit Breaker']
//   },
//   {
//     id: 3,
//     name: 'Carpentry',
//     icon: Hammer,
//     services: ['Furniture Assembly', 'Shelving', 'Door Installation', 'Custom Woodwork']
//   },
//   {
//     id: 4,
//     name: 'Painting',
//     icon: Paintbrush,
//     services: ['Interior Painting', 'Exterior Painting', 'Touch-ups', 'Wallpaper']
//   },
//   {
//     id: 5,
//     name: 'Appliance',
//     icon: Home,
//     services: ['Washing Machine', 'Refrigerator', 'Dishwasher', 'Dryer']
//   },
//   {
//     id: 6,
//     name: 'HVAC',
//     icon: Snowflake,
//     services: ['AC Repair', 'Heating', 'Vent Cleaning', 'Thermostat']
//   },
// ];

// const CustomerDashboard = ({  }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const isGuest = false; // Mock value
//   const user = { name: 'John' }; // Mock user

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     category.services.some(service =>
//       service.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   const handleCategoryPress = (category: any) => {
//     setSelectedCategory(category);
//     // navigation.navigate('ServiceSelection', { category });
//   };

//   const renderCategoryCard = ({item}: any) => {
//     const IconComponent = item.icon;
//     return (
//       <TouchableOpacity
//         style={styles.categoryCard}
//         onPress={() => handleCategoryPress(item)}
//         activeOpacity={0.8}
//       >
//         <View style={styles.categoryIcon}>
//           <IconComponent size={32} color="#1976d2" />
//         </View>
//         <Text style={styles.categoryName}>{item.name}</Text>
//         <Text style={styles.serviceCount}>{item.services.length} services</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <View>
//             <Text style={styles.greeting}>
//               {isGuest ? 'Welcome, Guest!' : `Hello, ${user?.name || 'User'}!`}
//             </Text>
//             <Text style={styles.subtitle}>What service do you need today?</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.notificationButton}
//             onPress={() => {}}
//           >
//             <Bell size={24} color="#333" />
//             <View style={styles.notificationBadge}>
//               <Text style={styles.badgeText}>3</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.searchBar}>
//           <TextInput
//             placeholder="Search services..."
//             onChangeText={setSearchQuery}
//             value={searchQuery}
//             style={styles.searchInput}
//           />
//         </View>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Quick Actions */}
//         {/* <View style={styles.quickActions}>
//           <TouchableOpacity style={styles.quickAction}>
//             <Zap size={24} color="#f44336" />
//             <Text style={styles.quickActionText}>Emergency</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickAction}>
//             <Calendar size={24} color="#2196f3" />
//             <Text style={styles.quickActionText}>Schedule</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickAction}>
//             <History size={24} color="#4caf50" />
//             <Text style={styles.quickActionText}>History</Text>
//           </TouchableOpacity>
//         </View> */}

//         {/* Categories */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Service Categories</Text>
//           <FlatList
//             data={filteredCategories}
//             renderItem={renderCategoryCard}
//             keyExtractor={(item) => item.id.toString()}
//             numColumns={2}
//             columnWrapperStyle={styles.row}
//             scrollEnabled={false}
//             contentContainerStyle={styles.categoriesContainer}
//           />
//         </View>

//         {/* Recent Services */}
//         {/* <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Recent Services</Text>
//           <View style={styles.recentCard}>
//             <View style={styles.recentContent}>
//               <View style={styles.recentInfo}>
//                 <Wrench size={24} color="#2196f3" />
//                 <View style={styles.recentDetails}>
//                   <Text style={styles.recentService}>Plumbing Repair</Text>
//                   <Text style={styles.recentDate}>Jan 15, 2024</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.recentButton}>
//                 <Text style={styles.recentButtonText}>Book Again</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View> */}

//         {/* Guest Banner */}
//         {isGuest && (
//           <View style={styles.guestBanner}>
//             <View style={styles.guestContent}>
//               <View style={styles.guestInfo}>
//                 <User size={24} color="#1976d2" />
//                 <View style={styles.guestText}>
//                   <Text style={styles.guestTitle}>Sign up for full features</Text>
//                   <Text style={styles.guestDescription}>
//                     Track orders, view history, and get personalized recommendations
//                   </Text>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={styles.guestButton}
//                 onPress={() => {}}
//               >
//                 <Text style={styles.guestButtonText}>Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </ScrollView>

//       {/* Floating Action Button */}
//       {/* <TouchableOpacity style={styles.fab}>
//         <Plus size={24} color="white" />
//       </TouchableOpacity> */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     padding: 16,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   notificationButton: {
//     position: 'relative',
//     padding: 8,
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     backgroundColor: 'red',
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   searchBar: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//   },
//   searchInput: {
//     height: 40,
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   quickActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 24,
//   },
//   quickAction: {
//     alignItems: 'center',
//     padding: 12,
//   },
//   quickActionText: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 8,
//     fontWeight: '500',
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 12,
//   },
//   categoriesContainer: {
//     paddingBottom: 12,
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   categoryCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 12,
//     alignItems: 'center',
//     width: (width - 16 * 3) / 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     marginBottom: 12,
//   },
//   categoryIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     backgroundColor: '#e3f2fd',
//   },
//   categoryName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   serviceCount: {
//     fontSize: 14,
//     color: '#666',
//   },
//   recentCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   recentContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//   },
//   recentInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   recentDetails: {
//     marginLeft: 12,
//   },
//   recentService: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   recentDate: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   recentButton: {
//     borderWidth: 1,
//     borderColor: '#1976d2',
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//   },
//   recentButtonText: {
//     color: '#1976d2',
//     fontSize: 14,
//   },
//   guestBanner: {
//     backgroundColor: '#e3f2fd',
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   guestContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//   },
//   guestInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   guestText: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   guestTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   guestDescription: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   guestButton: {
//     backgroundColor: '#1976d2',
//     borderRadius: 4,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//   },
//   guestButtonText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#1976d2',
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
// });

// export default CustomerDashboard;

// import React from 'react';
// import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
// import {
//   LucideHouse,
//   LucideSparkles,
//   LucideCar,
//   LucideWrench,
// } from 'lucide-react-native';
// import { typography } from '../../../design-system';
// import { fontScale, verticalScale } from '../../../utils/screenSize';

// const categories = [
//   {
//     title: 'Home Repair & Maintenance',
//     subtitle: '4 services',
//     Icon: LucideHouse,
//   },
//   {
//     title: 'Cleaning Services',
//     subtitle: '3 services',
//     Icon: LucideSparkles,
//   },
//   {
//     title: 'Auto Services',
//     subtitle: '12 services',
//     Icon: LucideCar,
//   },
//   {
//     title: 'Home Improvement',
//     subtitle: '3 services',
//     Icon: LucideWrench,
//   },
// ];

// export default function ServiceCategoryScreen() {
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <ScrollView className="p-4">
//         {/* Header */}
//         <View className="bg-white border-b border-gray-200 p-4 mb-6">
//           <Text className="text-xl font-bold">Request a Service</Text>
//           <Text className="text-gray-500">Complete your service request in one place</Text>
//         </View>

//         {/* Stepper */}
//         <View className="flex-row justify-center mb-6 gap-12">
//           {['Service Category', 'Specific Service', 'Job Details'].map((label, index) => (
//             <View key={index} className="flex-row items-center">
//               <View className={`w-10 h-10 rounded-full items-center justify-center ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}>
//                 <Text className="text-white-50 font-medium">{index + 1}</Text>
//               </View>
//               <Text className={`left-3 ${index === 0 ? 'text-gray-800' : 'text-gray-400'} w-16`}
//               style={{lineHeight: verticalScale(20), fontSize: fontScale(14)}}
//               >
//                 {label}
//               </Text>
//             </View>
//           ))}
//         </View>

//         {/* Category Buttons */}
//         <View className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <Text className="text-lg font-semibold mb-6">Choose Service Category</Text>

//           <View className="flex flex-wrap flex-row justify-between gap-4">
//             {categories.map(({ title, subtitle, Icon }, idx) => (
//               <Pressable
//                 key={idx}
//                 onPress={() => {

//                 }}
//                 className="w-full md:w-[48%] p-4 border border-gray-300 rounded-xl flex-row items-center space-x-4 bg-white hover:border-blue-500"
//               >
//                 <View className="p-3 bg-gray-100 rounded-lg">
//                   <Icon size={24} color="#111" />
//                 </View>
//                 <View>
//                   <Text className="font-medium text-gray-900">{title}</Text>
//                   <Text className="text-sm text-gray-500">{subtitle}</Text>
//                 </View>
//               </Pressable>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useState } from 'react';
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
import { fontScale, verticalScale } from '../../../utils/screenSize';

// Fixed Header Component
const FixedHeader = ({ onBack, currentStep }: { onBack?: () => void, currentStep: number }) => {
  const steps = ['Service Category', 'Specific Service', 'Job Details', 'Location'];
  
  return (
    <View className="" style={{marginTop: Platform.OS === 'ios' ? verticalScale(60): null}}>
      {/* Top Navigation */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          {onBack && (
            <TouchableOpacity className="mr-3" onPress={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </TouchableOpacity>
          )}
          <Text className="text-2xl font-bold">Request a Service</Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity className="relative p-2">
            <Bell className="w-5 h-5" />
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
              <Text className="text-white text-xs">3</Text>
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

      {/* Step Indicator */}
      <View className="px-6 py-4 border-gray-200">
        <View className="flex-row items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep - 1;
            const isActive = index === currentStep - 1;
            
            return (
              <View key={index} className="flex-row items-center justify-center">
                <View 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted || isActive ? 'bg-green-700' : 'bg-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <Text className="text-white text-sm font-medium">✓</Text>
                  ) : (
                    <Text 
                      className={`text-sm font-medium ${
                        isActive ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text 
                  className={`mt-2 text-xs text-center ${isActive ? 'font-medium text-gray-900' : 'text-gray-500'}`}
                  style={{ fontSize: fontScale(10), width: 80 }}
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
const ServiceCategoryStep = ({ onNext }: { onNext: (category: any) => void }) => {
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
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Choose Service Category</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              className="w-full md:w-[48%] flex-row items-center gap-4 p-4 rounded-xl border border-gray-300 active:border-green-700 active:bg-green-50"
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
const SpecificServiceStep = ({ category, onBack, onNext }: { 
  category: any, 
  onBack: () => void, 
  onNext: (service: any) => void 
}) => {
  const services = [
    {
      id: 1,
      name: 'Plumbing Repair',
      icon: Droplets,
      description: 'Professional plumbing services for leaks, clogs, and installations',
      price: '$50-80/hr',
      duration: '1-4 hours typical',
    },
    {
      id: 2,
      name: 'Electrical Work',
      icon: Zap,
      description: 'Licensed electrical services for safe and reliable installations',
      price: '$60-90/hr',
      duration: '1-6 hours typical',
    },
    {
      id: 3,
      name: 'HVAC Service',
      icon: Wind,
      description: 'Heating, ventilation, and air conditioning maintenance and repair',
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
    <ScrollView className="flex-1 bg-gray-50">
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
const JobDetailsStep = ({ service, onBack, onNext }: { 
  service: any, 
  onBack: () => void, 
  onNext: (jobSize: any) => void 
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
const LocationTimingStep = ({ jobSize, onBack, onNext }: { 
  jobSize: any, 
  onBack: () => void, 
  onNext: (data: any) => void 
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
              <Text className="font-medium text-green-900">
                {jobSize.name}
              </Text>
              <Text className="text-sm text-green-700">{jobSize.description}</Text>
            </View>
            <View className="text-right">
              <Text className="text-sm text-green-700">
                Step 4 of 4
              </Text>
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
                className={`w-full md:w-[30%] flex-col gap-2 rounded-xl border p-3 ${option.color} ${option.border} ${
                  selectedUrgency === option.id ? 'ring-2 ring-offset-2 ring-green-500' : ''
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
                  <Text className="text-xs text-gray-500">
                    {loc.address}
                  </Text>
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
          <Text className="text-white font-medium">Find Available Handymen</Text>
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
    // Here you would typically navigate to a confirmation screen or submit the data
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