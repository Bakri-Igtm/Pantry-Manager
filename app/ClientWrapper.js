'use client'; // This file is a client component

import { ThemeProvider, useTheme } from './themeContext'; // Adjust the path as needed
import ThemeLayout from './ThemeLayout'; // Ensure the path is correct

export default function ClientWrapper({ children }) {
  return (
    <ThemeProvider>
      <ThemeLayout>
        {children}
      </ThemeLayout>
    </ThemeProvider>
  );
}
