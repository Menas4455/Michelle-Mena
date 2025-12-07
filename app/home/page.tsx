'use client';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@/src/components/Theme/ThemeProvider';
import Navbar from '@/src/components/Navigation/Navbar';
import Header from '@/src/components/Header/Header';
import SideBanner from '@/src/components/Banner/SideBanner';
import ImageCarousel from '@/src/components/Carousel/ImageCarousel';
import ProductGrid from '@/src/components/Products/ProductGrid';
import ProductModal from '@/src/components/Products/ProductModal';
import AllCollections from '@/src/components/Collections/AllCollections';
import { Product } from '@/src/types';
import { motion, AnimatePresence } from 'framer-motion';

// Datos de ejemplo con tipo extendido (mantén tu array sampleProducts igual)
interface ExtendedProduct extends Product {
  hasDiscount?: boolean;
  freeShipping?: boolean;
  hasWarranty?: boolean;
  vipAccess?: boolean;
}

const sampleProducts = [
  {
    id: '1',
    name: 'Abaya Bordada Oro 24K',
    description: 'Abaya tradicional con intrincados bordados en hilo de oro 24K, confeccionada en seda pura italiana.',
    price: 459.99,
    originalPrice: 599.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Abayas',
    tags: ['Premium', 'Bordado', 'Oro', 'Seda', 'Exclusivo', 'Lujo'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#2C3E50', '#654321'],
    rating: 4.9,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    hasWarranty: true
  },
  {
    id: '2',
    name: 'Kaftán Moderno Geometría Azul',
    description: 'Diseño contemporáneo con patrones geométricos inspirados en la arquitectura árabe, algodón egipcio premium.',
    price: 289.99,
    originalPrice: 349.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kaftanes',
    tags: ['Moderno', 'Geométrico', 'Algodón Egipcio', 'Arquitectura'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#1E90FF', '#4682B4', '#4169E1'],
    rating: 4.7,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    hasWarranty: true
  },
  {
    id: '3',
    name: 'Hijab Seda Verde Esmeralda',
    description: 'Hijab de seda charmeuse con acabado fluid, perfecto para ocasiones especiales y eventos formales.',
    price: 129.99,
    originalPrice: 169.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Hijabs',
    tags: ['Seda', 'Fluid', 'Esmeralda', 'Ocasión Especial'],
    sizes: ['Única'],
    colors: ['#228B22', '#32CD32', '#006400'],
    rating: 4.8,
    inStock: true,
    hasDiscount: true,
    freeShipping: false,
    hasWarranty: true
  },
  {
    id: '4',
    name: 'Conjunto Real Bordado Plateado',
    description: 'Conjunto completo con bordados tradicionales marroquíes en hilo plateado, ideal para bodas y eventos de gala.',
    price: 789.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Conjuntos',
    tags: ['Completo', 'Bordado', 'Plateado', 'Gala', 'Boda', 'Real'],
    sizes: ['S', 'M', 'L'],
    colors: ['#F5F5DC', '#FAF0E6', '#FFEBCD'],
    rating: 5.0,
    inStock: false,
    hasDiscount: false,
    freeShipping: true,
    vipAccess: true
  },
  {
    id: '5',
    name: 'Vestido Dubai Crystal',
    description: 'Vestido de noche con más de 5,000 cristales Swarovski, inspirado en las noches doradas de Dubai.',
    price: 1299.99,
    originalPrice: 1699.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Vestidos',
    tags: ['Noche', 'Cristales', 'Dubai', 'Gala', 'Exclusivo', 'Lujo'],
    sizes: ['XS', 'S', 'M'],
    colors: ['#000000', '#4B0082', '#800080'],
    rating: 4.9,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    vipAccess: true,
    hasWarranty: true
  },
  {
    id: '6',
    name: 'Túnica Mediterránea Lino',
    description: 'Túnica ligera para verano en lino 100% natural, diseño minimalista inspirado en la costa mediterránea.',
    price: 189.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Túnicas',
    tags: ['Verano', 'Lino', 'Minimalista', 'Mediterráneo'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#D2B48C', '#F5DEB3', '#DEB887'],
    rating: 4.6,
    inStock: true,
    hasDiscount: false,
    freeShipping: false
  },
  {
    id: '7',
    name: 'Chal Bereber Lana Virgen',
    description: 'Chal tradicional bereber tejido a mano con lana virgen, patrones étnicos y colores naturales.',
    price: 229.99,
    originalPrice: 299.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accesorios',
    tags: ['Bereber', 'Tejido a Mano', 'Étnico', 'Lana', 'Invierno'],
    sizes: ['Única'],
    colors: ['#8B0000', '#B22222', '#DC143C'],
    rating: 4.7,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    hasWarranty: true
  },
  {
    id: '8',
    name: 'Pantalón Sharara Real',
    description: 'Pantalón sharara con bordados dorados y tejido de organza, movimiento fluido y elegante.',
    price: 459.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pantalones',
    tags: ['Sharara', 'Organza', 'Fluido', 'Bordado', 'Oro', 'Gala'],
    sizes: ['S', 'M', 'L'],
    colors: ['#FFD700', '#F0E68C', '#EEE8AA'],
    rating: 4.8,
    inStock: false,
    hasDiscount: false,
    freeShipping: true
  },
  {
    id: '9',
    name: 'Abaya Minimalista Negra',
    description: 'Abaya de diseño minimalista en crepé de seda, líneas limpias y corte contemporáneo.',
    price: 329.99,
    originalPrice: 399.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Abayas',
    tags: ['Minimalista', 'Crepé', 'Negro', 'Moderno', 'Diario'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#000000', '#1C1C1C', '#363636'],
    rating: 4.5,
    inStock: true,
    hasDiscount: true,
    freeShipping: true
  },
  {
    id: '10',
    name: 'Kaftán Verano Floral',
    description: 'Kaftán ligero con estampado floral tropical, tejido de algodón orgánico, perfecto para el verano.',
    price: 159.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kaftanes',
    tags: ['Verano', 'Floral', 'Algodón Orgánico', 'Ligero'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FF69B4', '#FF1493', '#DB7093'],
    rating: 4.4,
    inStock: true,
    hasDiscount: false,
    freeShipping: false
  },
  {
    id: '11',
    name: 'Hijab Chiffon Perla',
    description: 'Hijab en chiffon con brillo perlado, tejido transparente y elegante para un look sofisticado.',
    price: 89.99,
    originalPrice: 119.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Hijabs',
    tags: ['Chiffon', 'Perla', 'Transparente', 'Elegante'],
    sizes: ['Única'],
    colors: ['#F0F8FF', '#F5F5F5', '#FFFAFA'],
    rating: 4.6,
    inStock: true,
    hasDiscount: true,
    freeShipping: false
  },
  {
    id: '12',
    name: 'Conjunto Nupcial Real',
    description: 'Conjunto de novia con bordados en oro y plata, inspirado en las tradiciones nupciales marroquíes.',
    price: 2499.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Conjuntos',
    tags: ['Nupcial', 'Novia', 'Oro y Plata', 'Real', 'Exclusivo'],
    sizes: ['S', 'M', 'L'],
    colors: ['#FFFFFF', '#FFFAFA', '#F8F8FF'],
    rating: 5.0,
    inStock: true,
    hasDiscount: false,
    freeShipping: true,
    vipAccess: true,
    hasWarranty: true
  },
  {
    id: '13',
    name: 'Vestido Qatar Perlado',
    description: 'Vestido de cóctel con incrustaciones de perlas, diseño inspirado en la modernidad de Qatar.',
    price: 699.99,
    originalPrice: 899.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Vestidos',
    tags: ['Cóctel', 'Perlas', 'Qatar', 'Moderno', 'Elegante'],
    sizes: ['XS', 'S', 'M'],
    colors: ['#E6E6FA', '#F0F8FF', '#F5F5DC'],
    rating: 4.8,
    inStock: true,
    hasDiscount: true,
    freeShipping: true
  },
  {
    id: '14',
    name: 'Túnica Oasis Seda',
    description: 'Túnica fluida en seda natural, colores inspirados en los oasis del desierto, comodidad suprema.',
    price: 279.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Túnicas',
    tags: ['Oasis', 'Seda', 'Fluida', 'Desierto', 'Natural'],
    sizes: ['S', 'M', 'L'],
    colors: ['#8FBC8F', '#98FB98', '#90EE90'],
    rating: 4.7,
    inStock: true,
    hasDiscount: false,
    freeShipping: true
  },
  {
    id: '15',
    name: 'Chal Palestino Bordado',
    description: 'Chal tradicional palestino con bordados hechos a mano, símbolos de la cultura y tradición.',
    price: 189.99,
    originalPrice: 249.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accesorios',
    tags: ['Palestino', 'Bordado a Mano', 'Tradicional', 'Cultural'],
    sizes: ['Única'],
    colors: ['#000080', '#191970', '#4169E1'],
    rating: 4.9,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    hasWarranty: true
  },
  {
    id: '16',
    name: 'Pantalón Aladdin Brocado',
    description: 'Pantalón estilo Aladdin en brocado dorado, tejido lujoso inspirado en los cuentos de las mil y una noches.',
    price: 389.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pantalones',
    tags: ['Aladdin', 'Brocado', 'Dorado', 'Lujoso', 'Cuentos'],
    sizes: ['S', 'M', 'L'],
    colors: ['#DAA520', '#B8860B', '#FFD700'],
    rating: 4.6,
    inStock: true,
    hasDiscount: false,
    freeShipping: true
  },
  {
    id: '17',
    name: 'Abaya Emiratos Cristal',
    description: 'Abaya de diseño emiratí con detalles en cristales, elegancia moderna inspirada en los Emiratos Árabes.',
    price: 599.99,
    originalPrice: 799.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Abayas',
    tags: ['Emiratí', 'Cristales', 'Moderno', 'Emiratos', 'Lujo'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#2F4F4F', '#708090', '#778899'],
    rating: 4.8,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    vipAccess: true
  },
  {
    id: '18',
    name: 'Kaftán Noche Estrellada',
    description: 'Kaftán con estampado de constelaciones y estrellas, tejido de satén para una noche mágica.',
    price: 329.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kaftanes',
    tags: ['Noche', 'Estrellas', 'Constelaciones', 'Satén', 'Mágico'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#191970', '#000080', '#4169E1'],
    rating: 4.7,
    inStock: true,
    hasDiscount: false,
    freeShipping: true
  },
  {
    id: '19',
    name: 'Hijab Terciopelo Granate',
    description: 'Hijab en terciopelo de calidad premium, color granate profundo, ideal para invierno y eventos nocturnos.',
    price: 149.99,
    originalPrice: 199.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Hijabs',
    tags: ['Terciopelo', 'Granate', 'Invierno', 'Nocturno', 'Premium'],
    sizes: ['Única'],
    colors: ['#800000', '#8B0000', '#B22222'],
    rating: 4.9,
    inStock: true,
    hasDiscount: true,
    freeShipping: true
  },
  {
    id: '20',
    name: 'Conjunto Ramadan Brillante',
    description: 'Conjunto especial para Ramadan con tejidos brillantes y diseño cómodo para las celebraciones.',
    price: 459.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Conjuntos',
    tags: ['Ramadan', 'Brillante', 'Celebración', 'Cómodo', 'Festivo'],
    sizes: ['S', 'M', 'L'],
    colors: ['#FFD700', '#FFEC8B', '#FFFACD'],
    rating: 4.8,
    inStock: true,
    hasDiscount: false,
    freeShipping: true
  },
  {
    id: '21',
    name: 'Vestido Marrakech Rojo',
    description: 'Vestido inspirado en los mercados de Marrakech, colores vibrantes y tejidos ricos en texturas.',
    price: 549.99,
    originalPrice: 699.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Vestidos',
    tags: ['Marrakech', 'Vibrante', 'Texturas', 'Mercado', 'Cultural'],
    sizes: ['S', 'M', 'L'],
    colors: ['#FF0000', '#DC143C', '#B22222'],
    rating: 4.7,
    inStock: true,
    hasDiscount: true,
    freeShipping: true
  },
  {
    id: '22',
    name: 'Túnica Bahía Algodón',
    description: 'Túnica casual en algodón pima, diseño relajado inspirado en las bahías del Mediterráneo.',
    price: 129.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Túnicas',
    tags: ['Casual', 'Algodón Pima', 'Relajado', 'Mediterráneo', 'Diario'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#87CEEB', '#87CEFA', '#B0E0E6'],
    rating: 4.5,
    inStock: true,
    hasDiscount: false,
    freeShipping: false
  },
  {
    id: '23',
    name: 'Chal Oasis Cachemir',
    description: 'Chal ultra suave en cachemir 100%, ligero pero cálido, perfecto para las noches del desierto.',
    price: 299.99,
    originalPrice: 399.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accesorios',
    tags: ['Cachemir', 'Suave', 'Ligero', 'Desierto', 'Premium'],
    sizes: ['Única'],
    colors: ['#F5DEB3', '#FFE4C4', '#FAEBD7'],
    rating: 4.9,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    hasWarranty: true
  },
  {
    id: '24',
    name: 'Pantalón Harem Seda',
    description: 'Pantalón harem en seda estampada, diseño bohemio y cómodo para un look relajado pero elegante.',
    price: 279.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pantalones',
    tags: ['Harem', 'Seda', 'Bohemio', 'Estampado', 'Cómodo'],
    sizes: ['S', 'M', 'L'],
    colors: ['#8A2BE2', '#9370DB', '#BA55D3'],
    rating: 4.6,
    inStock: true,
    hasDiscount: false,
    freeShipping: true
  },
  {
    id: '25',
    name: 'Abaya Royal Purple',
    description: 'Abaya en tono púrpura real con detalles en encaje, diseño regio inspirado en la realeza árabe.',
    price: 689.99,
    originalPrice: 859.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Abayas',
    tags: ['Royal', 'Púrpura', 'Encaje', 'Realeza', 'Exclusivo'],
    sizes: ['S', 'M', 'L'],
    colors: ['#800080', '#9370DB', '#8A2BE2'],
    rating: 4.9,
    inStock: true,
    hasDiscount: true,
    freeShipping: true,
    vipAccess: true,
    hasWarranty: true
  }
];

function MainContent() {
  const { isDarkMode } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ExtendedProduct[]>(sampleProducts);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showAllCollections, setShowAllCollections] = useState(false);

  const handleViewDetails = (product: ExtendedProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFilterChange = (filterType: string, filterValue: string) => {
    setIsFiltering(true);
    
    if (filterType === 'clear') {
      setActiveFilter('');
      setTimeout(() => {
        setFilteredProducts(sampleProducts);
        setIsFiltering(false);
      }, 300);
      return;
    }

    const newFilter = `${filterType}:${filterValue}`;
    setActiveFilter(newFilter);

    setTimeout(() => {
      let filtered = [...sampleProducts];
      
      switch (filterType) {
        case 'discount':
          if (filterValue === 'hasDiscount') {
            filtered = sampleProducts.filter(product => product.hasDiscount === true);
          }
          break;
        
        case 'category':
          filtered = sampleProducts.filter(product => product.category === filterValue);
          break;
        
        case 'shipping':
          if (filterValue === 'freeShipping') {
            filtered = sampleProducts.filter(product => product.freeShipping === true);
          }
          break;
        
        case 'feature':
          if (filterValue === 'hasWarranty') {
            filtered = sampleProducts.filter(product => product.hasWarranty === true);
          } else if (filterValue === 'vipAccess') {
            filtered = sampleProducts.filter(product => product.vipAccess === true);
          }
          break;
      }
      
      setFilteredProducts(filtered);
      setIsFiltering(false);
    }, 300);
  };

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

  // Obtener productos destacados
  const featuredProducts = filteredProducts.slice(0, 4);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Navbar />
      <Header />
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Banner lateral */}
          <div className="lg:col-span-1">
            <SideBanner 
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />
          </div>
          
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Si estamos en vista de Todas las Colecciones */}
            {showAllCollections ? (
              <AnimatePresence>
                <motion.div
                  key="all-collections"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Botón para volver */}
                  <button
                    onClick={() => setShowAllCollections(false)}
                    className={`mb-6 px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors duration-300`}
                  >
                    <span>←</span>
                    <span>Volver al inicio</span>
                  </button>

                  {/* Componente de todas las colecciones */}
                  <AllCollections 
                    products={sampleProducts}
                    onViewDetails={handleViewDetails}
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              /* Vista normal (con filtros, carrusel, etc.) */
              <>
                {/* Carrusel - Solo se muestra cuando no hay filtro activo */}
                <AnimatePresence>
                  {!activeFilter && (
                    <motion.div
                      key="carousel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-12 overflow-hidden"
                    >
                      <ImageCarousel />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Indicador de filtro activo */}
                <AnimatePresence>
                  {activeFilter && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-6 p-4 rounded-xl ${
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
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('clear', '')}
                          className={`text-sm px-4 py-2 rounded-full ${
                            isDarkMode 
                              ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          } transition-colors duration-300 flex items-center space-x-2`}
                        >
                          <span>Limpiar filtro</span>
                          <span className="text-xs">✕</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Loading state durante el filtrado */}
                {isFiltering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-xl text-center"
                  >
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                    <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Aplicando filtro...
                    </p>
                  </motion.div>
                )}
                
                {/* Productos destacados */}
                <div className="mb-12">
                  <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: isFiltering ? 0.3 : 0 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
                  >
                    <div>
                      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {activeFilter ? getFilterDisplayName() : 'Productos Destacados'}
                      </h2>
                      <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activeFilter 
                          ? `Mostrando ${filteredProducts.length} productos encontrados` 
                          : 'Lo más vendido de nuestra colección MENA'
                        }
                      </p>
                    </div>
                    {!activeFilter && (
                      <div className="flex space-x-3">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowAllCollections(true)}
                          className={`px-6 py-2 rounded-full bg-linear-to-r ${
                            isDarkMode 
                              ? 'from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800' 
                              : 'from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400'
                          } transition-all duration-300 font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Ver Todas las Colecciones
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-2 rounded-full bg-linear-to-r ${
                            isDarkMode 
                              ? 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                              : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                          } transition-all duration-300 font-medium text-white`}
                        >
                          Ver Todo
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {isFiltering ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-64 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                          <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Filtrando productos...
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="products"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ProductGrid 
                          products={activeFilter ? filteredProducts : featuredProducts} 
                          onViewDetails={handleViewDetails}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Sección de Todas las Colecciones (vista previa) */}
                {!activeFilter && !isFiltering && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="mb-12"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                      <div>
                        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Todas las Colecciones
                        </h2>
                        <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Explora nuestro catálogo completo de {sampleProducts.length} productos
                        </p>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAllCollections(true)}
                        className={`px-6 py-2 rounded-full bg-linear-to-r ${
                          isDarkMode 
                            ? 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                            : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        } transition-all duration-300 font-medium text-white flex items-center space-x-2`}
                      >
                        <span>Ver Todo el Catálogo</span>
                        <span>→</span>
                      </motion.button>
                    </div>
                    
                    {/* Vista previa de 10 productos */}
                    <ProductGrid 
                      products={sampleProducts.slice(0, 10)} 
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`mt-16 py-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">
                MENA
              </span>
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Style</span>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="#" 
                className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}
              >
                Instagram
              </a>
              <a 
                href="#" 
                className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}
              >
                Pinterest
              </a>
              <a 
                href="#" 
                className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}
              >
                Contacto
              </a>
            </div>
          </div>
          
          <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            <p>© 2024 MENA Style. Todos los derechos reservados. Catálogo de moda inspirado en la cultura MENA.</p>
          </div>
        </div>
      </footer>
      
      {/* Modal de producto */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}