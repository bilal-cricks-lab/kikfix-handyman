import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import {
  verticalScale,
  horizontalScale,
} from '../../utils/screenSize';
import { colors, typography } from '../../design-system';
import LogoWithTextProps from '../../types/logoText';

const LogoText: React.FC<LogoWithTextProps> = ({
  logoSource,
  title,
  subtitle,
  customLogo,
  imageBack,
}) => {
  return (
    <>
      <View className="items-center gap-5">
        {imageBack && (
          <View className="items-center justify-center" style={imageBack}>
            <Image source={logoSource} style={styles.imageStyle} />
          </View>
        )}
        {customLogo && (
          <View
            className="w-20 h-20 bg-[#22c55e] rounded-3xl shadow-black-500 items-center justify-center"
            style={customLogo}
          >
            <Text style={[typography.h1, { color: colors.white[50] }]}>K</Text>
          </View>
        )}
        <View className="items-center justify-center gap-3">
          <Text style={typography.h2}>{title}</Text>
          <Text style={[typography.bodySmall, { color: colors.gray[600] }]}>
            {subtitle}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoTextPos: {
    marginTop: verticalScale(50),
    gap: verticalScale(20),
  },
  imagePos: {
    alignItems: 'center',
  },
  imageStyle: {
    width: horizontalScale(170),
    height: verticalScale(70),
  },
});

export default LogoText;
