import React from 'react';
import { Text, Image, Pressable } from 'react-native';
import CustomButtonProps from '../../types/customBtn';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  onPress,
  style,
  textStyle,
  iconStyle,
  disabled,
  id,
  className,
  classNameText,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={style}
      disabled={disabled}
      key={id}
      className={className}
    >
      {icon && <Image source={icon} style={iconStyle} />}
      {title && <Text style={textStyle} className={classNameText}>{title}</Text>}
    </Pressable>
  );
};

export default CustomButton;
