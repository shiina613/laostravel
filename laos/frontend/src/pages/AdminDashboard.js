import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">Laos Travel Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Admin: {user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Destinations</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Articles</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Festivals</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Quản lý</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-500 hover:text-blue-700">Quản lý người dùng</a></li>
                <li>
                  <Link to="/admin/categories" className="text-blue-500 hover:text-blue-700">
                    Quản lý danh mục
                  </Link>
                </li>
                <li>
                  <Link to="/admin/destinations" className="text-blue-500 hover:text-blue-700">
                    Quản lý địa điểm
                  </Link>
                </li>
                <li>
                  <Link to="/admin/destinations/create" className="text-blue-500 hover:text-blue-700">
                    Thêm địa điểm du lịch
                  </Link>
                </li>
                <li><a href="#" className="text-blue-500 hover:text-blue-700">Quản lý bài viết</a></li>
                <li><a href="#" className="text-blue-500 hover:text-blue-700">Quản lý lễ hội</a></li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Hệ thống</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-500 hover:text-blue-700">Cài đặt</a></li>
                <li><a href="#" className="text-blue-500 hover:text-blue-700">Báo cáo</a></li>
                <li><a href="#" className="text-blue-500 hover:text-blue-700">Nhật ký</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
