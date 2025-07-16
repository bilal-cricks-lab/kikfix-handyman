import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import { 
  Bell, 
  Plus,
  Wrench,
  Bolt,
  Hammer,
  Paintbrush,
  Home,
  Snowflake,
  History,
  User,
  Zap,
  Calendar,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data for services
const categories = [
  {
    id: 1,
    name: 'Plumbing',
    icon: Wrench,
    services: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning', 'Toilet Repair']
  },
  {
    id: 2,
    name: 'Electrical',
    icon: Bolt,
    services: ['Wiring', 'Outlet Installation', 'Light Fixture', 'Circuit Breaker']
  },
  {
    id: 3,
    name: 'Carpentry',
    icon: Hammer,
    services: ['Furniture Assembly', 'Shelving', 'Door Installation', 'Custom Woodwork']
  },
  {
    id: 4,
    name: 'Painting',
    icon: Paintbrush,
    services: ['Interior Painting', 'Exterior Painting', 'Touch-ups', 'Wallpaper']
  },
  {
    id: 5,
    name: 'Appliance',
    icon: Home,
    services: ['Washing Machine', 'Refrigerator', 'Dishwasher', 'Dryer']
  },
  {
    id: 6,
    name: 'HVAC',
    icon: Snowflake,
    services: ['AC Repair', 'Heating', 'Vent Cleaning', 'Thermostat']
  },
];

const CustomerDashboard = ({  }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isGuest = false; // Mock value
  const user = { name: 'John' }; // Mock user

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.services.some(service => 
      service.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
    // navigation.navigate('ServiceSelection', { category });
  };

  const renderCategoryCard = ({item}: any) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.categoryIcon}>
          <IconComponent size={32} color="#1976d2" />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.serviceCount}>{item.services.length} services</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>
              {isGuest ? 'Welcome, Guest!' : `Hello, ${user?.name || 'User'}!`}
            </Text>
            <Text style={styles.subtitle}>What service do you need today?</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => {}}
          >
            <Bell size={24} color="#333" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search services..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Zap size={24} color="#f44336" />
            <Text style={styles.quickActionText}>Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Calendar size={24} color="#2196f3" />
            <Text style={styles.quickActionText}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <History size={24} color="#4caf50" />
            <Text style={styles.quickActionText}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Categories</Text>
          <FlatList
            data={filteredCategories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Recent Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Services</Text>
          <View style={styles.recentCard}>
            <View style={styles.recentContent}>
              <View style={styles.recentInfo}>
                <Wrench size={24} color="#2196f3" />
                <View style={styles.recentDetails}>
                  <Text style={styles.recentService}>Plumbing Repair</Text>
                  <Text style={styles.recentDate}>Jan 15, 2024</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.recentButton}>
                <Text style={styles.recentButtonText}>Book Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Guest Banner */}
        {isGuest && (
          <View style={styles.guestBanner}>
            <View style={styles.guestContent}>
              <View style={styles.guestInfo}>
                <User size={24} color="#1976d2" />
                <View style={styles.guestText}>
                  <Text style={styles.guestTitle}>Sign up for full features</Text>
                  <Text style={styles.guestDescription}>
                    Track orders, view history, and get personalized recommendations
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.guestButton}
                onPress={() => {}}
              >
                <Text style={styles.guestButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    height: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  quickAction: {
    alignItems: 'center',
    padding: 12,
  },
  quickActionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: (width - 16 * 3) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#e3f2fd',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceCount: {
    fontSize: 14,
    color: '#666',
  },
  recentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  recentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentDetails: {
    marginLeft: 12,
  },
  recentService: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  recentDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recentButton: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  recentButtonText: {
    color: '#1976d2',
    fontSize: 14,
  },
  guestBanner: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    marginBottom: 16,
  },
  guestContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  guestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  guestText: {
    marginLeft: 12,
    flex: 1,
  },
  guestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  guestDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  guestButton: {
    backgroundColor: '#1976d2',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  guestButtonText: {
    color: 'white',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1976d2',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default CustomerDashboard;