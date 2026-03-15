import React from 'react';

const DestinationsSection = () => {
  const destinations = [
    {
      id: 1,
      name: 'Luang Prabang',
      region: 'Tỉnh Luang Prabang',
      description: 'Thành phố cổ kính với những ngôi chùa vàng, phố cổ và con sông Mekong hùng vĩ',
      rating: 4.8,
      image: '/images/destinations/25649e4c394066e9e403e01b8d72e51968bb2aa1f31432d379f0daee26d394e3.avif'
    },
    {
      id: 2,
      name: 'Vientiane',
      region: 'Thủ đô Vientiane',
      description: 'Thủ đô yên tĩnh với những công trình kiến trúc độc đáo và bảo tàng phong phú',
      rating: 4.5,
      image: '/images/destinations/27c0e9e21c8f8c2d0a3e2159dec0306f0a87a8025f9a2cfee050a522148798da.avif'
    },
    {
      id: 3,
      name: 'Wat Xieng Thong',
      region: 'Luang Prabang',
      description: 'Ngôi chùa đẹp nhất Lào với kiến trúc Phật giáo truyền thống tuyệt vời',
      rating: 4.9,
      image: '/images/destinations/48aec2af0b1b499cbd77ea5fca768b47c120d46057506c8c2ebd9ffb8397645d.avif'
    },
    {
      id: 4,
      name: 'Thác Kuang Si',
      region: 'Luang Prabang',
      description: 'Thác nước tuyệt đẹp với nước xanh ngọc bích, lý tưởng để tắm và chụp ảnh',
      rating: 4.7,
      image: '/images/destinations/54143b59dfe18b7758f8d03cb1f5b96f6d9d55d491986785e003c31a43cc4d21.avif'
    },
    {
      id: 5,
      name: 'Vang Vieng',
      region: 'Tỉnh Vientiane',
      description: 'Thị trấn nhỏ xinh đẹp nằm giữa những núi đá vôi, nổi tiếng với hoạt động thể thao mạo hiểm',
      rating: 4.6,
      image: '/images/destinations/65e3f29d14c5e92ceb161ad8e01c04bd3f47918eb80f15d9843d5a18c9959d3d.avif'
    },
    {
      id: 6,
      name: '4000 Đảo',
      region: 'Tỉnh Champasak',
      description: 'Quần đảo tuyệt đẹp trên sông Mekong với cảnh sắc thiên nhiên hoang sơ',
      rating: 4.4,
      image: '/images/destinations/afc24d314c18fa0eaee65cd4f69f72561f062773680feb7f06fe69d73f4dec70.avif'
    }
  ];

  return (
    <section id="destinations" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Điểm đến nổi bật
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá những địa điểm tuyệt vời nhất ở Lào
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{destination.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{destination.region}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-2 text-gray-700 font-semibold">{destination.rating}</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            Xem tất cả điểm đến
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
