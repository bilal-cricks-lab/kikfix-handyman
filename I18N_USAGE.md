# KikFix Internationalization (i18n) Guide

This guide covers the internationalization setup for the KikFix React Native application using `react-i18next`.

## 🚀 Quick Start

### 1. Setup Complete ✅
The i18n system is already configured and ready to use:
- **react-i18next**: Main i18n library
- **i18next**: Core translation engine
- **AsyncStorage**: Language persistence
- **4 Languages**: English, Spanish, French, Arabic

### 2. Usage in Components

#### Basic Translation
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <Text>{t('auth.signUp')}</Text>
  );
};
```

#### Nested Keys
```tsx
// For nested translations like onboarding.step1.title
<Text>{t('onboarding.step1.title')}</Text>
```

#### With Variables
```tsx
// Translation: "Welcome back, {{name}}!"
<Text>{t('auth.welcomeBack', { name: 'John' })}</Text>
```

## 📁 File Structure

```
src/i18n/
├── index.ts                 # Main i18n configuration
├── LanguageContext.tsx      # Language management context
└── locales/
    ├── en.json             # English translations
    ├── es.json             # Spanish translations
    ├── fr.json             # French translations
    └── ar.json             # Arabic translations
```

## 🌍 Available Languages

| Language | Code | Native Name |
|----------|------|-------------|
| English  | `en` | English     |
| Spanish  | `es` | Español     |
| French   | `fr` | Français    |
| Arabic   | `ar` | العربية     |

## 🔧 Language Management

### Language Context Hook
```tsx
import { useLanguage } from '../i18n/LanguageContext';

const MyComponent = () => {
  const { 
    currentLanguage, 
    changeLanguage, 
    availableLanguages 
  } = useLanguage();
  
  // Get current language
  console.log(currentLanguage); // 'en'
  
  // Change language
  await changeLanguage('es');
  
  // Get available languages
  console.log(availableLanguages);
};
```

### Language Selector Component
```tsx
import LanguageSelector from '../components/LanguageSelector';

const SettingsScreen = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  return (
    <View>
      <Pressable onPress={() => setShowLanguageSelector(true)}>
        <Text>Change Language</Text>
      </Pressable>
      
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </View>
  );
};
```

## 📝 Translation Keys

### Common Actions
```json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "submit": "Submit",
    "confirm": "Confirm",
    "yes": "Yes",
    "no": "No"
  }
}
```

### Authentication
```json
{
  "auth": {
    "signUp": "Sign Up",
    "signIn": "Sign In",
    "signOut": "Sign Out",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "forgotPassword": "Forgot Password?",
    "alreadyHaveAccount": "Already have an account?",
    "dontHaveAccount": "Don't have an account?",
    "createAccount": "Create Account",
    "welcomeBack": "Welcome Back",
    "signUpText": "Create your account to get started with KikFix",
    "signInText": "Sign in to your account",
    "signUpCon": "Sign Up",
    "signInCon": "Sign In",
    "resetPassword": "Reset Password",
    "sendResetLink": "Send Reset Link"
  }
}
```

### Onboarding
```json
{
  "onboarding": {
    "welcome": "Welcome to KikFix",
    "step1": {
      "title": "Fix Your Kicks",
      "description": "Professional sneaker repair and restoration services"
    },
    "step2": {
      "title": "Expert Care",
      "description": "Our certified technicians bring your shoes back to life"
    },
    "step3": {
      "title": "Fast Service",
      "description": "Quick turnaround times with quality guaranteed"
    },
    "step4": {
      "title": "Get Started",
      "description": "Book your first repair and experience the difference"
    },
    "skip": "Skip",
    "next": "Next",
    "getStarted": "Get Started"
  }
}
```

### Navigation
```json
{
  "navigation": {
    "home": "Home",
    "profile": "Profile",
    "settings": "Settings",
    "orders": "Orders",
    "services": "Services",
    "about": "About",
    "contact": "Contact",
    "help": "Help"
  }
}
```

### Services
```json
{
  "services": {
    "title": "Our Services",
    "sneakerRepair": "Sneaker Repair",
    "soleReplacement": "Sole Replacement",
    "colorRestoration": "Color Restoration",
    "deepCleaning": "Deep Cleaning",
    "customization": "Customization",
    "bookService": "Book Service",
    "viewDetails": "View Details"
  }
}
```

### Validation & Errors
```json
{
  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "password": "Password must be at least 8 characters",
    "passwordMatch": "Passwords must match",
    "phone": "Please enter a valid phone number"
  },
  "errors": {
    "networkError": "Network error. Please check your connection.",
    "serverError": "Server error. Please try again later.",
    "unknownError": "An unknown error occurred.",
    "invalidCredentials": "Invalid email or password.",
    "emailExists": "An account with this email already exists."
  }
}
```

## 🎨 Best Practices

### 1. Use Translation Keys Consistently
```tsx
// ✅ Good
<Text>{t('auth.signUp')}</Text>
<Text>{t('auth.signIn')}</Text>

// ❌ Bad
<Text>{t('signUp')}</Text>
<Text>{t('login')}</Text>
```

### 2. Group Related Translations
```tsx
// ✅ Good - Grouped under 'auth'
t('auth.signUp')
t('auth.signIn')
t('auth.forgotPassword')

// ❌ Bad - Scattered
t('signUp')
t('login')
t('forgotPassword')
```

### 3. Use Variables for Dynamic Content
```tsx
// Translation: "Welcome back, {{name}}!"
<Text>{t('auth.welcomeBack', { name: userName })}</Text>

// Translation: "Order #{{orderId}} is ready"
<Text>{t('orders.ready', { orderId: order.id })}</Text>
```

### 4. Handle Pluralization
```tsx
// Translation: "{{count}} item" / "{{count}} items"
<Text>{t('cart.items', { count: itemCount })}</Text>
```

## 🔄 Adding New Languages

### 1. Create Translation File
```json
// src/i18n/locales/de.json
{
  "common": {
    "loading": "Laden...",
    "error": "Fehler",
    "success": "Erfolg"
  },
  "auth": {
    "signUp": "Registrieren",
    "signIn": "Anmelden"
  }
}
```

### 2. Update Configuration
```tsx
// src/i18n/index.ts
import de from './locales/de.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  ar: { translation: ar },
  de: { translation: de }, // Add new language
};
```

### 3. Update Language Context
```tsx
// src/i18n/LanguageContext.tsx
const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' }, // Add new language
];
```

## 🌐 RTL Support (Arabic)

The system supports Right-to-Left (RTL) languages like Arabic:

### Automatic RTL Detection
```tsx
// React Native automatically handles RTL for Arabic
// Text alignment, flex direction, etc. are handled automatically
```

### Manual RTL Handling
```tsx
import { I18nManager } from 'react-native';

// Force RTL layout
I18nManager.forceRTL(true);

// Check if RTL
const isRTL = I18nManager.isRTL;
```

## 🧪 Testing Translations

### 1. Test All Languages
```tsx
// Test component with different languages
const TestComponent = () => {
  const { i18n } = useTranslation();
  
  const testLanguages = ['en', 'es', 'fr', 'ar'];
  
  return (
    <View>
      {testLanguages.map(lang => (
        <Pressable key={lang} onPress={() => i18n.changeLanguage(lang)}>
          <Text>Switch to {lang}</Text>
        </Pressable>
      ))}
    </View>
  );
};
```

### 2. Check for Missing Translations
```tsx
// Enable debug mode in development
// This will log missing translation keys
debug: __DEV__
```

## 📱 Integration with Design System

The i18n system works seamlessly with your design system:

```tsx
import { useTranslation } from 'react-i18next';
import { typography, colors, spacing } from '../design-system';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <Text style={[typography.h1, { color: colors.primary[500] }]}>
      {t('onboarding.welcome')}
    </Text>
  );
};
```

## 🚀 Performance Tips

### 1. Lazy Loading
```tsx
// Load translations on demand
const loadLanguage = async (language: string) => {
  const translations = await import(`./locales/${language}.json`);
  i18n.addResourceBundle(language, 'translation', translations.default);
};
```

### 2. Memoization
```tsx
import { useMemo } from 'react';

const MyComponent = () => {
  const { t } = useTranslation();
  
  // Memoize expensive translations
  const welcomeMessage = useMemo(() => t('onboarding.welcome'), [t]);
  
  return <Text>{welcomeMessage}</Text>;
};
```

## 🔧 Troubleshooting

### Common Issues

1. **Translation not found**
   - Check if the key exists in all language files
   - Verify the key path is correct
   - Enable debug mode to see missing keys

2. **Language not persisting**
   - Check AsyncStorage permissions
   - Verify the storage key is correct
   - Check for storage errors in console

3. **RTL not working**
   - Ensure I18nManager is properly configured
   - Check if the device supports RTL
   - Verify text alignment properties

### Debug Mode
```tsx
// Enable debug mode in development
debug: __DEV__

// This will log:
// - Missing translation keys
// - Language changes
// - Loading states
```

This internationalization setup provides a robust, scalable solution for multi-language support in your KikFix application with best practices and comprehensive documentation. 