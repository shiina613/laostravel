import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicService, imgUrl } from '../services/api';

const DestinationsSection = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getDestinations(6)
      .then(r => setDestinations(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) return null;

  return (
    <section id="destinations" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Điểm đến nổi bật</h2>
          <p className="text-gray-600 text-lg">Khám phá những địa điểm tuyệt vời nhất ở Lào</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 6).map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              <div className="h-48 bg-gray-200 overflow-hidden">
                {destination.thumbnail ? (
                  <img src={imgUrl(destination.thumbnail)} alt={destination.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{destination.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{destination.province}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.shortDescription}</p>
                {destination.categoryName && (
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full mb-4">
                    {destination.categoryName}
                  </span>
                )}
                <Link
                  to={`/destinations/${destination.slug}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Xem tất cả điểm đến
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
