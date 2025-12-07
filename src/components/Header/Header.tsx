'use client';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useTheme } from '../Theme/ThemeProvider';

export default function Header() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    dark: {
      bg: 'bg-gradient-to-b from-gray-900 via-purple-900/30 to-gray-950',
      text: 'text-white',
      accentGradient: 'from-purple-500 to-pink-500',
      waveColor: 'text-gray-950',
      particleColor: 'bg-purple-500/20',
      textMuted: 'text-gray-300',
      borderColor: 'border-white/20',
      buttonSecondary: 'bg-white/10 hover:bg-white/20'
    },
    light: {
      bg: 'bg-white',
      text: 'text-gray-900',
      accentGradient: 'from-purple-600 to-pink-600',
      waveColor: 'text-white',
      particleColor: 'bg-purple-300/40',
      textMuted: 'text-gray-600',
      borderColor: 'border-gray-300/30',
      buttonSecondary: 'bg-gray-900/5 hover:bg-gray-900/10 border-gray-300/50'
    }
  };

  const colors = isDarkMode ? themeColors.dark : themeColors.light;

  return (
    <header className={`relative ${colors.bg} ${colors.text} min-h-[80vh] relative`}>
      {/* Partículas de fondo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${colors.particleColor}`}
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 3}s infinite ease-in-out ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Contenido del header */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className={`inline-block px-4 py-2 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-400/30'} mb-6`}>
            <span className={`text-sm font-semibold bg-linear-to-r ${isDarkMode ? 'from-purple-300 to-pink-300' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
              ✦ Colección Exclusiva Primavera 2024 ✦
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="block">Moda MENA</span>
            <span className="block">
              <span className={`text-transparent bg-clip-text bg-linear-to-r ${colors.accentGradient}`}>
                Elegancia & Tradición
              </span>
            </span>
          </h1>

          <p className={`text-xl ${colors.textMuted} max-w-2xl mb-8`}>
            Descubre nuestra colección inspirada en la rica herencia cultural del Medio Oriente y Norte de África, 
            fusionada con diseño contemporáneo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`group px-8 py-4 rounded-full bg-linear-to-r ${isDarkMode ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg ${isDarkMode ? 'hover:shadow-purple-500/30' : 'hover:shadow-purple-400/30'} text-white`}>
              <span>Explorar Colección</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <button className={`px-8 py-4 rounded-full ${colors.buttonSecondary} backdrop-blur-sm border ${colors.borderColor} transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2`}>
              <Heart size={20} />
              <span>Ver Favoritos</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { number: '200+', label: 'Diseñadores' },
              { number: '1.2K+', label: 'Productos' },
              { number: '4.9', label: 'Rating' },
              { number: '5K+', label: 'Clientes' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold bg-linear-to-r ${colors.accentGradient} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}