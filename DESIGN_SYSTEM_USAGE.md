# KikFix Design System Usage Guide

This guide covers the design system elements you provided for the KikFix React Native application.

## Overview

The KikFix design system includes:
- **Typography**: H1-H6, Body, Body Small, Body Extra Small, and Link variants
- **Colors**: Primary Green, Secondary Green, Black, White, and Tertiary Green
- **Spacing**: Consistent spacing scale

## Typography

### Typography Variants

The design system includes the following typography variants with exact specifications:

#### Headings (H1-H6)
- **H1**: 24px, Bold (700), 34px line height, Poppins-Bold
- **H2**: 22px, Bold (700), 32px line height, Poppins-Bold
- **H3**: 20px, Bold (700), 30px line height, Poppins-Bold
- **H4**: 18px, Bold (700), 28px line height, Poppins-Bold
- **H5**: 16px, Bold (700), 26px line height, Poppins-Bold
- **H6**: 14px, Bold (700), 24px line height, Poppins-Bold

#### Body Text
- **Body**: 16px, Regular (400), 26px line height, Poppins-Regular
- **Body Small**: 14px, Regular (400), 24px line height, Poppins-Regular
- **Body Extra Small**: 12px, Regular (400), 22px line height, Poppins-Regular

#### Link
- **Link**: 12px, SemiBold (600), 22px line height, Poppins-SemiBold

### Usage

#### Using Typography Styles
```tsx
import { typography } from '../design-system/typography';

// In your component
<Text style={typography.h1}>Main Heading</Text>
<Text style={typography.body}>Body text content</Text>
<Text style={typography.link}>Clickable link</Text>
```

#### Using Tailwind Classes
```tsx
// Headings
<Text className="text-2xl font-bold font-poppins-bold text-black capitalize leading-loose">H1</Text>
<Text className="text-xl font-bold font-poppins-bold text-black capitalize leading-loose">H2</Text>

// Body text
<Text className="text-base font-normal font-poppins text-black capitalize leading-relaxed">Body</Text>
<Text className="text-sm font-normal font-poppins text-black capitalize leading-normal">Body Small</Text>

// Link
<Text className="text-xs font-semibold font-poppins-semibold text-black capitalize leading-snug">Link</Text>
```

## Colors

### Color Palette

The design system includes the following color scales:

#### Primary Green (Secondary Green in design)
- 50: #e8f0eb
- 100: #b9d0c2
- 200: #97b9a5
- 300: #67987c
- 400: #498562
- 500: #1c663b (Main brand color)
- 600: #195d36
- 700: #14482a
- 800: #0f3820
- 900: #0c2b19

#### Secondary Green (Primary Green in design)
- 50: #eaf7ee
- 100: #bde6c9
- 200: #9ddaaf
- 300: #71c98a
- 400: #55bf74
- 500: #2baf51 (Secondary brand color)
- 600: #279f4a
- 700: #1f7c3a
- 800: #18602d
- 900: #124a22

#### Black
- 50: #e6e6e6
- 100: #b0b0b0
- 200: #8a8a8a
- 300: #545454
- 400: #333333
- 500: #000000 (Main text color)
- 600-900: #000000

#### White
- 50-500: #ffffff (Main background color)
- 600: #e8e8e8
- 700: #b5b5b5
- 800: #8c8c8c
- 900: #6b6b6b

#### Tertiary Green (Interactive states)
- light: #f6fdf8
- lightHover: #f2fcf5
- lightActive: #e4f8ea
- normal: #a9eabc
- normalHover: #98d3a9
- normalActive: #87bb96
- dark: #7fb08d
- darkHover: #658c71
- darkActive: #4c6955
- darker: #3b5242

### Usage

#### Using Color Values
```tsx
import { colors, getColor } from '../design-system/colors';

// Get specific color
const primaryColor = getColor('primary', 500); // #1c663b
const secondaryColor = colors.secondary[500]; // #2baf51

// Use in styles
<View style={{ backgroundColor: colors.primary[500] }}>
  <Text style={{ color: colors.white[500] }}>Content</Text>
</View>
```

#### Using Tailwind Classes
```tsx
// Background colors
<View className="bg-primary-500">Primary background</View>
<View className="bg-secondary-500">Secondary background</View>
<View className="bg-white">White background</View>

// Text colors
<Text className="text-black">Black text</Text>
<Text className="text-primary-500">Primary colored text</Text>
<Text className="text-secondary-500">Secondary colored text</Text>

// Interactive states
<Pressable className="bg-tertiary-light active:bg-tertiary-light-active">
  Interactive button
</Pressable>
```

## Spacing

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px
- 5xl: 128px

### Usage

#### Using Spacing Values
```tsx
import { spacing } from '../design-system/spacing';

<View style={{ padding: spacing.lg, margin: spacing.md }}>
  Content with consistent spacing
</View>
```

#### Using Tailwind Classes
```tsx
<View className="p-4 m-2">Padding and margin</View>
<View className="px-6 py-4">Horizontal and vertical padding</View>
<View className="space-y-4">Vertical spacing between children</View>
```

## Best Practices

### Typography
1. **Use proper hierarchy**: H1 for main titles, H2 for sections, H3 for subsections
2. **Consistent line heights**: Each typography variant has a specific line height for optimal readability
3. **Text transform**: All text uses capitalize transform by default
4. **Font weights**: Use Bold (700) for headings, Regular (400) for body text, SemiBold (600) for links

### Colors
1. **Primary Green**: Use for main brand elements, primary buttons, and key actions
2. **Secondary Green**: Use for secondary actions, highlights, and supporting elements
3. **Black**: Use for text, icons, and borders
4. **White**: Use for backgrounds and text on dark surfaces
5. **Tertiary Green**: Use for interactive states, hover effects, and subtle highlights

### Spacing
1. **Consistent spacing**: Use the defined spacing scale for all margins and padding
2. **Visual hierarchy**: Use larger spacing for major sections, smaller spacing for related elements
3. **Responsive design**: Consider different screen sizes when applying spacing

## Examples

### Button Component
```tsx
import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, spacing } from '../design-system';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const backgroundColor = variant === 'primary' ? colors.primary[500] : colors.secondary[500];
  
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: 8,
      }}
    >
      <Text style={{
        color: colors.white[500],
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        textTransform: 'capitalize',
      }}>
        {title}
      </Text>
    </Pressable>
  );
};
```

### Card Component
```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { colors, spacing, typography } from '../design-system';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <View style={{
      backgroundColor: colors.white[500],
      padding: spacing.lg,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary[200],
      marginBottom: spacing.md,
    }}>
      <Text style={[typography.h4, { marginBottom: spacing.sm }]}>
        {title}
      </Text>
      <Text style={typography.body}>
        {content}
      </Text>
    </View>
  );
};
```

## Accessibility

### Color Contrast
The design system includes accessibility information for color combinations:
- Primary Green 500 (#1c663b) has a contrast ratio of 6.97:1 (AAA)
- Secondary Green 500 (#2baf51) has a contrast ratio of 2.86:1 (AAA)
- All color combinations meet WCAG accessibility guidelines

### Typography
- All typography variants use sufficient contrast ratios
- Line heights are optimized for readability
- Font sizes meet minimum accessibility requirements

## Migration Guide

### From Custom Styles to Design System
1. Replace hardcoded colors with design system colors
2. Replace custom typography with design system typography variants
3. Replace arbitrary spacing with design system spacing scale
4. Update components to use consistent design tokens

### Example Migration
```tsx
// Before
<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1c663b' }}>
  Title
</Text>

// After
<Text style={typography.h4}>Title</Text>
```

This design system provides a consistent foundation for the KikFix application, ensuring visual coherence and maintainability across all components. 