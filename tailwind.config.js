/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.js"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
        'poppins-light': ['Poppins-Light'],
        'poppins-thin': ['Poppins-Thin'],
        'poppins-extralight': ['Poppins-ExtraLight'],
        'poppins-black': ['Poppins-Black'],
        'poppins-italic': ['Poppins-Italic'],
        'poppins-medium-italic': ['Poppins-MediumItalic'],
        'poppins-semibold-italic': ['Poppins-SemiBoldItalic'],
        'poppins-bold-italic': ['Poppins-BoldItalic'],
        'poppins-light-italic': ['Poppins-LightItalic'],
        'poppins-thin-italic': ['Poppins-ThinItalic'],
        'poppins-extralight-italic': ['Poppins-ExtraLightItalic'],
        'poppins-black-italic': ['Poppins-BlackItalic'],
        'roboto': ['Roboto-Regular'],
        'roboto-bold': ['Roboto-Bold'],
        'roboto-medium': ['Roboto-Medium'],
      },
      fontSize: {
        // Typography system based on exact specifications you provided
        'xs': ['12px', { lineHeight: '22px', fontWeight: '400' }],      // Body extra small, Link
        'sm': ['14px', { lineHeight: '24px', fontWeight: '400' }],      // Body small, H6
        'base': ['16px', { lineHeight: '26px', fontWeight: '400' }],    // Body, H5
        'lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],      // H4
        'xl': ['20px', { lineHeight: '30px', fontWeight: '400' }],      // H3
        '2xl': ['22px', { lineHeight: '32px', fontWeight: '400' }],     // H2
        '3xl': ['24px', { lineHeight: '34px', fontWeight: '400' }],     // H1
        
        // Legacy typography classes for backward compatibility
        'h1': ['24px', { lineHeight: '34px', fontWeight: '700' }],
        'h2': ['22px', { lineHeight: '32px', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '30px', fontWeight: '700' }],
        'h4': ['18px', { lineHeight: '28px', fontWeight: '700' }],
        'h5': ['16px', { lineHeight: '26px', fontWeight: '700' }],
        'h6': ['14px', { lineHeight: '24px', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'body-small': ['14px', { lineHeight: '24px', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '22px', fontWeight: '400' }],
        'link': ['12px', { lineHeight: '22px', fontWeight: '600' }],
      },
      lineHeight: {
        'snug': '22px',      // Body extra small, Link
        'normal': '24px',    // Body small, H6
        'relaxed': '26px',   // Body, H5
        '7': '28px',         // H4
        'loose': '30px',     // H3
        '10': '32px',        // H2
        '12': '34px',        // H1
      },
      colors: {
        // Primary Green (Secondary Green in the design) - Only what you provided
        primary: {
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
        
        // Secondary Green (Primary Green in the design) - Only what you provided
        secondary: {
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
        
        // Black color scale - Only what you provided
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
        
        // White color scale - Only what you provided
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
        
        // Tertiary Green (Interactive states) - Only what you provided
        tertiary: {
          light: '#f6fdf8',        // Light
          'light-hover': '#f2fcf5',   // Light :hover
          'light-active': '#e4f8ea',  // Light :active
          normal: '#a9eabc',       // Normal
          'normal-hover': '#98d3a9',  // Normal :hover
          'normal-active': '#87bb96', // Normal :active
          dark: '#7fb08d',         // Dark
          'dark-hover': '#658c71',    // Dark :hover
          'dark-active': '#4c6955',   // Dark :active
          darker: '#3b5242',       // Darker
        },
      },
      spacing: {
        // Custom spacing scale
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

