import { ImageSourcePropType } from "react-native";

type CustomButtonProps = {
  title: string;
  icon?: ImageSourcePropType;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  iconStyle?: object;
  disabled?: boolean;
  id?: string | number;
  className?: string;
  classNameText?: string;
};

export default CustomButtonProps;