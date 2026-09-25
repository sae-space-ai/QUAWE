import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, ExternalLink, Award } from 'lucide-react';
import { getAllBooks, getBestsellerBooks, getCatalogStats, Book } from '../data/authorBooks';

export default function AuthorBooksShowcase() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const books = getAllBooks();
  const bestsellers = getBestsellerBooks();
  const stats = getCatalogStats();

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header del autor */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl">
            👨‍💻
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Prof. Manuel Gago Fernández</h2>
            <p className="text-sm text-gray-400">Autor y Desarrollador de Software</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                📚 {stats.totalBooks} libros
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                ⭐ {stats.totalBestsellers} bestsellers
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                ★ {stats.averageRating.toFixed(1)} valoración media
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-300">
          Catálogo completo de libros técnicos publicados en Amazon. Canjea tus puntos de Radio Quawe 
          para obtener copias digitales de estos libros profesionales.
        </p>
      </div>

      {/* Estadísticas del catálogo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-gray-400">Total Libros</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalBooks}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-gray-400">Bestsellers</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalBestsellers}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Reseñas Totales</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalReviews}</p>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💰</span>
            <span className="text-xs text-gray-400">Precio Promedio</span>
          </div>
          <p className="text-2xl font-bold text-white">€{stats.priceRange.avg.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Bestsellers destacados */}
      {bestsellers.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Bestsellers Destacados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bestsellers.slice(0, 4).map((book, index) => (
              <motion.div
                key={book.id}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedBook(book)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    {book.coverImage.startsWith('http') ? (
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-2xl">{book.coverImage}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-1">{book.title}</h4>
                    <p className="text-xs text-gray-400 mb-2">{book.subtitle}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-xs">★ {book.rating}</span>
                      <span className="text-xs text-gray-500">({book.reviews} reseñas)</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                        ⭐ Bestseller
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Grid de todos los libros */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Catálogo Completo ({books.length} libros)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/30 p-6 hover:bg-white/10 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedBook(book)}
            >
              {/* Portada del libro */}
              <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                {book.coverImage.startsWith('http') ? (
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">{book.coverImage}</div>
                )}
              </div>

              {/* Información del libro */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-lg font-bold text-blue-300">{book.title}</h4>
                  {book.bestseller && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold flex-shrink-0">
                      ⭐ Bestseller
                    </span>
                  )}
                </div>
                
                {book.subtitle && (
                  <p className="text-xs text-gray-400 italic">{book.subtitle}</p>
                )}
                
                <p className="text-sm text-gray-400 line-clamp-2">{book.description}</p>

                {/* Metadata */}
                <div className="space-y-1 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Autor:</span>
                    <span className="text-xs font-semibold text-white">{book.author}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Páginas:</span>
                    <span className="text-xs font-semibold text-white">{book.pages}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Formato:</span>
                    <span className="text-xs font-semibold text-white capitalize">{book.format}</span>
                  </div>

                  {book.rating && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Valoración:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs font-semibold text-white">{book.rating}/5</span>
                        {book.reviews && (
                          <span className="text-xs text-gray-400">({book.reviews})</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Precio:</span>
                    <span className="text-sm font-bold text-green-400">€{book.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Puntos:</span>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {book.pointsCost} pts
                    </span>
                  </div>

                  {book.estimatedTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Tiempo estimado:</span>
                      <span className="text-xs font-semibold text-blue-400">{book.estimatedTime}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {book.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de detalles del libro */}
      {selectedBook && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedBook(null)}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-32 h-40 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {selectedBook.coverImage.startsWith('http') ? (
                  <img 
                    src={selectedBook.coverImage} 
                    alt={selectedBook.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">{selectedBook.coverImage}</div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-300 mb-1">{selectedBook.title}</h3>
                {selectedBook.subtitle && (
                  <p className="text-sm text-gray-400 italic mb-2">{selectedBook.subtitle}</p>
                )}
                <p className="text-sm text-gray-400 mb-3">{selectedBook.author}</p>
                
                {selectedBook.rating && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedBook.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white font-semibold">{selectedBook.rating}/5</span>
                    {selectedBook.reviews && (
                      <span className="text-xs text-gray-400">({selectedBook.reviews} reseñas)</span>
                    )}
                  </div>
                )}

                {selectedBook.bestseller && (
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold border border-yellow-500/30">
                    ⭐ Bestseller en Amazon
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-6">{selectedBook.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Páginas</p>
                <p className="text-lg font-bold text-white">{selectedBook.pages}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Formato</p>
                <p className="text-lg font-bold text-white capitalize">{selectedBook.format}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Idioma</p>
                <p className="text-lg font-bold text-white">{selectedBook.language}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Categoría</p>
                <p className="text-lg font-bold text-white">{selectedBook.category}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-white mb-2">Etiquetas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedBook.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Precio en Amazon:</span>
                <span className="text-lg font-bold text-green-400">€{selectedBook.price}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Costo en puntos:</span>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {selectedBook.pointsCost} puntos
                </span>
              </div>
              {selectedBook.estimatedTime && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Tiempo estimado:</span>
                  <span className="text-sm font-semibold text-blue-400">{selectedBook.estimatedTime}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <a
                href={selectedBook.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Ver en Amazon
              </a>
              <button
                onClick={() => setSelectedBook(null)}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
