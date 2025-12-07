'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../Theme/ThemeProvider';

const carouselImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Colección Primavera',
    description: 'Nuevos diseños inspirados en la naturaleza'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Lujo Árabe',
    description: 'Elegancia tradicional con toque moderno'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Moda Urbana',
    description: 'Estilo contemporáneo para la ciudad'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Tradición Moderna',
    description: 'Fusionando culturas en cada diseño'
  }
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % carouselImages.length
    );
  };

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl">
      {/* Imágenes del carousel */}
      <div className="relative h-full">
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-linear-to-t ${
              isDarkMode 
                ? 'from-gray-900/80 via-gray-900/30 to-transparent'
                : 'from-gray-900/60 via-gray-900/20 to-transparent'
            }`} />
            
            {/* Texto */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-linear-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 text-sm mb-4">
                  ✦ Colección Destacada ✦
                </span>
                <h2 className="text-4xl font-bold mb-3">{image.title}</h2>
                <p className="text-xl text-gray-200">{image.description}</p>
                <button className="mt-6 px-6 py-3 rounded-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/30">
                  Ver Colección
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm text-white transition-all duration-300"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm text-white transition-all duration-300"
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-linear-to-r from-purple-500 to-pink-500 w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}