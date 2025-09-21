// Bảng màu hoàng hôn cho ứng dụng MemoApp
export const SunsetColors = {
  // Màu chính
  primary: {
    sunset: '#FF6B6B', // Hồng cam chủ đạo
    golden: '#FFD93D', // Vàng rực rỡ
    orange: '#FFB74D', // Cam ấm áp
    peach: '#FFAB91', // Hồng đào nhạt
  },

  // Màu nền
  background: {
    dark: '#2C1810', // Nền tối nâu ấm
    gradient: '#3E2723', // Nâu gradient
    overlay: '#4A2C2A', // Overlay tối
  },

  // Màu text
  text: {
    light: '#F4E4BC', // Vàng nhạt cho text sáng
    dark: '#2C1810', // Tối cho text trên nền sáng
    accent: '#FF8A65', // Cam nhạt cho accent
  },

  // Màu tương tác
  interactive: {
    button: 'rgba(255, 183, 77, 0.85)', // Nút bình thường
    buttonPressed: 'rgba(255, 107, 107, 0.9)', // Nút được nhấn
    recording: 'rgba(255, 107, 107, 0.9)', // Trạng thái recording
    shadow: '#FF6B6B', // Màu shadow
  },

  // Gradient colors
  gradients: {
    sunset: ['#FF6B6B', '#FFD93D', '#FFAB91'], // Gradient hoàng hôn
    warm: ['#FFB74D', '#FF8A65', '#FFAB91'], // Gradient ấm áp
  },
};

// Utility functions để làm việc với màu
export const SunsetUtils = {
  // Tạo màu với độ trong suốt
  withOpacity: (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },

  // Tạo shadow style
  createShadow: (color: string = SunsetColors.interactive.shadow, opacity: number = 0.3) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: opacity,
    shadowRadius: 4,
    elevation: 5,
  }),
};
