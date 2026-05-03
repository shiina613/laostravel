import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSection from '../components/ReviewSection';
import { publicService, imgUrl } from '../services/api';

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null;

const FestivalDetailPage = () => {
  const { slug } = useParams();
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    publicService.getFestivalBySlug(slug)
      .then(r => setFestival(r.data?.data || r.data))
      .catch(err => { if (err.response?.status === 404) setNotFound(true); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

  if (notFound || !festival) return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy lễ hội</h2>
        <Link to="/" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition">Về trang chủ</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-green-600 transition">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-800 font-medium truncate">{festival.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video mb-6">
              {festival.thumbnail
                ? <img src={imgUrl(festival.thumbnail)} alt={festival.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
              }
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Giới thiệu</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {festival.description || festival.shortDescription}
              </div>
            </div>

            {/* Reviews */}
            <ReviewSection targetType="FESTIVAL" targetId={festival.id} />
          </div>

          {/* Right: Info */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20">
              <span className="inline-block bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full mb-3">Lễ hội</span>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">{festival.name}</h1>

              {festival.province && (
                <p className="text-gray-500 flex items-center gap-1.5 text-sm mb-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {festival.province}
                </p>
              )}

              {(festival.startDate || festival.endDate) && (
                <p className="text-gray-500 flex items-center gap-1.5 text-sm mb-4">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {fmtDate(festival.startDate)}{festival.endDate && ` – ${fmtDate(festival.endDate)}`}
                </p>
              )}

              <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                {festival.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FestivalDetailPage;
