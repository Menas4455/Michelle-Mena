'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Iconos personalizados
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3.02.6.06.9.11V9.4a6.18 6.18 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.5 1.31v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const ShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M22 9h-4.79l-.28-1.34C16.7 6.18 15.96 5 14 5h-4c-1.96 0-2.7 1.18-2.93 2.66L6.79 9H2c-.55 0-1 .45-1 1 0 .09 0 .18.04.27l2.54 9.27C3.81 20.47 4.79 21 5.83 21h12.34c1.04 0 2.02-.53 2.25-1.46l2.54-9.27c.04-.09.04-.18.04-.27 0-.55-.45-1-1-1zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-10h-3.5l-.74-1.49C13.47 6.35 13.19 6 12 6s-1.47.35-1.76.51L9.5 8H6l-2 8h16l-2-8z"/>
  </svg>
);

export default function OptionsPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <TikTokIcon />,
      color: 'bg-black',
      hoverColor: 'bg-gray-800'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <InstagramIcon />,
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
      hoverColor: 'from-purple-700 to-pink-700'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FacebookIcon />,
      color: 'bg-blue-600',
      hoverColor: 'bg-blue-700'
    },
    {
      id: 'catalogo',
      name: 'Catálogo Virtual',
      icon: <ShopIcon />,
      color: 'bg-gradient-to-r from-purple-500 to-blue-500',
      hoverColor: 'from-purple-600 to-blue-600'
    }
  ];

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Redirigir a /welcome si es Catálogo Virtual
    if (optionId === 'catalogo') {
      setTimeout(() => {
        router.push('/welcome');
      }, 500);
    }
    
    // Simular selección
    setTimeout(() => {
      setSelectedOption(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <div className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">
            MENA
          </span>
          <span className="text-white">Style</span>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Elige tu plataforma
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Selecciona dónde quieres mostrar tu colección de moda MENA
          </p>
        </motion.div>

        {/* Opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectOption(option.id)}
              className={`relative cursor-pointer group ${
                selectedOption === option.id ? 'ring-4 ring-purple-500/50' : ''
              }`}
            >
              <div className={`aspect-square rounded-2xl ${option.color} flex flex-col items-center justify-center p-8 transition-all duration-300 group-hover:shadow-2xl ${option.id === 'catalogo' ? 'shadow-lg shadow-purple-500/20' : ''}`}>
                
                {/* Icono */}
                <div className="mb-6 text-white">
                  {option.icon}
                </div>
                
                {/* Nombre */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {option.name}
                </h3>
                
                {/* Estado */}
                <div className="mt-4">
                  {selectedOption === option.id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-green-400 font-medium">
                        {option.id === 'catalogo' ? 'Redirigiendo...' : 'Seleccionando...'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-300">Seleccionar</span>
                  )}
                </div>
              </div>
              
              {/* Destacado para Catálogo Virtual */}
              {option.id === 'catalogo' && (
                <div className="absolute -top-3 -right-3 bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMENDADO
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mensaje */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tu colección de moda MENA puede brillar en cualquier plataforma.
            {selectedOption === 'catalogo' && (
              <span className="block mt-2 text-purple-400 animate-pulse">
                Redirigiendo a la tienda virtual...
              </span>
            )}
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-gray-500 text-sm">
          © 2024 MENA Style. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}