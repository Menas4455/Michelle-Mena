'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import ThemeToggle from '../Theme/ThemeToggle';
import { useTheme } from '../Theme/ThemeProvider';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Inicio', 'Colecciones', 'Nuevo', 'Diseñadores', 'Ofertas', 'Contacto'];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? `${isDarkMode 
              ? 'bg-gray-900/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]' 
              : 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'
            } py-4 border-b ${
              isDarkMode ? 'border-gray-800/70' : 'border-gray-300/70'
            }`
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wider">
            <span className={`text-transparent bg-clip-text bg-linear-to-r ${
              isDarkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
            } ${isScrolled ? 'drop-shadow-lg' : ''}`}>
              MENA
            </span>
            <span className={`ml-1 ${
              isScrolled 
                ? isDarkMode ? 'text-white' : 'text-gray-900'
                : isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Style
            </span>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`relative group transition-all duration-300 ${
                  isScrolled 
                    ? isDarkMode 
                      ? 'text-gray-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/10' 
                      : 'text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-black/10'
                    : isDarkMode 
                      ? 'text-gray-200 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item}
                {!isScrolled && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                )}
              </a>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-3">
            {/* Buscador - aparece con efecto glass */}
            {isScrolled && (
              <div className="relative hidden md:block animate-fadeIn">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className={`pl-10 pr-4 py-2.5 rounded-full text-sm w-64 ${
                    isDarkMode 
                      ? 'bg-gray-800/40 text-white placeholder-gray-400 border-gray-700/50' 
                      : 'bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300/50'
                  } border backdrop-blur-sm focus:outline-none focus:ring-2 ${
                    isDarkMode ? 'focus:ring-purple-500/40' : 'focus:ring-purple-500/30'
                  } focus:border-transparent transition-all duration-300`}
                />
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            )}

            {/* Iconos con efecto glass cuando hay scroll */}
            <button 
              className={`p-2.5 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? isDarkMode 
                    ? 'bg-gray-800/40 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/30' 
                    : 'bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-gray-300/30'
                  : isDarkMode
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/10 hover:bg-black/20'
              } shadow-sm hover:shadow-md`}
              aria-label="Favoritos"
            >
              <Heart size={20} className={
                isScrolled 
                  ? (isDarkMode ? 'text-white' : 'text-gray-800') 
                  : (isDarkMode ? 'text-white' : 'text-gray-800')
              } />
            </button>

            <button 
              className={`p-2.5 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? isDarkMode 
                    ? 'bg-gray-800/70 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/30' 
                    : 'bg-white/70 hover:bg-white/70 backdrop-blur-sm border border-gray-300/30'
                  : isDarkMode
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/10 hover:bg-black/20'
              } shadow-sm hover:shadow-md`}
              aria-label="Carrito"
            >
              <ShoppingBag size={20} className={
                isScrolled 
                  ? (isDarkMode ? 'text-white' : 'text-gray-800') 
                  : (isDarkMode ? 'text-white' : 'text-gray-800')
              } />
            </button>

            {/* Toggle Tema con efecto glass */}
            <div>
              <ThemeToggle />
            </div>

            {/* Menú Móvil */}
            <button 
              className={`md:hidden p-2.5 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? isDarkMode 
                    ? 'bg-gray-800/40 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/30' 
                    : 'bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-gray-300/30'
                  : isDarkMode
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/10 hover:bg-black/20'
              } shadow-sm hover:shadow-md`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 rounded-2xl backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-800/50' 
              : 'bg-white/90 border-gray-300/50'
          } p-6 animate-in slide-in-from-top-5 duration-300`}>
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`block py-3 px-4 rounded-lg transition-all duration-300 mb-1 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-black/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            
            {/* Buscador móvil */}
            <div className="relative mt-6">
              <input
                type="text"
                placeholder="Buscar productos..."
                className={`w-full pl-10 pr-4 py-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-800/40 text-white placeholder-gray-400 border-gray-700/50' 
                    : 'bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300/50'
                } border backdrop-blur-sm focus:outline-none focus:ring-2 ${
                  isDarkMode ? 'focus:ring-purple-500/40' : 'focus:ring-purple-500/30'
                } focus:border-transparent`}
              />
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}