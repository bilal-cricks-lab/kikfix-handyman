import { TextStyle } from 'react-native';

// Typography variants based on the exact design specifications you provided
export const typography = {
  h1: {
    fontSize: 24,
    lineHeight: 34,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  h2: {
    fontSize: 22,
    lineHeight: 32,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  h3: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  h4: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  h5: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  h6: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  bodyXs: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
  link: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600' as TextStyle['fontWeight'],
    textTransform: 'capitalize' as TextStyle['textTransform'],
  },
} as const;

// Tailwind classes for typography - Based on your exact specifications
export const typographyClasses = {
  h1: 'text-2xl font-bold font-poppins-bold text-black capitalize leading-loose',
  h2: 'text-xl font-bold font-poppins-bold text-black capitalize leading-loose',
  h3: 'text-xl font-bold font-poppins-bold text-black capitalize leading-loose',
  h4: 'text-lg font-bold font-poppins-bold text-black capitalize leading-7',
  h5: 'text-base font-bold font-poppins-bold text-black capitalize leading-relaxed',
  h6: 'text-sm font-bold font-poppins-bold text-black capitalize leading-normal',
  body: 'text-base font-normal font-poppins text-black capitalize leading-relaxed',
  bodySmall: 'text-sm font-normal font-poppins text-black capitalize leading-normal',
  bodyXs: 'text-xs font-normal font-poppins text-black capitalize leading-snug',
  link: 'text-xs font-semibold font-poppins-semibold text-black capitalize leading-snug',
} as const;

// Typography variant types
export type TypographyVariant = keyof typeof typography;
export type TypographyClass = keyof typeof typographyClasses; 