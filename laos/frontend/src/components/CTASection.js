import React from 'react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Sẵn sàng khám phá du lịch Lào?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Bắt đầu hành trình của bạn bằng cách khám phá các điểm đến nổi bật và những bài viết hữu ích 
          dành cho du khách Việt.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition">
            Xem điểm đến
          </button>
          <button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition border-2 border-white">
            Đọc bài viết
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
