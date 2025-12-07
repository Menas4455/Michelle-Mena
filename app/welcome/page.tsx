'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar useRouter
import { motion, useAnimation, Variants } from 'framer-motion';
import { ArrowRight, Instagram, Youtube, ShoppingBag, Heart, Star, Zap, Sun, Moon, X, Menu } from 'lucide-react';

export default function HomePage() {
  const router = useRouter(); // Inicializar useRouter
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Función para redirigir a /home
  const handleExploreCollections = () => {
    router.push('/home');
  };
  
  // Cambiar tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Alternar menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Animación de entrada
    controls.start('visible');
    
    // Efecto de partículas en canvas para AMBOS modos
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Particle[] = [];
    const particleCount = 80;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Colores diferentes según el modo
        if (isDarkMode) {
          // Colores fríos para modo oscuro
          this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 200)}, 0.5)`;
        } else {
          // Para modo claro - Puntos negros/grises oscuros
          const darkness = Math.floor(Math.random() * 100); // 0-100
          this.color = `rgba(${darkness}, ${darkness}, ${darkness}, 0.95)`; // Casi sólido
        }
      }
      
      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
      }
      
      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
    
    let animationId: number;
    
    function animateParticles() {
      // Fondo transparente para que se vea el gradiente detrás
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      animationId = requestAnimationFrame(animateParticles);
    }
      
    animateParticles();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [controls, isDarkMode]); // Se reinicia cuando cambia el tema

  // Interfaz para colores según el tema
  interface ThemeColors {
    bg: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    cardBg: string;
    border: string;
    gradient: string;
    buttonPrimary: string;
    buttonHover: string;
    accentGradient: string;
    overlay: string;
    particleOpacity: string;
  }

  // Colores según el tema
  const themeColors: { dark: ThemeColors; light: ThemeColors } = {
    dark: {
      bg: 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      cardBg: 'bg-gradient-to-br from-gray-800/90 to-gray-900/90',
      border: 'border-gray-700/50',
      gradient: 'from-purple-900 via-gray-900 to-gray-950',
      buttonPrimary: 'from-purple-700 to-pink-700',
      buttonHover: 'from-purple-800 to-pink-800',
      accentGradient: 'from-purple-500 to-pink-500',
      overlay: 'rgba(0,0,0,0.4)',
      particleOpacity: 'opacity-30' // Más visibles en oscuro
    },
    light: {
      bg: 'bg-gradient-to-b from-gray-50 via-white to-gray-100',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-500',
      cardBg: 'bg-gradient-to-br from-white/90 to-gray-50/90',
      border: 'border-gray-300/50',
      gradient: 'from-purple-50 via-white to-gray-100',
      buttonPrimary: 'from-purple-500 to-pink-500',
      buttonHover: 'from-purple-600 to-pink-600',
      accentGradient: 'from-purple-400 to-pink-400',
      overlay: 'rgba(255,255,255,0.4)',
      particleOpacity: 'opacity-50' // Aumentado para puntos negros
    }
  };

  const colors = isDarkMode ? themeColors.dark : themeColors.light;
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const floatingVariants: Variants = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${colors.bg} ${colors.text}`}>
      {/* Canvas con partículas animadas - VISIBLE EN AMBOS MODOS */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 z-0 ${colors.particleOpacity} transition-opacity duration-500`}
      />
      
      {/* Elementos decorativos */}
      {isDarkMode ? (
        <>
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-900/30 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/30 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </>
      ) : (
        <>
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-100/70 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-100/70 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </>
      )}
      
      {/* Contenido principal */}
      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Encabezado con navegación */}
          <motion.header 
            className="flex justify-between items-center mb-20"
            variants={itemVariants}
          >
            <div className="text-2xl font-bold tracking-wider">
              <span className={`text-transparent bg-clip-text bg-linear-to-r ${colors.accentGradient}`}>
                MODA
              </span>
              <span className="ml-1">MENA</span>
            </div>
            
            {/* Menú móvil */}
            <button 
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Menú de navegación */}
            <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-20 md:top-0 left-4 right-4 md:left-auto md:right-auto flex-col md:flex-row md:space-x-8 p-6 md:p-0 rounded-2xl ${colors.cardBg} ${colors.border} border backdrop-blur-md md:backdrop-blur-none md:bg-transparent md:border-none z-50`}>
              
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Botón de cambio de tema */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-500/20 hover:bg-yellow-500/30' : 'bg-gray-800/20 hover:bg-gray-800/30'} transition-all duration-300`}
                aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                {isDarkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-gray-700" />}
              </button>
              
              <button 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Carrito de compras"
              >
                <ShoppingBag size={20} />
              </button>
              
              <button 
                className={`px-4 py-2 rounded-full bg-linear-to-r ${colors.buttonPrimary} hover:${colors.buttonHover} transition-all duration-300 font-medium`}
                onClick={handleExploreCollections}
              >
                Suscribirse
              </button>
            </div>
          </motion.header>
          
          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              variants={itemVariants}
            >
              <div className="space-y-4">
                <motion.div 
                  className={`inline-block px-4 py-2 rounded-full bg-linear-to-r ${isDarkMode ? 'from-purple-500/20 to-pink-500/20' : 'from-purple-100 to-pink-100'} ${colors.border} border`}
                  variants={floatingVariants}
                  animate="float"
                >
                  <span className={`text-sm font-semibold bg-linear-to-r ${colors.accentGradient} bg-clip-text text-transparent`}>
                    ✦ Blog de Moda Exclusiva ✦
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  <span className="block">Descubre la</span>
                  <span className="block">
                    <span className={`text-transparent bg-clip-text bg-linear-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-yellow-300' : 'from-purple-600 via-pink-600 to-orange-400'}`}>
                      Elegancia de la Moda
                    </span>
                  </span>
                  <span className="block">MENA</span>
                </motion.h1>
                
                <motion.p 
                  className={`text-xl ${colors.textSecondary} max-w-lg`}
                  variants={itemVariants}
                >
                  Donde la artesanía tradicional se encuentra con el diseño contemporáneo. Explora colecciones exclusivas de diseñadores emergentes de Medio Oriente y Norte de África.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                {/* BOTÓN QUE REDIRECCIONA A /HOME */}
                <button 
                  onClick={handleExploreCollections}
                  className={`group px-8 py-4 rounded-full bg-linear-to-r ${colors.buttonPrimary} hover:${colors.buttonHover} transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg ${isDarkMode ? 'hover:shadow-purple-500/30' : 'hover:shadow-purple-500/50'}`}
                >
                  <span>Explorar Colecciones</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                
                <button className={`px-8 py-4 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'} backdrop-blur-sm ${colors.border} border transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2`}>
                  <Heart size={20} />
                  <span>Conocer Diseñadores</span>
                </button>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-6 pt-8"
                variants={itemVariants}
              >
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <div 
                      key={i}
                      className={`w-12 h-12 rounded-full border-2 ${isDarkMode ? 'border-gray-900' : 'border-white'} bg-linear-to-br ${colors.accentGradient} overflow-hidden flex items-center justify-center`}
                    >
                      <span className="text-xs font-bold text-white">MENA</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-lg font-semibold">Únete a 5,000+ Amantes de la Moda</p>
                  <p className={colors.textMuted}>Descubriendo lo mejor del estilo MENA</p>
                </div>
              </motion.div>
              
              {/* Características destacadas */}
              <motion.div 
                className="grid grid-cols-3 gap-4 pt-6"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Star size={16} className="text-white" />
                  </div>
                  <span className="text-sm">Calidad Premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                  </div>
                  <span className="text-sm">Envío Rápido</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Heart size={16} className="text-white" />
                  </div>
                  <span className="text-sm">Hecho a Mano</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className={`relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'shadow-purple-500/20' : 'shadow-purple-500/30'}`}>
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-linear-to-br from-purple-900/30 to-pink-900/30' : 'bg-linear-to-br from-purple-100/30 to-pink-100/30'} z-10`}></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80')] bg-cover bg-center"></div>
                
                {/* Elementos decorativos sobre la imagen */}
                <div className="absolute top-6 right-6 z-20 w-16 h-16 rounded-full bg-linear-to-r from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
                  <span className="font-bold text-gray-900">Nuevo</span>
                </div>
                
                <div className={`absolute bottom-8 left-8 z-20 p-6 rounded-2xl ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-md max-w-xs`}>
                  <h3 className="text-xl font-bold mb-2">Colección Primavera 2024</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Bordados tradicionales con siluetas modernas</p>
                </div>
              </div>
              
              {/* Tarjetas flotantes */}
              <motion.div 
                className={`absolute -bottom-6 -left-6 w-64 p-4 rounded-2xl ${colors.cardBg} ${colors.border} border shadow-2xl`}
                variants={floatingVariants}
                animate="float"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="font-bold text-gray-900">MS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Diseñadora Destacada</p>
                    <p className={`text-sm ${colors.textMuted}`}>Mariam Salim</p>
                    <div className="flex mt-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`absolute -top-6 -right-6 w-56 p-4 rounded-2xl ${colors.cardBg} ${colors.border} border shadow-2xl`}
                variants={floatingVariants}
                animate="float"
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Próximo Evento</p>
                    <p className={`text-sm ${colors.textMuted}`}>Dubai, 15 de Abril</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">En Vivo</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Sección de testimonios */}
          <motion.div 
            className="mt-24"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Lo que dicen nuestros <span className={`text-transparent bg-clip-text bg-linear-to-r ${colors.accentGradient}`}>seguidores</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Layla Ahmed",
                  role: "Editora de Moda",
                  comment: "La mejor fuente para descubrir talento emergente en la región MENA. ¡Increíble contenido!",
                  rating: 5
                },
                {
                  name: "Carlos Rodríguez",
                  role: "Comprador Internacional",
                  comment: "Calidad excepcional y diseños únicos que no encuentras en ningún otro lugar.",
                  rating: 5
                },
                {
                  name: "Noura Al-Mansoori",
                  role: "Influencer de Moda",
                  comment: "Siempre encuentro inspiración para mis looks. ¡Un blog imprescindible!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className={`p-6 rounded-2xl ${colors.cardBg} ${colors.border} border backdrop-blur-sm`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                      <span className="font-bold text-white">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className={`text-sm ${colors.textMuted}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={`${colors.textSecondary} mb-3`}>{testimonial.comment}</p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Redes sociales y estadísticas */}
          <motion.footer 
            className={`mt-24 pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-300/30'}`}
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <p className={colors.textMuted}>Síguenos para contenido exclusivo</p>
                <div className="flex space-x-4 mt-4">
                  {[
                    { icon: <Instagram size={24} />, color: "from-purple-500 to-pink-500", label: "Instagram" },
                    { icon: <Youtube size={24} />, color: "from-red-500 to-rose-500", label: "YouTube" }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className={`w-12 h-12 rounded-full bg-linear-to-r ${social.color} flex items-center justify-center hover:scale-110 transition-transform duration-300 relative group`}
                      aria-label={social.label}
                    >
                      {social.icon}
                      <div className={`absolute -top-10 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>
                        {social.label}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "200+", label: "Diseñadores" },
                  { number: "1.2K+", label: "Colecciones" },
                  { number: "15+", label: "Países" },
                  { number: "5K+", label: "Comunidad" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className={`text-3xl font-bold bg-linear-to-r ${colors.accentGradient} bg-clip-text text-transparent`}>
                      {stat.number}
                    </p>
                    <p className={`${colors.textMuted} mt-1`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`mt-12 text-center ${colors.textMuted} text-sm`}>
              <p>© 2024 Blog de Moda MENA. Todos los derechos reservados. Celebrando la rica herencia de moda de Medio Oriente y Norte de África.</p>
            </div>
          </motion.footer>
        </motion.div>
      </main>
      
      {/* Botón de acción flotante */}
      <div className="fixed bottom-8 right-8 z-20">
        <button 
          className={`group w-14 h-14 rounded-full bg-linear-to-r ${colors.buttonPrimary} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 relative`}
          aria-label="Tienda exclusiva"
          onClick={handleExploreCollections}
        >
          <ShoppingBag size={24} className="text-white" />
          <div className={`absolute -top-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>
            Explorar Colecciones
          </div>
        </button>
      </div>
      
      {/* Indicador de tema actual */}
      <div className={`fixed bottom-8 left-8 z-20 px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
        Tema: {isDarkMode ? 'Oscuro 🌙' : 'Claro ☀️'}
      </div>
    </div>
  );
}