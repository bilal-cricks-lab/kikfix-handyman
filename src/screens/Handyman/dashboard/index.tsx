import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { colors } from '../../../design-system/colors';
import { typography } from '../../../design-system/typography';
import { horizontalScale, verticalScale } from '../../../utils/screenSize';

const HandymanDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Empty screen - ready for design</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(24),
  },
  title: {
    ...typography.h2,
    color: colors.black[500],
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  subtitle: {
    ...typography.body,
    color: colors.gray[600],
    textAlign: 'center',
  },
});

export default HandymanDashboard;
