import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { publicService, imgUrl } from '../services/api';

const DestinationDetailPage = () => {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  useEffect(() => {
    setLoading(true);
    publicService.getDestinationBySlug(slug)
      .then(r => {
        setDestination(r.data);
        setActiveImg(r.data.thumbnail);
      })
      .catch(err => {
        if (err.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (notFound || !destination) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <svg className="w-20 h-20 text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy địa điểm</h2>
          <p className="text-gray-500 mb-6">Địa điểm này không tồn tại hoặc đã bị xóa.</p>
          <Link to="/destinations" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition">
            Xem tất cả địa điểm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = [
    destination.thumbnail,
    ...(destination.images || [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link to="/destinations" className="hover:text-blue-600 transition">Điểm đến</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-800 font-medium truncate">{destination.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Images */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden bg-gray-100 mb-3 aspect-video">
              {activeImg ? (
                <img
                  src={imgUrl(activeImg)}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === img ? 'border-blue-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={imgUrl(img)} alt={`${destination.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Giới thiệu</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {destination.description}
              </div>
            </div>
          </div>

          {/* Right: Info card */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20">
              {destination.categoryName && (
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
                  {destination.categoryName}
                </span>
              )}
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{destination.name}</h1>
              <p className="text-gray-500 flex items-center gap-1.5 mb-4 text-sm">
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {destination.province}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                {destination.shortDescription}
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/destinations"
                  className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-xl text-sm transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Xem tất cả điểm đến
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetailPage;
