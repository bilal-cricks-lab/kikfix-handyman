import React from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTranslation } from 'react-i18next';
import { typography, colors, spacing } from '../../design-system';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onClose }) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: colors.white[500],
          borderRadius: 12,
          padding: spacing.lg,
          width: '80%',
          maxHeight: '70%',
        }}>
          <Text style={[typography.h4, { 
            textAlign: 'center', 
            marginBottom: spacing.lg,
            color: colors.primary[500]
          }]}>
            {t('settings.language')}
          </Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {availableLanguages.map((language) => (
              <Pressable
                key={language.code}
                onPress={() => handleLanguageSelect(language.code)}
                style={{
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.sm,
                  borderRadius: 8,
                  backgroundColor: currentLanguage === language.code 
                    ? colors.primary[100] 
                    : 'transparent',
                  marginBottom: spacing.xs,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={[typography.body, { 
                      color: colors.black[500],
                      fontWeight: currentLanguage === language.code ? '600' : '400'
                    }]}>
                      {language.nativeName}
                    </Text>
                    {language.nativeName !== language.name && (
                      <Text style={[typography.bodySmall, { 
                        color: colors.black[300],
                        marginTop: 2
                      }]}>
                        {language.name}
                      </Text>
                    )}
                  </View>
                  
                  {currentLanguage === language.code && (
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: colors.primary[500],
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={{ color: colors.white[500], fontSize: 12 }}>✓</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>
          
          <Pressable
            onPress={onClose}
            style={{
              marginTop: spacing.lg,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              backgroundColor: colors.black[100],
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={[typography.body, { color: colors.black[500] }]}>
              {t('common.cancel')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageSelector; 