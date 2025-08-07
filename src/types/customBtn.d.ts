import React from "react";
import { ImageSourcePropType } from "react-native";

type CustomButtonProps = {
  title?: string;
  icon?: ImageSourcePropType;
  onPress: () => void;
  style?: object;
  element?: React.ReactElement,
  textStyle?: object;
  iconStyle?: object;
  disabled?: boolean;
  id?: string | number;
  className?: string;
  classNameText?: string;
};

export default CustomButtonProps;