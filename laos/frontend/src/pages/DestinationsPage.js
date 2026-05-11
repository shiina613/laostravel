import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { publicService, categoryService, imgUrl } from '../services/api';

const REGION_LABELS = {
  MIEN_BAC: 'Miền Bắc',
  MIEN_TRUNG: 'Miền Trung',
  MIEN_NAM: 'Miền Nam',
};

const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Mới nhất' },
  { value: 'viewCount_desc', label: 'Nhiều lượt xem nhất' },
  { value: 'name_asc', label: 'Tên A → Z' },
  { value: 'name_desc', label: 'Tên Z → A' },
];

const PAGE_SIZE = 9;

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);

  // Filter state
  const [keyword, setKeyword] = useState('');
  const [inputKeyword, setInputKeyword] = useState(''); // debounced input
  const [categoryId, setCategoryId] = useState('');
  const [province, setProvince] = useState('');
  const [region, setRegion] = useState('');
  const [sort, setSort] = useState('createdAt_desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debounceRef = useRef(null);

  // Load categories, provinces và regions một lần
  useEffect(() => {
    categoryService.getAll()
      .then(res => setCategories(res.data || []))
      .catch(console.error);

    // Lấy provinces từ destinations (dùng publicService)
    publicService.getDestinationProvinces()
      .then(res => setProvinces(res.data?.data || []))
      .catch(() => setProvinces([]));

    // Lấy regions từ destinations
    publicService.getDestinationRegions()
      .then(res => setRegions(res.data?.data || []))
      .catch(() => setRegions([]));
  }, []);

  // Debounce keyword input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setKeyword(inputKeyword);
      setCurrentPage(0);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [inputKeyword]);

  const fetchDestinations = useCallback(async (page = 0) => {
    setLoading(true);
    setError('');
    try {
      const [sortBy, sortDir] = sort.split('_');
      const params = {
        page,
        size: PAGE_SIZE,
        sortBy,
        sortDir,
      };
      if (keyword) params.keyword = keyword;
      if (categoryId) params.categoryId = categoryId;
      if (province) params.province = province;
      if (region) params.region = region;

      const res = await publicService.getDestinations(params);
      const data = res.data?.data;
      setDestinations(data?.content || []);
      setTotalPages(data?.totalPages || 0);
      setTotalElements(data?.totalElements || 0);
      setCurrentPage(data?.currentPage ?? page);
    } catch (err) {
      setError('Không thể tải danh sách địa điểm.');
    } finally {
      setLoading(false);
    }
  }, [keyword, categoryId, province, region, sort]);

  useEffect(() => {
    fetchDestinations(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, categoryId, province, region, sort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchDestinations(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (val) => {
    setCategoryId(val);
    setCurrentPage(0);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setCurrentPage(0);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setCurrentPage(0);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(0);
  };

  const handleReset = () => {
    setInputKeyword('');
    setKeyword('');
    setCategoryId('');
    setProvince('');
    setRegion('');
    setSort('createdAt_desc');
    setCurrentPage(0);
  };

  const hasActiveFilter = keyword || categoryId || province || region || sort !== 'createdAt_desc';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-14 px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Điểm đến tại Lào</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Khám phá tất cả địa điểm du lịch nổi bật trên khắp đất nước Lào
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search bar */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên địa điểm..."
            value={inputKeyword}
            onChange={e => setInputKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {inputKeyword && (
            <button
              onClick={() => setInputKeyword('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Category buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                categoryId === ''
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400'
              }`}
            >
              Tất cả
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(String(cat.id))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  categoryId === String(cat.id)
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Province dropdown */}
          <select
            value={province}
            onChange={handleProvinceChange}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="">Tất cả tỉnh/thành</option>
            {provinces.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Region dropdown */}
          <select
            value={region}
            onChange={handleRegionChange}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="">Tất cả miền</option>
            {regions.map(r => (
              <option key={r} value={r}>{REGION_LABELS[r] || r}</option>
            ))}
          </select>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Reset button */}
          {hasActiveFilter && (
            <button
              onClick={handleReset}
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
              ? <>Tìm thấy <span className="font-medium text-gray-700">{totalElements}</span> địa điểm</>
              : 'Không tìm thấy địa điểm nào'}
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Grid */}
        {!loading && destinations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map(dest => (
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {!loading && destinations.length === 0 && !error && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 text-lg">Không tìm thấy địa điểm nào</p>
            {hasActiveFilter && (
              <button onClick={handleReset} className="mt-3 text-blue-500 hover:underline text-sm">
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

export default DestinationsPage;
