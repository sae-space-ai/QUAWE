import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Users, DollarSign, ExternalLink, Filter } from 'lucide-react';
import { getAllB2BCompanies, b2bCategories, B2BCompany } from '../data/b2bCompanies';

export default function B2BCompaniesDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const companies = getAllB2BCompanies();

  const filteredCompanies = selectedCategory === 'all' 
    ? companies 
    : companies.filter(c => c.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Directorio de Empresas B2B</h2>
            <p className="text-sm text-gray-400">Grandes empresas que patrocinan Radio Quawe</p>
          </div>
        </div>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Total Empresas</p>
            <p className="text-2xl font-bold text-white">{companies.length}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Categorías</p>
            <p className="text-2xl font-bold text-white">{b2bCategories.length}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Países</p>
            <p className="text-2xl font-bold text-white">8+</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Empleados</p>
            <p className="text-2xl font-bold text-white">4M+</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-bold text-white">Filtrar por Categoría</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Todas
          </button>
          {b2bCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de empresas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Logo */}
            <div className="w-full h-32 mb-4 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
              <img 
                src={company.logo} 
                alt={company.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Información */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white">{company.name}</h3>
                <p className="text-xs text-blue-400">{company.category}</p>
              </div>

              <p className="text-sm text-gray-400 line-clamp-2">{company.description}</p>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-400 truncate">{company.headquarters}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-400">{company.employees}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-400">{company.revenue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Fundada:</span>
                  <span className="text-xs text-gray-400">{company.founded}</span>
                </div>
              </div>

              {/* Enlace */}
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 text-xs font-medium transition-all"
              >
                <ExternalLink className="w-3 h-3" />
                Visitar Website
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No hay empresas en esta categoría</p>
        </div>
      )}
    </motion.div>
  );
}
