import React from 'react';

const FestivalsSection = () => {
  const festivals = [
    {
      id: 1,
      name: 'Tết Bunpimay',
      date: 'Tháng 4 hàng năm',
      location: 'Toàn quốc',
      description: 'Lễ hội Năm mới của người Lào, được tổ chức vào tháng 4 với những hoạt động vui vẻ và ý nghĩa',
      image: '/images/festivals/664eb13dbefbbe01897520a1569533a69dedec8fdc9b4d295658636a0958e1e3.avif'
    },
    {
      id: 2,
      name: 'Lễ hội Thạt Luổng',
      date: 'Tháng 10 hàng năm',
      location: 'Toàn quốc',
      description: 'Lễ hội Ánh sáng của người Lào, được tổ chức vào tháng 10 với những chiếc đèn lồng xinh đẹp',
      image: '/images/festivals/80010d463e66ce22cdf50d749c1b3f41b6926483886c981fbd330632f1502f1a.avif'
    },
    {
      id: 3,
      name: 'Lễ hội đua thuyền',
      date: 'Tháng 10 hàng năm',
      location: 'Sông Mekong',
      description: 'Cuộc đua thuyền truyền thống trên sông Mekong, một trong những lễ hội nổi tiếng nhất của Lào',
      image: '/images/festivals/c94970644127e2a25d86f38465a05e36cce51d080a2c727ac89e3aa5e26fe81d.avif'
    }
  ];

  return (
    <section id="festivals" className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Lễ hội đặc sắc
          </h2>
          <p className="text-gray-600 text-lg">
            Những lễ hội truyền thống độc đáo của đất nước Lào
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {festivals.map((festival) => (
            <div key={festival.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{festival.name}</h3>
                <p className="text-sm text-gray-500 mb-2">📅 {festival.date}</p>
                <p className="text-sm text-gray-500 mb-3">📍 {festival.location}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{festival.description}</p>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalsSection;
