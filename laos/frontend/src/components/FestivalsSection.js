import React, { useEffect, useState } from 'react';
import { publicService, imgUrl } from '../services/api';

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const FestivalsSection = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getFestivals(6)
      .then(r => setFestivals(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (festivals.length === 0) return null;

  return (
    <section id="festivals" className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Lễ hội đặc sắc</h2>
          <p className="text-gray-600 text-lg">Những lễ hội truyền thống độc đáo của đất nước Lào</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {festivals.map((festival) => (
            <div key={festival.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              <div className="h-48 bg-gray-200 overflow-hidden">
                {festival.thumbnail ? (
                  <img src={imgUrl(festival.thumbnail)} alt={festival.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{festival.name}</h3>
                {(festival.startDate || festival.endDate) && (
                  <p className="text-sm text-gray-500 mb-2">
                    📅 {formatDate(festival.startDate)}{festival.endDate && ` – ${formatDate(festival.endDate)}`}
                  </p>
                )}
                {festival.province && (
                  <p className="text-sm text-gray-500 mb-3">📍 {festival.province}</p>
                )}
                <p className="text-gray-600 mb-4 line-clamp-2">{festival.shortDescription}</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalsSection;
