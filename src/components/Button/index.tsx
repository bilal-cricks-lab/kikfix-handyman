import React from 'react';
import { Text, Image, Pressable } from 'react-native';
import CustomButtonProps from '../../types/customBtn.types';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  onPress,
  style,
  textStyle,
  iconStyle,
  disabled,
  key,
  className,
  classNameText,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={style}
      disabled={disabled}
      key={key}
      className={className}
    >
      {icon && <Image source={icon} style={iconStyle} />}
      {title && <Text style={textStyle} className={classNameText}>{title}</Text>}
    </Pressable>
  );
};

export default CustomButton;
