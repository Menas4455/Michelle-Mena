'use client';
import { X, Heart, Star, Truck, Shield } from 'lucide-react';
import { Product } from '@/src/types';
import { useTheme } from '../Theme/ThemeProvider';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { isDarkMode } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product || !isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: product.currency
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden ${
        isDarkMode 
          ? 'bg-linear-to-b from-gray-900 to-gray-950'
          : 'bg-linear-to-b from-white to-gray-50'
      } shadow-2xl`}>
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm text-white transition-all duration-300"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Imagen */}
          <div className="relative h-96 lg:h-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Favorito */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-4 left-4 p-3 rounded-full ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm text-white'
              } transition-all duration-300`}
              aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <Heart size={20} className={isFavorite ? "fill-current" : ""} />
            </button>
          </div>

          {/* Información */}
          <div className={`p-8 overflow-y-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {/* Categoría y rating */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {product.category}
              </span>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  (128 reviews)
                </span>
              </div>
            </div>

            {/* Nombre y precio */}
            <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
            
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-4xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
              
              {product.originalPrice && (
                <span className={`text-xl line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              
              {product.originalPrice && (
                <span className="px-3 py-1 rounded-full bg-linear-to-r from-red-500 to-orange-500 text-white text-sm font-bold">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Descripción */}
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {product.description}
            </p>

            {/* Tallas disponibles */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Tallas disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className={`px-4 py-2 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Colores disponibles */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Colores disponibles</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className={`relative w-10 h-10 rounded-full border-2 ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        aria-label={`Color ${color}`}
                        title={color}
                      />
                    ))}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {product.colors.length} opciones de color
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Características</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Beneficios */}
            <div className={`grid grid-cols-2 gap-4 mb-8 p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-linear-to-r from-emerald-500 to-green-500">
                  <Truck size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Envío Gratis</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Para pedidos +$100</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500">
                  <Shield size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Devolución</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>30 días garantía</p>
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className={`p-4 rounded-xl mb-8 ${
              product.inStock
                ? isDarkMode ? 'bg-green-900/20 border-green-800/50' : 'bg-green-50 border-green-200'
                : isDarkMode ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50 border-red-200'
            } border`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {product.inStock ? '✓ En stock' : '✗ Agotado'}
                  </p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {product.inStock 
                      ? 'Listo para envío inmediato' 
                      : 'Próxima reposición: 15 días'}
                  </p>
                </div>
                {product.inStock && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-500">12</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>unidades restantes</p>
                  </div>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className={`flex-1 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  product.inStock
                    ? 'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/30'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Agregar al catálogo' : 'Producto agotado'}
              </button>
              
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  isFavorite
                    ? 'bg-linear-to-r from-red-500 to-orange-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}