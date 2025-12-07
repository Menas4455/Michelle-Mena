'use client';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '@/src/types';
import { useTheme } from '../Theme/ThemeProvider';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { isDarkMode } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: product.currency
    }).format(price);
  };

  return (
    <div className={`group relative rounded-2xl overflow-hidden ${
      isDarkMode 
        ? 'bg-linear-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm'
        : 'bg-linear-to-b from-white/50 to-gray-50/50 backdrop-blur-sm'
    } border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'} transition-all duration-300 hover:shadow-xl ${
      isDarkMode ? 'hover:shadow-purple-500/10' : 'hover:shadow-purple-500/20'
    }`}>
      {/* Imagen del producto */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Etiqueta de descuento */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-linear-to-r from-red-500 to-orange-500 text-white text-xs font-bold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Botones de acción */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full ${
              isFavorite ? 'bg-red-500 text-white' : 
              isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-900 hover:bg-white'
            } backdrop-blur-sm transition-all duration-300`}
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart size={18} className={isFavorite ? "fill-current" : ""} />
          </button>
          
          <button
            onClick={() => onViewDetails(product)}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-900 hover:bg-white'
            } backdrop-blur-sm transition-all duration-300`}
            aria-label="Ver detalles"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Información del producto */}
      <div className="p-4">
        {/* Categoría y rating */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {product.category}
          </span>
          
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Nombre del producto */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-purple-500 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {product.description}
        </p>

        {/* Precio y stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            
            {product.originalPrice && (
              <span className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className={`text-xs px-2 py-1 rounded-full ${
            product.inStock 
              ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
              : (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700')
          }`}>
            {product.inStock ? 'En stock' : 'Agotado'}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}