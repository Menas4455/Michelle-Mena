'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-500/20 hover:bg-yellow-500/30' : 'bg-gray-800/20 hover:bg-gray-800/30'} transition-all duration-300`}
      aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDarkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-gray-700" />}
    </button>
  );
}