import { createContext, useContext, useState, useEffect, useMemo } from "react";

type Theme = "light" | "dark" | "islamic";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}

const themes = {
  light: {
    primary: "#1B4B3A",
    secondary: "#C49B61",
    accent: "#8B4513",
    background: "#F5F2E8",
    surface: "#FFFFFF",
    text: "#2F3A2D",
    textSecondary: "#6B7280",
  },
  dark: {
    primary: "#22C55E",
    secondary: "#FCD34D",
    accent: "#F59E0B",
    background: "#1F2937",
    surface: "#374151",
    text: "#F9FAFB",
    textSecondary: "#D1D5DB",
  },
  islamic: {
    primary: "#166534",
    secondary: "#D97706",
    accent: "#059669",
    background: "linear-gradient(135deg, #F0FDF4 0%, #FEF3C7 100%)",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  },
} as const;

// Create context with default value to avoid undefined
const defaultContextValue: ThemeContextType = {
  theme: "islamic",
  setTheme: () => {},
  colors: themes.islamic,
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function DlniThemeProvider({
  children,
  defaultTheme = "islamic",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("dlni-theme") as Theme;
      if (savedTheme && savedTheme in themes) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dlni-theme", theme);

      // Apply theme to document root
      const root = document.documentElement;
      const colors = themes[theme];

      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--dlni-${key}`, value);
      });
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  }, [theme]);

  const value: ThemeContextType = useMemo(
    () => ({
      theme,
      setTheme,
      colors: themes[theme],
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useDlniTheme() {
  const context = useContext(ThemeContext);
  // Since we provide a default value, context should never be undefined
  return context;
}
