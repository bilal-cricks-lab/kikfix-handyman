import React, { useEffect } from 'react';
import { StyleSheet, Image, SafeAreaView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import IMAGES from '../../constants/Images';
import { horizontalScale, verticalScale } from '../../utils/screenSize';
import StackParamList from '../../types/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SplashScreenProps = NativeStackScreenProps<StackParamList, 'Splash'>;

const Splash: React.FC = () => {
  const navigation = useNavigation<SplashScreenProps['navigation']>();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem('user_token');
      if(token){
        navigation.navigate('Cust');
      }
      else{
        navigation.navigate('Boarding');
      }
    }, 2000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagePos}>
        <Image source={IMAGES.photoroom2} />
      </View>
      <Image source={IMAGES.logo} />
      <View style={styles.imagePos2}>
        <Image source={IMAGES.photoroom} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePos: {
    position: 'absolute',
    top: verticalScale(0),
    height: verticalScale(300),
    left: horizontalScale(170),
    right: horizontalScale(100),
    bottom: verticalScale(100),
    alignItems: 'center',
    resizeMode: 'contain',
  },
  imagePos2: {
    position: 'absolute',
    top: verticalScale(290),
    left: horizontalScale(75),
    right: horizontalScale(100),
    bottom: verticalScale(100),
    alignItems: 'center',
    resizeMode: 'contain',
  },
});

export default Splash;
