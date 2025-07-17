import React from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { horizontalScale } from '../../utils/screenSize';
import Slides from '../../data/Slides';
import { styles } from './styles';
import SlideItem from '../../types/slide';

const Slide = ({
  item,
  currentIndex,
}: {
  item: SlideItem;
  currentIndex: number;
}) => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const arrayColors = [50, 60, 50].map((_) => {
    return horizontalScale(_);
  });
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: currentIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={item?.image} style={styles.imageStyle} />
      <View style={styles.footer}>
        <View style={styles.footerDirection}>
          {Slides.map((_, index) => {
            const width = animation.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: arrayColors,
              extrapolate: 'clamp',
            });
            const opacity = animation.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.1, 1, 0.1],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.animationIndicator, { opacity, width }]}
              >
                <View style={styles.indicatorStyle} />
              </Animated.View>
            );
          })}
        </View>
      </View>
      <View style={styles.text}>
        <View style={styles.textPosition}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Slide;