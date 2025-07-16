import { ImageSourcePropType, ViewStyle, ImageStyle, TextStyle } from 'react-native';

// This type defines the properties for the LogoWithText component
// It includes the logo source, text to display, and optional styles for the container, image, and text.

type LogoWithTextProps = {
  logoSource: ImageSourcePropType;
  title?: string;
  subtitle?: string
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
  imageBack?: ViewStyle;
  customLogo?: ViewStyle;
};

export default LogoWithTextProps;