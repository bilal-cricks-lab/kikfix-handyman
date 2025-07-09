import React, { Component } from 'react';
import { StyleSheet, Image, SafeAreaView, View } from 'react-native';
import IMAGES from '../../constants/Images';
import { horizontalScale, verticalScale } from '../../utils/screenSize';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StackParamList from '../../types/stack.types';

type NavigationProps = NativeStackScreenProps<StackParamList, 'Splash'>;

class Splash extends Component<NavigationProps> {
  constructor(props: NavigationProps) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Boarding');
    }, 2000);
  }

  render() {
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
  }
}

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
