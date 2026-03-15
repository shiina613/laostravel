import React from 'react';

const WhyLaosSection = () => {
  const reasons = [
    {
      icon: '✈️',
      title: 'Gần Việt Nam, dễ di chuyển',
      description: 'Chỉ cách Việt Nam vài giờ bay, dễ dàng di chuyển bằng máy bay, xe buýt hoặc tàu'
    },
    {
      icon: '💰',
      title: 'Chi phí hợp lý',
      description: 'Giá cả phù hợp với du khách Việt, từ ăn uống đến lưu trú đều rất tiết kiệm'
    },
    {
      icon: '🧘',
      title: 'Nhiều điểm đến yên bình',
      description: 'Thoát khỏi sự ồn ào, tìm kiếm sự yên tĩnh và thư giãn tại các điểm đến xinh đẹp'
    },
    {
      icon: '🎭',
      title: 'Văn hóa và ẩm thực đặc sắc',
      description: 'Khám phá nền văn hóa phong phú, những lễ hội truyền thống và ẩm thực độc đáo'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Vì sao du khách Việt nên chọn Lào?
          </h2>
          <p className="text-gray-600 text-lg">
            Những lý do khiến Lào là điểm đến lý tưởng cho du khách Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-5xl mb-4">{reason.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLaosSection;
