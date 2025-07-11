// Spacing system for KikFix design system - Only what you provided
export const spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  '5xl': 128,
} as const;

// Spacing type definitions
export type SpacingSize = keyof typeof spacing;

// Utility function to get spacing value
export const getSpacing = (size: SpacingSize): number => {
  return spacing[size];
}; 