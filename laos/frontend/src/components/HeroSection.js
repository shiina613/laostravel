import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="relative h-96 md:h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/hero/fdsfsdfsdf.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Khám phá vẻ đẹp du lịch Lào
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Tìm hiểu những điểm đến nổi bật, lễ hội đặc sắc và cẩm nang du lịch hữu ích dành cho du khách Việt Nam.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            Khám phá điểm đến
          </button>
          <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition">
            Xem cẩm nang du lịch
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
