import React from 'react';

const IntroSection = () => {
  const highlights = [
    {
      title: 'Văn hóa đặc sắc',
      description: 'Khám phá nền văn hóa phong phú với các đền chùa cổ kính và truyền thống lâu đời'
    },
    {
      title: 'Thiên nhiên yên bình',
      description: 'Tận hưởng cảnh sắc thiên nhiên nguyên sơ với những thác nước hùng vĩ'
    },
    {
      title: 'Ẩm thực hấp dẫn',
      description: 'Thưởng thức những món ăn đặc trưng với hương vị độc đáo của đất nước'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Lào - Điểm đến yên bình và giàu bản sắc
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Lào là một đất nước xinh đẹp nằm giữa lòng Đông Nam Á, nổi tiếng với những điểm đến tuyệt vời, 
            nền văn hóa phong phú và con người thân thiện. Đây là điểm đến lý tưởng cho những ai muốn tìm kiếm 
            sự yên bình và khám phá vẻ đẹp nguyên sơ của thiên nhiên.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">
                {index === 0 && '🏛️'}
                {index === 1 && '🌿'}
                {index === 2 && '🍜'}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
