import { ImageSourcePropType } from "react-native";

type CustomButtonProps = {
  title: string;
  icon?: ImageSourcePropType;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  iconStyle?: object;
  disabled?: boolean;
};

export default CustomButtonProps;