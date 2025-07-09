import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/screenSize';
import Slides from '../../data/Slides';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Slide from '../../components/Slide';
import StackParamList from '../../types/stack.types';
import CustomButton from '../../components/Button';
import IMAGES from '../../constants/Images';

type NavigationProps = NativeStackScreenProps<StackParamList, 'Boarding'>;

type State = {
  currentIndex: number;
};

class Boarding extends Component<NavigationProps, State> {
  private ref: React.RefObject<FlatList<any> | null> =
    React.createRef<FlatList<any>>();

  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  updateCurrentSlideIndex = (e: any) => {
    const { width } = Dimensions.get('window');
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    this.setState({ currentIndex });
  };

  goToNextSlide = () => {
    const { currentIndex } = this.state;
    const { width } = Dimensions.get('window');
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex !== Slides.length) {
      const offset = nextSlideIndex * width;
      if (this.ref.current) {
        this.ref.current.scrollToOffset({ offset, animated: true });
      }
      this.setState({ currentIndex: currentIndex + 1 });
    } else {
      this.props.navigation.navigate('SignUp');
    }
  };

  render() {
    const { currentIndex } = this.state;
    const { height } = Dimensions.get('window');

    return (
      <SafeAreaView style={styles.container}>
        <View></View>
        <Animated.FlatList
          ref={this.ref}
          onMomentumScrollEnd={this.updateCurrentSlideIndex}
          contentContainerStyle={{ height: height * 0.75 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Slides}
          pagingEnabled
          renderItem={({ item }) => (
            <Slide item={item} currentIndex={currentIndex} />
          )}
        />
        <View style={styles.btn}>
          <View style={styles.btnView}>
            <CustomButton
              style={styles.continueBtn}
              icon={IMAGES.arrowRight}
              onPress={this.goToNextSlide}
              iconStyle={styles.imageView}
              title=""
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Boarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  btn: {
    alignItems: 'center',
  },
  btnView: {
    width: horizontalScale(350),
    alignItems: 'flex-start',
    bottom: verticalScale(70),
  },
  continueBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28A94D',
    width: horizontalScale(50),
    height: verticalScale(35),
    borderRadius: 5,
  },
  imageView: {
    width: horizontalScale(20),
    height: verticalScale(20),
  },
});
