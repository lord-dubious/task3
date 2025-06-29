/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Material Design 3 Color System - Dark Theme with Black/Purple
        'md3': {
          // Primary (Purple accent)
          'primary': '#BB86FC',
          'on-primary': '#000000',
          'primary-container': '#3700B3',
          'on-primary-container': '#E1C4FF',
          
          // Secondary
          'secondary': '#CCC2DC',
          'on-secondary': '#332D41',
          'secondary-container': '#4A4458',
          'on-secondary-container': '#E8DEF8',
          
          // Tertiary
          'tertiary': '#EFB8C8',
          'on-tertiary': '#492532',
          'tertiary-container': '#633B48',
          'on-tertiary-container': '#FFD8E4',
          
          // Error
          'error': '#F2B8B5',
          'on-error': '#601410',
          'error-container': '#8C1D18',
          'on-error-container': '#F9DEDC',
          
          // Background & Surface
          'background': '#000000',
          'on-background': '#E6E0E9',
          'surface': '#0F0F0F',
          'on-surface': '#E6E0E9',
          'surface-variant': '#1A1A1A',
          'on-surface-variant': '#CAC4D0',
          'surface-container-lowest': '#0A0A0A',
          'surface-container-low': '#141414',
          'surface-container': '#1E1E1E',
          'surface-container-high': '#282828',
          'surface-container-highest': '#323232',
          
          // Outline
          'outline': '#938F99',
          'outline-variant': '#49454F',
          
          // Inverse
          'inverse-surface': '#E6E0E9',
          'inverse-on-surface': '#322F35',
          'inverse-primary': '#6750A4',
          
          // Surface tints
          'surface-tint': '#BB86FC',
          'surface-bright': '#3B383E',
          'surface-dim': '#141218',
          
          // Shadow & Scrim
          'shadow': '#000000',
          'scrim': '#000000',
        },
        
        // Legacy colors for backward compatibility
        'twitter-blue': '#1DA1F2',
        'black': '#000000',
        'gray': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        'purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Material Design 3 Typography Scale
        'display-large': ['57px', { lineHeight: '64px', fontWeight: '400' }],
        'display-medium': ['45px', { lineHeight: '52px', fontWeight: '400' }],
        'display-small': ['36px', { lineHeight: '44px', fontWeight: '400' }],
        'headline-large': ['32px', { lineHeight: '40px', fontWeight: '400' }],
        'headline-medium': ['28px', { lineHeight: '36px', fontWeight: '400' }],
        'headline-small': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'title-large': ['22px', { lineHeight: '28px', fontWeight: '500' }],
        'title-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'title-small': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'label-large': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'label-medium': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'label-small': ['11px', { lineHeight: '16px', fontWeight: '500' }],
        'body-large': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-medium': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-small': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        'none': '0px',
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
        'full': '9999px',
      },
      boxShadow: {
        // Material Design 3 Elevation
        'elevation-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'elevation-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)',
        'elevation-4': '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.3)',
        'elevation-5': '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.3)',
        'purple-glow': '0 0 20px rgba(187, 134, 252, 0.3)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      zIndex: {
        'dropdown': '9999',
        'modal': '9990',
        'toast': '10000',
        'tooltip': '9980',
      },
    },
  },
  plugins: [],
};