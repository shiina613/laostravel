import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { publicService, imgUrl } from '../services/api';

const PAGE_SIZE = 9;

// Danh sách tỉnh/thành phổ biến ở Lào
const LAOS_PROVINCES = [
  'Vientiane',
  'Luang Prabang',
  'Savannakhet',
  'Champasak',
  'Xieng Khouang',
  'Houaphanh',
  'Phongsali',
  'Luang Namtha',
  'Oudomxay',
  'Bokeo',
  'Vientiane Province',
  'Bolikhamsai',
  'Khammouane',
  'Salavan',
  'Sekong',
  'Attapeu',
  'Xaisomboun',
];

const fmtDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const FestivalsPage = () => {
  const navigate = useNavigate();

  const [festivals, setFestivals] = useState([]);
  const [province, setProvince] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFestivals = useCallback(async (page = 0, prov = province) => {
    setLoading(true);
    setError('');
    try {
      const params = { page, size: PAGE_SIZE };
      if (prov) params.province = prov;

      const res = await publicService.getFestivals(params);
      const data = res.data?.data;
      setFestivals(data?.content || []);
      setTotalPages(data?.totalPages || 0);
      setTotalElements(data?.totalElements || 0);
      setCurrentPage(data?.currentPage ?? page);
    } catch (err) {
      setError('Không thể tải danh sách lễ hội.');
    } finally {
      setLoading(false);
    }
  }, [province]);

  useEffect(() => {
    fetchFestivals(0, province);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province]);

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchFestivals(page, province);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 py-14 px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Lễ hội tại Lào</h1>
        <p className="text-orange-100 text-lg max-w-xl mx-auto">
          Khám phá những lễ hội truyền thống đặc sắc trên khắp đất nước Lào
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Filter row */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <select
            value={province}
            onChange={handleProvinceChange}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          >
            <option value="">Tất cả tỉnh/thành</option>
            {LAOS_PROVINCES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {province && (
            <button
              onClick={() => setProvince('')}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Result count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-6">
            {totalElements > 0
              ? <>Tìm thấy <span className="font-medium text-gray-700">{totalElements}</span> lễ hội</>
              : 'Không tìm thấy lễ hội nào'}
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Grid */}
        {!loading && festivals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivals.map(festival => (
              <div
                key={festival.id}
                onClick={() => navigate(`/festivals/${festival.slug}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group border border-gray-100 cursor-pointer"
              >
                <div className="h-52 overflow-hidden bg-gray-100">
                  {festival.thumbnail ? (
                    <img
                      src={imgUrl(festival.thumbnail)}
                      alt={festival.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {festival.name}
                  </h3>
                  {festival.province && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {festival.province}
                    </p>
                  )}
                  {(festival.startDate || festival.endDate) && (
                    <p className="text-sm text-orange-600 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {festival.startDate && fmtDate(festival.startDate)}
                      {festival.startDate && festival.endDate && ' – '}
                      {festival.endDate && fmtDate(festival.endDate)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && festivals.length === 0 && !error && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p className="text-gray-400 text-lg">Không tìm thấy lễ hội nào</p>
            {province && (
              <button onClick={() => setProvince('')} className="mt-3 text-orange-500 hover:underline text-sm">
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </div>
  );
};

export default FestivalsPage;
