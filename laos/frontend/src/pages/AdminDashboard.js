import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { adminService } from '../services/api';

const StatCard = ({ label, value, color, icon, linkTo }) => (
  <Link
    to={linkTo}
    className={`block bg-gradient-to-br ${color} text-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-80">{label}</p>
        <p className="text-3xl font-bold mt-1">{value ?? '—'}</p>
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  </Link>
);

const StarRating = ({ rating }) => {
  if (!rating) return <span className="text-gray-400 text-sm">—</span>;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminService.getDashboard();
        setDashboard(res.data.data);
      } catch (err) {
        setError('Không thể tải dữ liệu dashboard.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {!loading && dashboard && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard
              label="Địa điểm"
              value={dashboard.totalDestinations}
              color="from-emerald-500 to-emerald-600"
              linkTo="/admin/destinations"
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <StatCard
              label="Lễ hội"
              value={dashboard.totalFestivals}
              color="from-orange-500 to-orange-600"
              linkTo="/admin/festivals"
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
            />
            <StatCard
              label="Bài viết"
              value={dashboard.totalArticles}
              color="from-purple-500 to-purple-600"
              linkTo="/admin/articles"
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <StatCard
              label="Người dùng"
              value={dashboard.totalUsers}
              color="from-blue-500 to-blue-600"
              linkTo="/admin/users"
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <StatCard
              label="Bình luận"
              value={dashboard.totalReviews}
              color="from-pink-500 to-pink-600"
              linkTo="/admin/reviews"
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              }
            />
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Top 5 destinations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Top 5 địa điểm nhiều lượt xem
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left w-10">STT</th>
                      <th className="px-4 py-3 text-left">Tên</th>
                      <th className="px-4 py-3 text-left">Tỉnh/Thành</th>
                      <th className="px-4 py-3 text-right">Lượt xem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {dashboard.topDestinations && dashboard.topDestinations.length > 0 ? (
                      dashboard.topDestinations.map((dest, idx) => (
                        <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-400 font-medium">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-800">{dest.name}</td>
                          <td className="px-4 py-3 text-gray-500">{dest.province || '—'}</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {dest.viewCount ?? 0}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                          Chưa có dữ liệu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Latest 5 reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  5 bình luận mới nhất
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">Loại</th>
                      <th className="px-4 py-3 text-left">Người dùng</th>
                      <th className="px-4 py-3 text-left">Đánh giá</th>
                      <th className="px-4 py-3 text-left">Nội dung</th>
                      <th className="px-4 py-3 text-left">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {dashboard.latestReviews && dashboard.latestReviews.length > 0 ? (
                      dashboard.latestReviews.map((review) => (
                        <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              review.targetType === 'DESTINATION'
                                ? 'bg-emerald-100 text-emerald-700'
                                : review.targetType === 'FESTIVAL'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {review.targetType === 'DESTINATION'
                                ? 'Địa điểm'
                                : review.targetType === 'FESTIVAL'
                                ? 'Lễ hội'
                                : 'Bài viết'}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {review.username || '—'}
                          </td>
                          <td className="px-4 py-3">
                            <StarRating rating={review.rating} />
                          </td>
                          <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                            {review.comment || <span className="text-gray-400 italic">Không có</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                            {formatDateTime(review.createdAt)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                          Chưa có dữ liệu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
