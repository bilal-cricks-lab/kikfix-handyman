import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../design-system/colors';
import { spacing } from '../../design-system/spacing';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSelector from '../LanguageSelector';

const DesignSystemShowcase: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, availableLanguages } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { fontSize: 24, fontFamily: 'Poppins-Bold', lineHeight: 34 }]}>
          KikFix Design System
        </Text>
        <Text style={[styles.subtitle, { fontSize: 16, fontFamily: 'Poppins-Regular', lineHeight: 26 }]}>
          {t('onboarding.welcome')}
        </Text>
        
        {/* Language Selector */}
        <Pressable
          style={styles.languageButton}
          onPress={() => setShowLanguageSelector(true)}
        >
          <Text style={styles.languageButtonText}>
            {availableLanguages.find(lang => lang.code === currentLanguage)?.nativeName || 'English'}
          </Text>
        </Pressable>
      </View>

      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontSize: 20, fontFamily: 'Poppins-Bold', lineHeight: 30 }]}>
          Typography
        </Text>
        
        {/* Headings */}
        <View style={styles.typographyGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Headings:
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 24, fontFamily: 'Poppins-Bold', lineHeight: 34 }]}>
            H1 - 24px Bold (700) - 34px line height
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 22, fontFamily: 'Poppins-Bold', lineHeight: 32 }]}>
            H2 - 22px Bold (700) - 32px line height
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 20, fontFamily: 'Poppins-Bold', lineHeight: 30 }]}>
            H3 - 20px Bold (700) - 30px line height
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 18, fontFamily: 'Poppins-Bold', lineHeight: 28 }]}>
            H4 - 18px Bold (700) - 28px line height
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 16, fontFamily: 'Poppins-Bold', lineHeight: 26 }]}>
            H5 - 16px Bold (700) - 26px line height
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 14, fontFamily: 'Poppins-Bold', lineHeight: 24 }]}>
            H6 - 14px Bold (700) - 24px line height
          </Text>
        </View>

        {/* Body Text */}
        <View style={styles.typographyGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Body Text:
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 16, fontFamily: 'Poppins-Regular', lineHeight: 26 }]}>
            Body - 16px Regular (400) - 26px line height
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Body Small - 14px Regular (400) - 24px line height
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 12, fontFamily: 'Poppins-Regular', lineHeight: 22 }]}>
            Body Extra Small - 12px Regular (400) - 22px line height
          </Text>
        </View>

        {/* Link */}
        <View style={styles.typographyGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Link:
          </Text>
          <Text style={[styles.typographyExample, { fontSize: 12, fontFamily: 'Poppins-SemiBold', lineHeight: 22, color: colors.primary[500] }]}>
            Link - 12px SemiBold (600) - 22px line height
          </Text>
        </View>
      </View>

      {/* Colors Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontSize: 20, fontFamily: 'Poppins-Bold', lineHeight: 30 }]}>
          Colors
        </Text>

        {/* Primary Green */}
        <View style={styles.colorGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Primary Green (Secondary Green in design):
          </Text>
          <View style={styles.colorRow}>
            {Object.entries(colors.primary).slice(0, 6).map(([shade, color]) => (
              <View key={shade} style={styles.colorSwatch}>
                <View style={[styles.colorBox, { backgroundColor: color }]} />
                <Text style={[styles.colorLabel, { fontSize: 12, fontFamily: 'Poppins-Regular', lineHeight: 22 }]}>
                  {shade}
                </Text>
                <Text style={[styles.colorValue, { fontSize: 10, fontFamily: 'Poppins-Regular', lineHeight: 18 }]}>
                  {color}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Secondary Green */}
        <View style={styles.colorGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Secondary Green (Primary Green in design):
          </Text>
          <View style={styles.colorRow}>
            {Object.entries(colors.secondary).slice(0, 6).map(([shade, color]) => (
              <View key={shade} style={styles.colorSwatch}>
                <View style={[styles.colorBox, { backgroundColor: color }]} />
                <Text style={[styles.colorLabel, { fontSize: 12, fontFamily: 'Poppins-Regular', lineHeight: 22 }]}>
                  {shade}
                </Text>
                <Text style={[styles.colorValue, { fontSize: 10, fontFamily: 'Poppins-Regular', lineHeight: 18 }]}>
                  {color}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Black */}
        <View style={styles.colorGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Black:
          </Text>
          <View style={styles.colorRow}>
            {Object.entries(colors.black).slice(0, 6).map(([shade, color]) => (
              <View key={shade} style={styles.colorSwatch}>
                <View style={[styles.colorBox, { backgroundColor: color }]} />
                <Text style={[styles.colorLabel, { fontSize: 12, fontFamily: 'Poppins-Regular', lineHeight: 22 }]}>
                  {shade}
                </Text>
                <Text style={[styles.colorValue, { fontSize: 10, fontFamily: 'Poppins-Regular', lineHeight: 18 }]}>
                  {color}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* White */}
        <View style={styles.colorGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            White:
          </Text>
          <View style={styles.colorRow}>
            {Object.entries(colors.white).slice(0, 6).map(([shade, color]) => (
              <View key={shade} style={styles.colorSwatch}>
                <View style={[styles.colorBox, { backgroundColor: color, borderWidth: 1, borderColor: '#e5e5e5' }]} />
                <Text style={[styles.colorLabel, { fontSize: 12, fontFamily: 'Poppins-Regular', lineHeight: 22 }]}>
                  {shade}
                </Text>
                <Text style={[styles.colorValue, { fontSize: 10, fontFamily: 'Poppins-Regular', lineHeight: 18 }]}>
                  {color}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tertiary Green */}
        <View style={styles.colorGroup}>
          <Text style={[styles.label, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            Tertiary Green (Interactive states):
          </Text>
          <View style={styles.colorRow}>
            {Object.entries(colors.tertiary).slice(0, 5).map(([state, color]) => (
              <View key={state} style={styles.colorSwatch}>
                <View style={[styles.colorBox, { backgroundColor: color }]} />
                <Text style={[styles.colorLabel, { fontSize: 12, fontFamily: 'Poppins-Regular', lineHeight: 22 }]}>
                  {state}
                </Text>
                <Text style={[styles.colorValue, { fontSize: 10, fontFamily: 'Poppins-Regular', lineHeight: 18 }]}>
                  {color}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Usage Guidelines */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontSize: 20, fontFamily: 'Poppins-Bold', lineHeight: 30 }]}>
          Usage Guidelines
        </Text>
        
        <View style={styles.guideline}>
          <Text style={[styles.guidelineTitle, { fontSize: 16, fontFamily: 'Poppins-Bold', lineHeight: 26 }]}>
            Typography Usage:
          </Text>
          <Text style={[styles.guidelineText, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            • Use H1-H6 for headings with proper hierarchy{'\n'}
            • Use Body for main content text{'\n'}
            • Use Body Small for secondary content{'\n'}
            • Use Body Extra Small for captions{'\n'}
            • Use Link for clickable text elements{'\n'}
            • All text uses capitalize transform by default
          </Text>
        </View>

        <View style={styles.guideline}>
          <Text style={[styles.guidelineTitle, { fontSize: 16, fontFamily: 'Poppins-Bold', lineHeight: 26 }]}>
            Color Usage:
          </Text>
          <Text style={[styles.guidelineText, { fontSize: 14, fontFamily: 'Poppins-Regular', lineHeight: 24 }]}>
            • Primary Green: Main brand color, buttons, primary actions{'\n'}
            • Secondary Green: Secondary actions, highlights{'\n'}
            • Black: Text, icons, borders{'\n'}
            • White: Backgrounds, text on dark surfaces{'\n'}
            • Tertiary Green: Interactive states, hover effects
          </Text>
        </View>
      </View>
      
      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary[50],
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[200],
  },
  title: {
    color: colors.primary[500],
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.black[300],
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[100],
  },
  sectionTitle: {
    color: colors.primary[500],
    marginBottom: spacing.md,
  },
  typographyGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.black[400],
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  typographyExample: {
    color: colors.black[500],
    marginBottom: spacing.xs,
    textTransform: 'capitalize',
  },
  colorGroup: {
    marginBottom: spacing.lg,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  colorSwatch: {
    alignItems: 'center',
    width: 60,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginBottom: spacing.xs,
  },
  colorLabel: {
    color: colors.black[400],
    fontWeight: '600',
  },
  colorValue: {
    color: colors.black[300],
    textAlign: 'center',
  },
  guideline: {
    marginBottom: spacing.lg,
  },
  guidelineTitle: {
    color: colors.primary[500],
    marginBottom: spacing.sm,
  },
  guidelineText: {
    color: colors.black[400],
    lineHeight: 20,
  },
  languageButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  languageButtonText: {
    color: colors.white[500],
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
});

export default DesignSystemShowcase; 