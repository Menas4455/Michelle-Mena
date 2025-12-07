'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductGrid from '../Products/ProductGrid';
import { Product } from '@/src/types';
import { useTheme } from '../Theme/ThemeProvider';

interface AllCollectionsProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  activeFilter?: string; // Nueva prop
  onFilterChange?: (filterType: string, filterValue: string) => void; // Nueva prop
}

export default function AllCollections({ 
  products, 
  onViewDetails, 
  activeFilter = '', 
  onFilterChange 
}: AllCollectionsProps) {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const itemsPerPage = 15;
  const productsPerRow = 5;

  // Función para aplicar filtros
  const applyFilter = (productsList: Product[]) => {
    if (!activeFilter) return productsList;
    
    const [type, value] = activeFilter.split(':');
    
    switch (type) {
      case 'discount':
        if (value === 'hasDiscount') {
          return productsList.filter(product => (product as any).hasDiscount === true);
        }
        break;
      
      case 'category':
        return productsList.filter(product => product.category === value);
      
      case 'shipping':
        if (value === 'freeShipping') {
          return productsList.filter(product => (product as any).freeShipping === true);
        }
        break;
      
      case 'feature':
        if (value === 'hasWarranty') {
          return productsList.filter(product => (product as any).hasWarranty === true);
        } else if (value === 'vipAccess') {
          return productsList.filter(product => (product as any).vipAccess === true);
        }
        break;
    }
    
    return productsList;
  };

  // Filtrar productos basado en búsqueda Y filtro activo
  const filteredProducts = applyFilter(
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Calcular paginación
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Resetear a página 1 cuando cambia la búsqueda o el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, activeFilter]);

  // Generar array de páginas para mostrar en la paginación
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    
    return pages;
  };

  // Obtener nombre del filtro activo
  const getFilterDisplayName = () => {
    if (!activeFilter) return '';
    
    const [type, value] = activeFilter.split(':');
    
    switch (type) {
      case 'discount':
        return 'Ofertas Exclusivas';
      case 'category':
        return `Colección ${value}`;
      case 'shipping':
        return 'Envío Gratis';
      case 'feature':
        return value === 'hasWarranty' ? 'Con Garantía' : 'Acceso VIP';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con búsqueda y controles */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-linear-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50' 
            : 'bg-linear-to-r from-gray-50 to-white border-gray-200'
        } border backdrop-blur-sm`}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Título y estadísticas */}
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Todas las Colecciones
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Explora nuestro catálogo completo de {products.length} productos
              </p>
              {activeFilter && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}>
                  {getFilterDisplayName()}
                </span>
              )}
            </div>
            {searchTerm && (
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredProducts.length} resultados encontrados para "{searchTerm}"
              </p>
            )}
          </div>

          {/* Controles de vista y orden */}
          <div className="flex flex-wrap gap-3">
            {/* Botones de vista */}
            <div className={`flex rounded-lg p-1 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? isDarkMode 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-100 text-purple-700'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Vista en cuadrícula"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list' 
                    ? isDarkMode 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-100 text-purple-700'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Vista en lista"
              >
                <List size={20} />
              </button>
            </div>

            {/* Selector de orden */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-4 py-2 rounded-lg text-sm ${
                isDarkMode 
                  ? 'bg-gray-800/50 text-white border-gray-700/50' 
                  : 'bg-white text-gray-900 border-gray-300'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500/30`}
            >
              <option value="name">Ordenar por nombre</option>
              <option value="price">Ordenar por precio</option>
              <option value="rating">Ordenar por rating</option>
            </select>

            {/* Botón para limpiar filtro activo */}
            {activeFilter && onFilterChange && (
              <button
                onClick={() => onFilterChange('clear', '')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } transition-colors duration-300 flex items-center space-x-2`}
              >
                <span>Limpiar filtro</span>
                <span>✕</span>
              </button>
            )}
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mt-6 max-w-2xl mx-auto">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Buscar productos por nombre, descripción o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-sm ${
              isDarkMode 
                ? 'bg-gray-800/50 text-white placeholder-gray-400 border-gray-700/50' 
                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-purple-500/30`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-sm ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>

      {/* Indicador de filtro activo */}
      {activeFilter && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            isDarkMode 
              ? 'bg-linear-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/30' 
              : 'bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-linear-to-r ${
                isDarkMode ? 'from-purple-500 to-pink-500' : 'from-purple-600 to-pink-600'
              }`}>
                <span className="text-white font-medium">✓</span>
              </div>
              <div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  Filtro activo: <strong>{getFilterDisplayName()}</strong>
                </span>
                <div className={`text-xs mt-1 ${
                  isDarkMode ? 'text-purple-400/80' : 'text-purple-600/80'
                }`}>
                  {filteredProducts.length} productos encontrados
                </div>
              </div>
            </div>
            {onFilterChange && (
              <button 
                onClick={() => onFilterChange('clear', '')}
                className={`text-sm px-4 py-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } transition-colors duration-300 flex items-center space-x-2`}
              >
                <span>Limpiar filtro</span>
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Productos */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${currentPage}-${searchTerm}-${activeFilter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Vista en cuadrícula */}
          {viewMode === 'grid' ? (
            <div className="space-y-8">
              {/* Filas de productos */}
              {Array.from({ length: Math.ceil(paginatedProducts.length / productsPerRow) }).map((_, rowIndex) => {
                const rowProducts = paginatedProducts.slice(
                  rowIndex * productsPerRow,
                  (rowIndex + 1) * productsPerRow
                );

                return (
                  <motion.div
                    key={rowIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                  >
                    {rowProducts.map((product) => (
                      <div key={product.id} className="h-full">
                        {/* Card de producto renderizada directamente */}
                        <div 
                          onClick={() => onViewDetails(product)}
                          className={`h-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                            isDarkMode 
                              ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50' 
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          } border shadow-lg`}
                        >
                          {/* Imagen del producto */}
                          <div className="relative overflow-hidden aspect-square">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                              {product.hasDiscount && (
                                <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                                  OFERTA
                                </span>
                              )}
                              {product.vipAccess && (
                                <span className="px-2 py-1 text-xs font-bold bg-purple-600 text-white rounded-full">
                                  VIP
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Contenido */}
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className={`font-bold text-lg truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {product.name}
                              </h3>
                            </div>
                            
                            <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {product.description}
                            </p>
                            
                            {/* Precio */}
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  ${product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                  <span className={`text-sm line-through ml-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {product.category}
                              </span>
                            </div>
                            
                            {/* Rating y stock */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className={`mr-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>
                                  ⭐
                                </span>
                                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {product.rating}
                                </span>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                product.inStock
                                  ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                                  : (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700')
                              }`}>
                                {product.inStock ? 'En stock' : 'Agotado'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Placeholders para filas incompletas */}
                    {rowProducts.length < productsPerRow &&
                      Array.from({ length: productsPerRow - rowProducts.length }).map((_, i) => (
                        <div key={`placeholder-${i}`} className="h-full opacity-0" />
                      ))
                    }
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Vista en lista
            <div className="space-y-4">
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => onViewDetails(product)}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gray-800/30 hover:bg-gray-800/50 border-gray-700/50' 
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  } border`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {product.name}
                        </h3>
                        <span className={`font-bold ${
                          isDarkMode ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${
                            isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                          }`}>
                            ⭐ {product.rating}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            product.inStock
                              ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                              : (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700')
                          }`}>
                            {product.inStock ? 'En stock' : 'Agotado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Paginación */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12"
        >
          {/* Información de página */}
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedProducts.length)} 
            de {sortedProducts.length} productos
          </div>

          {/* Controles de paginación */}
          <div className="flex items-center space-x-2">
            {/* Botón anterior */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? isDarkMode 
                    ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Página anterior"
            >
              ← Anterior
            </button>

            {/* Números de página */}
            <div className="flex items-center space-x-1">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                    currentPage === pageNum
                      ? isDarkMode
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : isDarkMode
                        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              
              {totalPages > getPageNumbers()[getPageNumbers().length - 1] && (
                <>
                  <span className={`px-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                      currentPage === totalPages
                        ? isDarkMode
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                        : isDarkMode
                          ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? isDarkMode 
                    ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Página siguiente"
            >
              Siguiente →
            </button>
          </div>
        </motion.div>
      )}

      {/* Indicador de búsqueda vacía */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center py-12 rounded-2xl ${
            isDarkMode 
              ? 'bg-gray-800/30 border-gray-700/50' 
              : 'bg-gray-50 border-gray-200'
          } border`}
        >
          <Search className={`w-12 h-12 mx-auto ${
            isDarkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h3 className={`text-xl font-semibold mt-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            No se encontraron productos
          </h3>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {searchTerm 
              ? `No hay resultados para "${searchTerm}"${activeFilter ? ` con el filtro ${getFilterDisplayName()}` : ''}` 
              : `No hay productos disponibles${activeFilter ? ` con el filtro ${getFilterDisplayName()}` : ''}`
            }
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } transition-colors duration-300`}
              >
                Limpiar búsqueda
              </button>
            )}
            {activeFilter && onFilterChange && (
              <button
                onClick={() => onFilterChange('clear', '')}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                } transition-colors duration-300`}
              >
                Limpiar filtro
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}