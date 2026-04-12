import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { adminService } from '../services/api';

const StatCard = ({ label, value, color, icon, linkTo }) => (
  <Link to={linkTo} className={`block bg-gradient-to-br ${color} text-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-80">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  </Link>
);

const QuickLink = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-all group"
  >
    <span className="text-gray-400 group-hover:text-emerald-500 transition-colors">{icon}</span>
    <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">{label}</span>
    <svg className="w-4 h-4 ml-auto text-gray-300 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ destinations: 0, categories: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [dest, cats] = await Promise.all([
          adminService.getAllDestinations(),
          adminService.getAllCategories(),
        ]);
        setStats({ destinations: dest.data.length, categories: cats.data.length });
      } catch (_) {}
    };
    load();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Địa điểm"
          value={stats.destinations}
          color="from-emerald-500 to-emerald-600"
          linkTo="/admin/destinations"
          icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard
          label="Danh mục"
          value={stats.categories}
          color="from-blue-500 to-blue-600"
          linkTo="/admin/categories"
          icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
        />
        <StatCard
          label="Bài viết"
          value="—"
          color="from-purple-500 to-purple-600"
          linkTo="#"
          icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        />
        <StatCard
          label="Lễ hội"
          value="—"
          color="from-orange-500 to-orange-600"
          linkTo="#"
          icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Thao tác nhanh</h2>
          <div className="space-y-2">
            <QuickLink
              to="/admin/destinations/create"
              label="Thêm địa điểm mới"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
            />
            <QuickLink
              to="/admin/categories/create"
              label="Thêm danh mục mới"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
            />
            <QuickLink
              to="/admin/destinations"
              label="Xem tất cả địa điểm"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
            />
            <QuickLink
              to="/admin/categories"
              label="Xem tất cả danh mục"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Thông tin hệ thống</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Phiên bản</span>
              <span className="text-sm font-medium text-gray-800">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Trạng thái</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Hoạt động
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Môi trường</span>
              <span className="text-sm font-medium text-gray-800">Development</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
