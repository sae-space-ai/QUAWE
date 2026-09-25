import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Filter, X, CheckCircle, AlertCircle } from 'lucide-react';
import { getAllProducts, getProductsByCategory, getProductsByPointsRange, Product, categories, pointsRanges } from '../data/products';
import { getUserPoints, redeemProduct, formatPoints } from '../services/pointsSystem';

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRange, setSelectedRange] = useState<string>('all');
  const [userPoints, setUserPoints] = useState<number>(0);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [redeemMessage, setRedeemMessage] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    loadProducts();
    loadUserPoints();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, selectedRange]);

  const loadProducts = () => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  };

  const loadUserPoints = () => {
    const points = getUserPoints();
    setUserPoints(points.totalPoints);
  };

  const filterProducts = () => {
    let filtered = products;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = getProductsByCategory(selectedCategory as any);
    }

    // Filtrar por rango de puntos
    if (selectedRange !== 'all') {
      const range = pointsRanges.find(r => r.id === selectedRange);
      if (range) {
        filtered = getProductsByPointsRange(range.min, range.max);
      }
    }

    setFilteredProducts(filtered);
  };

  const handleRedeemClick = (product: Product) => {
    setSelectedProduct(product);
    setShowRedeemModal(true);
    setRedeemMessage(null);
  };

  const handleConfirmRedeem = () => {
    if (!selectedProduct) return;

    const result = redeemProduct(selectedProduct);
    setRedeemMessage(result);

    if (result.success) {
      // Actualizar puntos del usuario
      loadUserPoints();
      // Actualizar productos disponibles
      loadProducts();
    }
  };

  const handleCloseModal = () => {
    setShowRedeemModal(false);
    setSelectedProduct(null);
    setRedeemMessage(null);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Catálogo de Productos</h2>
            <p className="text-sm text-gray-400">Canjea tus puntos por productos de nuestras marcas patrocinadoras</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              {formatPoints(userPoints)}
            </div>
            <p className="text-xs text-gray-400">tus puntos</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Filtros</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro por categoría */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por rango de puntos */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Rango de puntos</label>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="all">Todos los rangos</option>
              {pointsRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sección especial de libros del autor */}
      {selectedCategory === 'all' && (
        <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">📚</div>
            <div>
              <h3 className="text-xl font-bold text-white">Libros del Autor</h3>
              <p className="text-sm text-gray-400">Catálogo completo de Prof. Manuel Gago Fernández</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Obtén los libros digitales del autor escuchando Radio Quawe. Todos los libros están disponibles en Amazon y ahora puedes canjearlos con tus puntos.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-xs text-gray-400">Libros</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-white">4</p>
              <p className="text-xs text-gray-400">Bestsellers</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-white">4.6</p>
              <p className="text-xs text-gray-400">Valoración media</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-white">1,159</p>
              <p className="text-xs text-gray-400">Reseñas totales</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product, index) => {
          const canAfford = userPoints >= product.pointsCost;
          const hasStock = product.stock > 0;
          const isBook = product.category === 'libros';

          return (
            <motion.div
              key={product.id}
              className={`rounded-2xl backdrop-blur-xl border p-6 hover:bg-white/10 transition-all ${
                isBook 
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Imagen del producto */}
              <div className={`w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center ${
                isBook ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : ''
              }`}>
                {product.image.startsWith('http') ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="text-6xl">${product.image}</div>`;
                    }}
                  />
                ) : (
                  <div className="text-6xl">{product.image}</div>
                )}
              </div>

                {/* Información del producto */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${isBook ? 'text-blue-300' : 'text-white'}`}>{product.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
                      {product.brand}
                    </span>
                  </div>
                  
                  {/* Subtítulo para libros */}
                  {isBook && product.bookMetadata?.subtitle && (
                    <p className="text-xs text-gray-400 italic">{product.bookMetadata.subtitle}</p>
                  )}
                  
                  <p className="text-sm text-gray-400">{product.description}</p>
                  
                  {/* Información adicional para libros */}
                  {isBook && product.bookMetadata && (
                    <div className="space-y-1 pt-2 border-t border-white/10">
                      {product.bookMetadata.rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Valoración:</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-xs font-semibold text-white">{product.bookMetadata.rating}/5</span>
                            {product.bookMetadata.reviews && (
                              <span className="text-xs text-gray-400">({product.bookMetadata.reviews} reseñas)</span>
                            )}
                          </div>
                        </div>
                      )}
                      {product.bookMetadata.pages && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Páginas:</span>
                          <span className="text-xs font-semibold text-white">{product.bookMetadata.pages}</span>
                        </div>
                      )}
                      {product.bookMetadata.bestseller && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold">
                            ⭐ Bestseller
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Stock */}
                  {!isBook && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Stock:</span>
                      <span className={`text-xs font-semibold ${hasStock ? 'text-green-400' : 'text-red-400'}`}>
                        {hasStock ? `${product.stock} disponibles` : 'Agotado'}
                      </span>
                    </div>
                  )}

                  {/* Precio real */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Precio real:</span>
                    <span className="text-sm font-semibold text-gray-300">{product.retailPrice}</span>
                  </div>

                  {/* Tiempo estimado */}
                  {product.estimatedTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Tiempo estimado:</span>
                      <span className="text-xs font-semibold text-blue-400">{product.estimatedTime}</span>
                    </div>
                  )}

                  {/* Puntos necesarios */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-sm text-gray-400">Costo en puntos:</span>
                    <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                      {formatPoints(product.pointsCost)} pts
                    </span>
                  </div>
                </div>
              {/* Botón de canje */}
              <button
                onClick={() => handleRedeemClick(product)}
                disabled={!canAfford || !hasStock}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  isBook
                    ? canAfford && hasStock
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                      : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : canAfford && hasStock
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:shadow-lg hover:shadow-orange-500/30'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                {!hasStock ? 'Agotado' : !canAfford ? 'Puntos insuficientes' : isBook ? 'Canjear Libro' : 'Canjear Producto'}
              </button>
              
              {/* Enlace a Amazon para libros */}
              {isBook && product.bookMetadata?.amazonUrl && (
                <a
                  href={product.bookMetadata.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Ver en Amazon →
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No hay productos disponibles con los filtros seleccionados</p>
        </div>
      )}

      {/* Modal de confirmación de canje */}
      <AnimatePresence>
        {showRedeemModal && selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-6 max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Confirmar Canje</h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Información del producto */}
              <div className="text-center mb-6">
                <div className={`text-6xl mb-4 ${selectedProduct.category === 'libros' ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4' : ''}`}>
                  {selectedProduct.image}
                </div>
                <h4 className={`text-lg font-bold mb-1 ${selectedProduct.category === 'libros' ? 'text-blue-300' : 'text-white'}`}>
                  {selectedProduct.name}
                </h4>
                {selectedProduct.category === 'libros' && selectedProduct.bookMetadata?.subtitle && (
                  <p className="text-xs text-gray-400 italic mb-1">{selectedProduct.bookMetadata.subtitle}</p>
                )}
                <p className="text-sm text-gray-400">{selectedProduct.brand}</p>
                <p className="text-sm text-gray-400 mt-2">{selectedProduct.description}</p>
                
                {/* Información adicional para libros */}
                {selectedProduct.category === 'libros' && selectedProduct.bookMetadata && (
                  <div className="mt-3 space-y-1">
                    {selectedProduct.bookMetadata.rating && (
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-semibold text-white">{selectedProduct.bookMetadata.rating}/5</span>
                        {selectedProduct.bookMetadata.reviews && (
                          <span className="text-xs text-gray-400">({selectedProduct.bookMetadata.reviews} reseñas)</span>
                        )}
                      </div>
                    )}
                    {selectedProduct.bookMetadata.pages && (
                      <p className="text-xs text-gray-400">{selectedProduct.bookMetadata.pages} páginas</p>
                    )}
                    {selectedProduct.bookMetadata.bestseller && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold">
                        ⭐ Bestseller
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Resumen del canje */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Costo del producto:</span>
                  <span className="text-lg font-bold text-orange-400">
                    {formatPoints(selectedProduct.pointsCost)} pts
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Tus puntos actuales:</span>
                  <span className="text-lg font-bold text-white">
                    {formatPoints(userPoints)} pts
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-sm text-gray-400">Puntos restantes:</span>
                  <span className="text-lg font-bold text-green-400">
                    {formatPoints(userPoints - selectedProduct.pointsCost)} pts
                  </span>
                </div>
              </div>

              {/* Mensaje de la marca */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-300 italic">"{selectedProduct.sponsorMessage}"</p>
              </div>

              {/* Mensaje de resultado */}
              {redeemMessage && (
                <motion.div
                  className={`rounded-xl p-4 mb-4 ${
                    redeemMessage.success ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-3">
                    {redeemMessage.success ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`text-sm ${redeemMessage.success ? 'text-green-300' : 'text-red-300'}`}>
                      {redeemMessage.message}
                    </p>
                  </div>
                  
                  {/* Enlace a Amazon para libros canjeados */}
                  {redeemMessage.success && selectedProduct.category === 'libros' && selectedProduct.bookMetadata?.amazonUrl && (
                    <a
                      href={selectedProduct.bookMetadata.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block text-center py-2 px-4 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-sm font-semibold transition-all"
                    >
                      📖 Descargar en Amazon →
                    </a>
                  )}
                </motion.div>
              )}

              {/* Botones de acción */}
              <div className="flex gap-3">
                {!redeemMessage && (
                  <>
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleConfirmRedeem}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                    >
                      Confirmar Canje
                    </button>
                  </>
                )}
                {redeemMessage && (
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                  >
                    Cerrar
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
