'use client'; // Ensure this file is a Client Component

import { useTheme } from './themeContext';

export default function ThemeLayout({ children }) {
  const { theme } = useTheme();

  // Define styles for light and dark themes
  const backgroundColor = theme === 'light' ? 'white' : 'navy';

  return (
    <div style={{ backgroundColor, minHeight: '100vh', transition: 'background-color 0.3s' }}>
      {children}
    </div>
  );
}
