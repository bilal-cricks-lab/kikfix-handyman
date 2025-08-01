// Color palette for KikFixHandyman design system - Only the colors you provided
export const colors = {
  // Primary Green (Secondary Green in the design)
  primary: {
    40: '#22c55e',   // primary green-40
    50: '#e8f0eb',   // primary green-50
    100: '#b9d0c2',  // primary green-100
    200: '#97b9a5',  // primary green-200
    300: '#67987c',  // primary green-300
    400: '#498562',  // primary green-400
    500: '#1c663b',  // primary green-500
    600: '#195d36',  // primary green-600
    700: '#14482a',  // primary green-700
    800: '#0f3820',  // primary green-800
    900: '#0c2b19',  // primary green-900
  },
  
  // Secondary Green (Primary Green in the design)
  secondary: {
    40: '#D1FAE5',
    50: '#eaf7ee',   // secondary green-50
    100: '#bde6c9',  // secondary green-100
    200: '#9ddaaf',  // secondary green-200
    300: '#71c98a',  // secondary green-300
    400: '#55bf74',  // secondary green-400
    500: '#2baf51',  // secondary green-500
    600: '#279f4a',  // secondary green-600
    700: '#1f7c3a',  // secondary green-700
    800: '#18602d',  // secondary green-800
    900: '#124a22',  // secondary green-900
  },
  
  // Black color scale
  black: {
    50: '#e6e6e6',   // black-50
    100: '#b0b0b0',  // black-100
    200: '#8a8a8a',  // black-200
    300: '#545454',  // black-300
    400: '#333333',  // black-400
    500: '#000000',  // black-500
    600: '#000000',  // black-600
    700: '#000000',  // black-700
    800: '#000000',  // black-800
    900: '#000000',  // black-900
  },

  gray: {
    100: '#f3f4f6',
    500: '#6b7280',
    600: '#4B5563'
  },

  // Blue color
  blue: {
    50: '#2563eb'
  },
  
  // White color scale
  white: {
    50: '#ffffff',   // white-50
    100: '#ffffff',  // white-100
    200: '#ffffff',  // white-200
    300: '#ffffff',  // white-300
    400: '#ffffff',  // white-400
    500: '#ffffff',  // white-500
    600: '#e8e8e8',  // white-600
    700: '#b5b5b5',  // white-700
    800: '#8c8c8c',  // white-800
    900: '#6b6b6b',  // white-900
  },
  
  // Tertiary Green (Interactive states)
  tertiary: {
    light: '#f6fdf8',        // Light
    lightHover: '#f2fcf5',   // Light :hover
    lightActive: '#e4f8ea',  // Light :active
    normal: '#a9eabc',       // Normal
    normalHover: '#98d3a9',  // Normal :hover
    normalActive: '#87bb96', // Normal :active
    dark: '#7fb08d',         // Dark
    darkHover: '#658c71',    // Dark :hover
    darkActive: '#4c6955',   // Dark :active
    darker: '#3b5242',       // Darker
  },
} as const;

// Color type definitions
export type ColorScale = keyof typeof colors;
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Utility function to get color value
export const getColor = (scale: ColorScale, shade: ColorShade = 500): string => {
  const colorScale = colors[scale] as Record<ColorShade, string>;
  return colorScale[shade];
};

// Accessibility information for colors
export const colorAccessibility = {
  primary: {
    50: { contrast: '18.09 AAA', ratio: '1.16' },
    100: { contrast: '12.86 AAA', ratio: '1.63' },
    200: { contrast: '9.80 AAA', ratio: '2.14' },
    300: { contrast: '6.36 AA', ratio: '3.30 AA' },
    400: { contrast: '4.81 AA', ratio: '4.36 AA' },
    500: { contrast: '3.01', ratio: '6.97 AAA' },
    600: { contrast: '2.66', ratio: '7.89 AAA' },
    700: { contrast: '1.99', ratio: '10.55 AAA' },
    800: { contrast: '1.61', ratio: '13.07 AAA' },
    900: { contrast: '1.38', ratio: '15.27 AAA' },
  },
  secondary: {
    50: { contrast: '19.04 AAA', ratio: '1.10' },
    100: { contrast: '15.33 AAA', ratio: '1.37' },
    200: { contrast: '13.08 AAA', ratio: '1.61' },
    300: { contrast: '10.42 AAA', ratio: '2.01' },
    400: { contrast: '9.09 AAA', ratio: '2.31' },
    500: { contrast: '7.35 AAA', ratio: '2.86' },
    600: { contrast: '6.14 AA', ratio: '3.42 AA' },
    700: { contrast: '4.00 AA', ratio: '5.25 AAA' },
    800: { contrast: '2.75', ratio: '7.64 AAA' },
    900: { contrast: '2.03', ratio: '10.35 AAA' },
  },
} as const; 