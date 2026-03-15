import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Du lịch Lào</h3>
            <p className="text-gray-400">
              Website quảng bá du lịch Lào dành cho du khách Việt Nam. 
              Khám phá những điểm đến tuyệt vời, lễ hội đặc sắc và cẩm nang du lịch hữu ích.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Trang chủ</a></li>
              <li><a href="#destinations" className="hover:text-white transition">Điểm đến</a></li>
              <li><a href="#festivals" className="hover:text-white transition">Lễ hội</a></li>
              <li><a href="#articles" className="hover:text-white transition">Bài viết</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@dulichlao.com" className="hover:text-white transition">
                  📧 info@dulichlao.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  📱 Facebook
                </a>
              </li>
              <li className="text-gray-400">
                © 2026 Website quảng bá du lịch Lào
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2026 Website quảng bá du lịch Lào. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
