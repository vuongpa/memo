import { Platform } from 'react-native';

const tintColorLight = '#FF6B6B';
const tintColorDark = '#FFD93D';

export const Colors = {
  light: {
    text: '#2C1810',
    background: '#FFF8E7',
    tint: tintColorLight,
    icon: '#FF8A65',
    tabIconDefault: '#FFAB91',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F4E4BC',
    background: '#2C1810',
    tint: tintColorDark,
    icon: '#FFB74D',
    tabIconDefault: '#FF8A65',
    tabIconSelected: tintColorDark,
  },
  sunset: {
    primary: '#FF6B6B',
    secondary: '#FFD93D',
    accent: '#FFAB91',
    warm: '#FFB74D',
    gradient: {
      start: '#FF6B6B',
      middle: '#FFD93D',
      end: '#FFAB91',
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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
