import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { publicService, categoryService, imgUrl } from '../services/api';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      publicService.getDestinations(),
      categoryService.getAll(),
    ]).then(([destRes, catRes]) => {
      setDestinations(destRes.data);
      setCategories(catRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = destinations.filter(d => {
    const matchCat = activeCategory === 'all' || d.categoryName === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.province.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-14 px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Điểm đến tại Lào</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">Khám phá tất cả địa điểm du lịch nổi bật trên khắp đất nước Lào</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc tỉnh/thành..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-blue-600 text-white shadow' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400'}`}
            >
              Tất cả
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat.name ? 'bg-blue-600 text-white shadow' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-6">{filtered.length} địa điểm</p>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(dest => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group border border-gray-100"
              >
                <div className="h-52 overflow-hidden bg-gray-100">
                  {dest.thumbnail ? (
                    <img
                      src={imgUrl(dest.thumbnail)}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {dest.categoryName && (
                    <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full mb-2">
                      {dest.categoryName}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{dest.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {dest.province}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">{dest.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 text-lg">Không tìm thấy địa điểm nào</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
