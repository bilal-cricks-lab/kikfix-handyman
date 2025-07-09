import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  verticalScale,
  fontScale,
} from '../../utils/screenSize';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const indicator_Width = horizontalScale(40);
const indicator_Spacing = horizontalScale(15);

export const styles = StyleSheet.create({
  imageStyle: {
    width,
    resizeMode: 'contain',
    marginTop: verticalScale(70),
  },
  text: {
    width: horizontalScale(350),
    height: verticalScale(300),
    justifyContent: 'space-between',
  },
  textPosition: {
    alignItems: 'flex-start',
    width: horizontalScale(350),
    gap: verticalScale(10),
    marginTop: verticalScale(90),
  },
  subtitle: {
    letterSpacing: horizontalScale(0.2),
    color: 'black',
    fontSize: fontScale(17),
    fontFamily: 'Poppins-SemiBold'
  },
  title: {
    color: 'black',
    fontSize: fontScale(16),
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  animationIndicator: {
    width: indicator_Width,
    height: horizontalScale(3),
    marginHorizontal: indicator_Spacing / 2,
    borderRadius: indicator_Width / 1,
  },
  indicatorStyle: {
    backgroundColor: '#1A693B', // Or your desired color
    borderRadius: 2, // Small rounding (optional)
    flex: 1,
  },
});
