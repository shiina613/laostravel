import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Du lịch Lào</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Trang chủ</Link>
            <a href="#destinations" className="text-gray-700 hover:text-blue-600 transition">Điểm đến</a>
            <a href="#festivals" className="text-gray-700 hover:text-blue-600 transition">Lễ hội</a>
            <a href="#articles" className="text-gray-700 hover:text-blue-600 transition">Bài viết</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Yêu thích</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Xin chào, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Trang chủ</Link>
            <a href="#destinations" className="block py-2 text-gray-700 hover:text-blue-600">Điểm đến</a>
            <a href="#festivals" className="block py-2 text-gray-700 hover:text-blue-600">Lễ hội</a>
            <a href="#articles" className="block py-2 text-gray-700 hover:text-blue-600">Bài viết</a>
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Yêu thích</a>
            <div className="mt-4 flex gap-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Đăng xuất
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
