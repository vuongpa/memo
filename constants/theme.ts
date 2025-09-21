/**
 * Sunset-themed colors for the MemoApp. 
 * Inspired by golden hour and warm sunset tones.
 */

import { Platform } from 'react-native';

// Sunset theme tint colors
const tintColorLight = '#FF6B6B';    // Warm coral for light mode
const tintColorDark = '#FFD93D';     // Golden yellow for dark mode

export const Colors = {
  light: {
    text: '#2C1810',           // Dark brown text
    background: '#FFF8E7',     // Warm cream background
    tint: tintColorLight,
    icon: '#FF8A65',           // Warm orange icons
    tabIconDefault: '#FFAB91', // Peachy default icons
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F4E4BC',           // Warm light text
    background: '#2C1810',     // Dark brown background
    tint: tintColorDark,
    icon: '#FFB74D',           // Golden orange icons
    tabIconDefault: '#FF8A65', // Warm orange default
    tabIconSelected: tintColorDark,
  },
  
  // Sunset theme specific colors
  sunset: {
    primary: '#FF6B6B',        // Main coral
    secondary: '#FFD93D',      // Golden yellow
    accent: '#FFAB91',         // Peach accent
    warm: '#FFB74D',           // Warm orange
    gradient: {
      start: '#FF6B6B',
      middle: '#FFD93D', 
      end: '#FFAB91'
    }
  }
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
