'use client';
import { Tag, Truck, Shield, Star } from 'lucide-react';
import { useTheme } from '../Theme/ThemeProvider';
import { motion } from 'framer-motion';

interface SideBannerProps {
  onFilterChange: (filterType: string, filterValue: string) => void;
  activeFilter?: string;
}

// Definir constantes fuera del componente para mejor rendimiento
const FEATURES = [
  {
    icon: Tag,
    title: 'Ofertas Exclusivas',
    description: 'Descuentos hasta 40% en colecciones seleccionadas',
    gradient: { dark: 'from-purple-500 to-pink-500', light: 'from-purple-600 to-pink-600' },
    filterType: 'discount',
    filterValue: 'hasDiscount'
  },
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En compras superiores a $100. Entrega 2-5 días',
    gradient: { dark: 'from-blue-500 to-cyan-500', light: 'from-blue-600 to-cyan-600' },
    filterType: 'shipping',
    filterValue: 'freeShipping'
  },
  {
    icon: Shield,
    title: 'Garantía',
    description: '30 días de devolución. Calidad garantizada',
    gradient: { dark: 'from-emerald-500 to-green-500', light: 'from-emerald-600 to-green-600' },
    filterType: 'feature',
    filterValue: 'hasWarranty'
  },
  {
    icon: Star,
    title: 'Cliente VIP',
    description: 'Acceso anticipado a nuevas colecciones',
    gradient: { dark: 'from-orange-500 to-yellow-500', light: 'from-orange-600 to-yellow-600' },
    filterType: 'feature',
    filterValue: 'vipAccess'
  }
];

const COLLECTIONS = [
  { 
    name: 'Abayas', 
    items: 45, 
    gradient: { dark: 'from-purple-500 to-pink-600', light: 'from-purple-600 to-pink-600' },
    filterType: 'category',
    filterValue: 'Abayas'
  },
  { 
    name: 'Kaftanes', 
    items: 32, 
    gradient: { dark: 'from-blue-500 to-cyan-500', light: 'from-blue-600 to-cyan-600' },
    filterType: 'category',
    filterValue: 'Kaftanes'
  },
  { 
    name: 'Hijabs', 
    items: 67, 
    gradient: { dark: 'from-emerald-500 to-green-500', light: 'from-emerald-600 to-green-600' },
    filterType: 'category',
    filterValue: 'Hijabs'
  },
  { 
    name: 'Bordados', 
    items: 28, 
    gradient: { dark: 'from-orange-500 to-yellow-500', light: 'from-orange-600 to-yellow-600' },
    filterType: 'category',
    filterValue: 'Bordados'
  }
];

export default function SideBanner({ onFilterChange, activeFilter }: SideBannerProps) {
  const { isDarkMode } = useTheme();

  // Helper function para obtener el color correcto
  const getGradient = (gradientObj: { dark: string; light: string }): string =>
    isDarkMode ? gradientObj.dark : gradientObj.light;

  const handleFeatureClick = (feature: typeof FEATURES[0]) => {
    const filterKey = `${feature.filterType}:${feature.filterValue}`;
    if (activeFilter === filterKey) {
      onFilterChange('clear', '');
    } else {
      onFilterChange(feature.filterType, feature.filterValue);
    }
  };

  const handleCollectionClick = (collection: typeof COLLECTIONS[0]) => {
    const filterKey = `${collection.filterType}:${collection.filterValue}`;
    if (activeFilter === filterKey) {
      onFilterChange('clear', '');
    } else {
      onFilterChange(collection.filterType, collection.filterValue);
    }
  };

  return (
    <aside className={`sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl p-6 ${
      isDarkMode 
        ? 'bg-linear-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-md border-gray-700/50'
        : 'bg-white border border-gray-200 text-gray-900'
    } border shadow-lg`}>
      
      <div className="space-y-8">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Catálogo MENA
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Explorar por categorías y características
          </p>
          
          {/* Botón para limpiar filtros */}
          {activeFilter && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onFilterChange('clear', '')}
              className={`mt-2 text-sm px-3 py-1 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } transition-colors duration-300 flex items-center space-x-1`}
            >
              <span>Limpiar filtros</span>
              <span>✕</span>
            </motion.button>
          )}
        </motion.div>

        {/* Características */}
        <div className="space-y-4">
          <h3 className={`font-semibold text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-800'
          }`}>
            Beneficios
          </h3>
          
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            const gradient = getGradient(feature.gradient);
            const isActive = activeFilter === `${feature.filterType}:${feature.filterValue}`;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  onClick={() => handleFeatureClick(feature)}
                  className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 cursor-pointer group ${
                    isActive 
                      ? isDarkMode 
                        ? 'bg-purple-900/30 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                        : 'bg-purple-100 border-2 border-purple-300 shadow-lg shadow-purple-200/50'
                      : isDarkMode 
                        ? 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <motion.div 
                    className={`p-2 rounded-lg bg-linear-to-r ${gradient} shadow-sm`}
                    animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className={`font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-purple-500 dark:text-purple-400' 
                        : isDarkMode 
                          ? 'text-gray-200 group-hover:text-purple-400' 
                          : 'text-gray-800 group-hover:text-purple-600'
                    }`}>
                      {feature.title}
                      {isActive && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2 inline-block"
                        >
                          ✓
                        </motion.span>
                      )}
                    </h4>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Colecciones */}
        <div className="space-y-4">
          <h3 className={`font-semibold text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-800'
          }`}>
            Colecciones
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {COLLECTIONS.map((collection, index) => {
              const gradient = getGradient(collection.gradient);
              const isActive = activeFilter === `${collection.filterType}:${collection.filterValue}`;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    onClick={() => handleCollectionClick(collection)}
                    className={`relative overflow-hidden rounded-xl p-4 cursor-pointer group transition-all duration-300 ${
                      isActive
                        ? isDarkMode
                          ? 'bg-linear-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20'
                          : 'bg-linear-to-br from-purple-100 to-pink-100 border-2 border-purple-300 shadow-lg shadow-purple-200/50'
                        : isDarkMode 
                          ? 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50' 
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {/* Gradiente de fondo */}
                    <div 
                      className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} 
                    />
                    
                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500"
                      />
                    )}
                    
                    <h4 className={`font-semibold relative z-10 ${
                      isActive
                        ? 'text-purple-600 dark:text-purple-400'
                        : isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {collection.name}
                    </h4>
                    
                    <p className={`text-xs mt-1 relative z-10 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {collection.items} productos
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Badge adicional para engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-6 p-4 rounded-xl text-center ${
            isDarkMode 
              ? 'bg-linear-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30' 
              : 'bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200'
          }`}
        >
          <p className={`text-sm font-medium ${
            isDarkMode ? 'text-purple-300' : 'text-purple-700'
          }`}>
            ✨ Nuevas colecciones cada semana
          </p>
          <p className={`text-xs mt-1 ${
            isDarkMode ? 'text-purple-400/80' : 'text-purple-600/80'
          }`}>
            Suscríbete para ser el primero en verlas
          </p>
        </motion.div>
      </div>
    </aside>
  );
}