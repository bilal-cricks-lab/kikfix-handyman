import React from 'react';
import {
  Text,
  Image,
  Pressable,
} from 'react-native';
import CustomButtonProps from '../../types/customBtn.types';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  onPress,
  style,
  textStyle,
  iconStyle,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={style}
      disabled={disabled}
    >
      {icon && <Image source={icon} style={iconStyle} />}
      {title && <Text style={textStyle}>{title}</Text>}
    </Pressable>
  );
};

export default CustomButton;
